import { DynamoDBClient, UpdateItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { env } from "$amplify/env/post-confirmation";
import { AppSyncResolverHandler } from 'aws-lambda';
import type { Schema } from "../../data/resource"

const client = new DynamoDBClient({ region: env.AWS_REGION });
const tableName = "users";

export const handler: Schema["logout"]["functionHandler"] = async (event) => {
  const { email } = event.arguments as { email: string };

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
    // Invalidate the session token in the database
    const updateCommand = new UpdateItemCommand({
      TableName: tableName,
      Key: {
        id: response.Items[0].id 
      },
      UpdateExpression: "remove sessionToken"
    });
    await client.send(updateCommand);

    return true;
  } catch (error) {
    console.error("Error logging out user", error);
    return false;
  }
};
