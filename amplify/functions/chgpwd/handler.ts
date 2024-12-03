import { DynamoDBClient, UpdateItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { env } from "$amplify/env/post-confirmation";
import { AppSyncResolverHandler } from 'aws-lambda';
import type { Schema } from "../../data/resource"
import * as bcrypt from 'bcryptjs';

const client = new DynamoDBClient({ region: env.AWS_REGION });
const tableName = "users";

export const handler: Schema["chgpwd"]["functionHandler"] = async (event) => {
  const { email, password, newPassword, token } = event.arguments as { email: string, password: string, newPassword: string, token: string };  

  // Validate password
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,20}$/;
  if (!passwordRegex.test(newPassword)) {
    throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Get token from the database
  const getTokenCommand = new ScanCommand ({
    TableName: "sessions",
    FilterExpression: "#token = :tokenValue",
    ExpressionAttributeNames: {
      "#token": "token",
    },
    ExpressionAttributeValues: {
      ":tokenValue": { S: token },
    },
  });
  const getTokenResponse = await client.send(getTokenCommand);

  if (!getTokenResponse.Items ||  getTokenResponse.Items.length < 1) {
    throw new Error("Invalid token.");
  } 

  try {
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

    // Compare the provided password with the stored hashed password
    const storedPassword = response.Items[0].password.S;
    if (!storedPassword) {
      throw new Error("Stored password is undefined.");
    }
    const isPasswordValid = await bcrypt.compare(password, storedPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid password.");
    }
    
    // CHange password
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: {
        id: response.Items[0].id 
      },
      UpdateExpression: "set password = :hashedPassword",
      ExpressionAttributeValues: {
        ":hashedPassword": { S: hashedPassword }
      }
    });
    await client.send(updateCommand);
    console.log("Password changed successfully");
    return true;
  } catch (error) {
    return false;
  }
};
