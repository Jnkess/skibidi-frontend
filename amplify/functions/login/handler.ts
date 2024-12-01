import type { Schema } from "../../data/resource"
import { DynamoDBClient, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { env } from "$amplify/env/post-confirmation";
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AppSyncResolverHandler } from 'aws-lambda';

const client = new DynamoDBClient({ region: env.AWS_REGION });
const tableName = "users";
const jwtSecret = env.AWS_SESSION_TOKEN;

export const handler: Schema["login"]["functionHandler"] = async (event) => {
  const { email, password } = event.arguments as { email: string, password: string };

  try{
    // Retrieve the user from DynamoDB
    const command = new ScanCommand ({
      TableName: tableName,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
    });
    const response = await client.send(command);
    if (!response.Items ||  response.Items.length < 1) {
      throw new Error("Invalid email.");
    }
    const storedPassword = response.Items[0].password.S;
    const username = response.Items[0].username.S;
    // Compare the provided password with the stored hashed password
    if (!storedPassword) {
      throw new Error("Stored password is undefined.");
    }
    const isPasswordValid = await bcrypt.compare(password, storedPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid password.");
    }

    // Generate JWT token
    const token = jwt.sign({ email }, jwtSecret, { expiresIn: '1h' });

    // Store the session token in the database
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: {
        id: response.Items[0].id 
      },
      UpdateExpression: "set sessionToken = :token",
      ExpressionAttributeValues: {
        ":token": { S: token }
      }
    });
    await client.send(updateCommand);
    console.log("Login successfull");
    return {
      token,
      username,
    };
  } catch (error) {
    console.error("Error logging in user", error);
    return null;
  }
};
