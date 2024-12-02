import type { Schema } from "../../data/resource"
import { DynamoDBClient, ScanCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { env } from "$amplify/env/post-confirmation";
import * as bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import * as jwt from 'jsonwebtoken';
import { AppSyncResolverHandler } from 'aws-lambda';

const client = new DynamoDBClient({ region: env.AWS_REGION });
const jwtSecret = env.AWS_SESSION_TOKEN;

export const handler: Schema["login"]["functionHandler"] = async (event) => {
  const { email, password } = event.arguments as { email: string, password: string };
  const ttl = Math.floor(Date.now() / 1000) + 3600; 
  try{
    // Retrieve the user from DynamoDB
    const command = new ScanCommand ({
      TableName: "users",
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
    const userId = response.Items[0].id.S;
    if (!userId) {
      throw new Error("User ID is undefined.");
    }
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
    const item = {
      id: { S: randomUUID() },
      userId: { S: userId },
      token: { S: token },
      createdAt: { S: new Date().toISOString() },
      expiresAt: { N: ttl.toString() },
    };

    const storeTokencommand = new PutItemCommand({
      TableName: "sessions",
      Item: item,
    });
    await client.send(storeTokencommand);

    console.log("Login successfull");
    return {
      token,
      username,
      email,
      userId,
    };
  } catch (error) {
    console.error("Error logging in user", error);
    return null;
  }
};
