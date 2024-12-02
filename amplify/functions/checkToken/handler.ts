import type { Schema } from "../../data/resource"
import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { env } from "$amplify/env/post-confirmation";

const client = new DynamoDBClient({ region: env.AWS_REGION });

export const handler: Schema["checkToken"]["functionHandler"] = async (event) => {
  const { token } = event.arguments as { token: string };
  try{
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
      return false
    } else {
      return true;
    }

  } catch (error) {
    console.error("Error logging in user", error);
    return false;
  }
};
