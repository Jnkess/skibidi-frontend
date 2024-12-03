import type { Schema } from "../../data/resource"
import { DynamoDBClient, UpdateItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { randomBytes } from "crypto";
import { env } from "$amplify/env/post-confirmation";
import nodemailer from "nodemailer";
import { secret } from '@aws-amplify/backend';

const client = new DynamoDBClient({ region: env.AWS_REGION });
const tableName = "users";

export const handler: Schema["resetpwd"]["functionHandler"] = async (event) => {
  const { email, baseUrl } = event.arguments as { email: string, baseUrl: string }; 

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

    // Generate a unique key for password reset
    const resetKey = randomBytes(6).toString("hex");
      
    // Save the key to the user's record in the database
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: {
        id: response.Items[0].id 
      },
      UpdateExpression: "set resetKey = :resetKey",
      ExpressionAttributeValues: {
        ":resetKey": { S: resetKey }
      }
    });
    await client.send(updateCommand);
    console.log("ResetKey set successfully");

    // Step 1: Create a transporter
    let transporter = nodemailer.createTransport({
        host: "s166.cyber-folks.pl",
        port: 465,
        secure: true,
        auth: {
            user: secret('emailUser').toString(),
            pass: secret('emailPass').toString()
        }
    });
    // Step 2: Configure the email options
    const mailOptions = {
      from: '"Skibidi-app" <skibidi-app@107.pl>',
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hi,</p>
        <p>You requested a password reset.</p>
        <p>Click <a href="${baseUrl}/resetPwd2?key=${resetKey}">here</a> to reset your password.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    // Step 3: Send the email

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return true;
  }
  catch (error) {
    console.log("erro : ", error);
    throw new Error(`Error:, ${error}`);
  }
};
