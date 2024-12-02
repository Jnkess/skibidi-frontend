import { DynamoDBClient, DeleteItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { env } from "$amplify/env/post-confirmation";
import { AppSyncResolverHandler } from 'aws-lambda';
import type { Schema } from "../../data/resource"

const client = new DynamoDBClient({ region: env.AWS_REGION });

export const handler: Schema["logout"]["functionHandler"] = async (event) => {
  const { token } = event.arguments as { token: string };

  try {
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

    // Invalidate the session token in the database
    const deleteCommand = new DeleteItemCommand({
      TableName: "sessions",
      Key: {
        id: getTokenResponse.Items[0].id 
      },
    });
    await client.send(deleteCommand);
    return true;
  } catch (error) {
    console.error("Error during token invalidation.", error);
    throw new Error(` ${ error }`, );
    return false;
  }
};
