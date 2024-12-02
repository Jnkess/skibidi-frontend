import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { postConfirmation } from "../auth/post-confirmation/resource";
import { login } from "../functions/login/resource";
import { register } from "../functions/register/resource";
import { logout } from "../functions/logout/resource";
import { chgpwd } from "../functions/chgpwd/resource";
import { resetpwd } from "../functions/resetpwd/resource";
import { checkToken } from "../functions/checkToken/resource";
import { createDeflate } from "zlib";
import { Token } from "aws-cdk-lib";

const schema = a
  .schema({
    register: a
      .query()
      .arguments({
        username: a.string(),
        email: a.string(),
        password: a.string(),
        createdAt: a.string(),
      })
      .returns(a.boolean())
      .handler(a.handler.function(register))
      .authorization((allow) => [
        allow.publicApiKey(),
      ]),
    login: a
      .query()
      .arguments({
        email: a.string(),
        password: a.string(),
      })
      .returns(a.customType({
        token: a.string(),
        username: a.string(),
        userId: a.string(),
        email: a.string(),
      }))
      .handler(a.handler.function(login))
      .authorization((allow) => [
        allow.publicApiKey(),
      ]),
    logout: a
      .query()
      .arguments({
        token: a.string(),
      })
      .returns(a.boolean())
      .handler(a.handler.function(logout))
      .authorization((allow) => [
        allow.publicApiKey(),
      ]),
    chgpwd: a
      .query()
      .arguments({
        email: a.string(),
        password: a.string(),
        newPassword: a.string(),
        token: a.string(),
      })
      .returns(a.boolean())
      .handler(a.handler.function(chgpwd))
      .authorization((allow) => [
        allow.publicApiKey(),
      ]),
    resetpwd: a
      .query()
      .arguments({
        email: a.string(),
      })
      .returns(a.boolean())
      .handler(a.handler.function(resetpwd))
      .authorization((allow) => [
        allow.publicApiKey(),
      ]),
    checkToken: a
      .query()
      .arguments({
        token: a.string(),
      })
      .returns(a.boolean())
      .handler(a.handler.function(checkToken))
      .authorization((allow) => [
        allow.publicApiKey(),
      ]),
  })
  .authorization((allow) => [allow.resource(postConfirmation)]);
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});