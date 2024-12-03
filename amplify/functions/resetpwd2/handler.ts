import type { Schema } from "../../data/resource"
import { DynamoDBClient, ScanCommand, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { env } from "$amplify/env/post-confirmation";
import * as bcrypt from 'bcryptjs';

const client = new DynamoDBClient({ region: env.AWS_REGION });

export const handler: Schema["resetpwd2"]["functionHandler"] = async (event) => {
  const { resetKey, newPassword } = event.arguments as { resetKey: string, newPassword: string };

  // Validate password
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,20}$/;
  if (!passwordRegex.test(newPassword)) {
    throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try{
    // Get user from the database
    const getTokenCommand = new ScanCommand ({
      TableName: "users",
      FilterExpression: "resetKey = :resetKey",
      ExpressionAttributeValues: {
        ":resetKey": { S: resetKey },
      },
    });
    const getUserResponse = await client.send(getTokenCommand);

    if (!getUserResponse.Items ||  getUserResponse.Items.length < 1) {
      throw new Error("Invalid code.");
    } 

    // Chnge password
    const updateCommand = new UpdateItemCommand({
      TableName: "users",
      Key: {
        id: getUserResponse.Items[0].id
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
    console.error("Error while reseting password", error);
    throw new Error(`Error while reseting password: ${error}`);
  }
};
