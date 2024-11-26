import type { Schema } from "../../data/resource"
import { DynamoDBClient, UpdateItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import nodemailer from "nodemailer";
import { randomBytes } from "crypto";
import { hash } from "bcryptjs";
import { env } from "$amplify/env/post-confirmation";

const client = new DynamoDBClient({ region: env.AWS_REGION });
const tableName = "users";

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skibidi.app.test@gmail.com", // Replace with your email address
    pass: "jD123456!", // Replace with your email password (or app-specific password)
  },
});

export const handler: Schema["resetpwd"]["functionHandler"] = async (event): Promise<string | null> => {
  const { email, } = event.arguments as { email: string }; 

  // Step 1: Generate a temporary password
  const tempPassword = randomBytes(8).toString("hex"); // Generate a random 8-character password
  const hashedPassword = await hash(tempPassword, 10); // Hash the password for storage

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
    
    
    // Reset password
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: {
        id: response.Items[0].id 
      },
      UpdateExpression: "SET password = :password",
      ExpressionAttributeValues: {
        ":password": { S: hashedPassword },
      },
    });
    await client.send(updateCommand);
    console.log("Password reset successfull");
    return "Password reset successfull";
  } catch (error) {
    return null;
    throw new Error("Failed to reset password");
  }
};
