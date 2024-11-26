import type { Schema } from "../../data/resource"
import { DynamoDBClient, PutItemCommand, ScanCommand  } from "@aws-sdk/client-dynamodb";
import { randomUUID } from 'crypto';
import { env } from "$amplify/env/post-confirmation";
import * as bcrypt from 'bcryptjs';

const client = new DynamoDBClient({ region: env.AWS_REGION });
const tableName = "users";
export const handler: Schema["register"]["functionHandler"] = async (event) => {
    const { username, email, password } = event.arguments as { username: string, email: string, password: string };
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format.");
  }
  // Validate password
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
  }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Construct item to add to DynamoDB
    const item = {
      id: { S: randomUUID() },
      username: { S: username },
      email: { S: email },
      password: { S: hashedPassword },
      createdAt: { S: new Date().toISOString() },
    };
  // Check if user with this email already exists
  const command = new ScanCommand ({
    TableName: tableName,
    FilterExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email },
    },
  });
  const response = await client.send(command);
  if (response.Items && response.Items.length > 0) {
    throw new Error("User already exists.");
  }

  try {
    // Save the item to DynamoDB
    const command = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });
    await client.send(command);

    return `Hello, ${username}! User has been added successfully.`;
  } catch (error) {
    console.error("Error saving user to DynamoDB", error);
    throw new Error("Failed to add user to the database");
  }
};