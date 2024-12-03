import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { login } from './functions/login/resource';
import { register } from './functions/register/resource';
import { logout } from './functions/logout/resource';
import { chgpwd } from './functions/chgpwd/resource';
import { resetpwd } from './functions/resetpwd/resource';
import { checkToken } from './functions/checkToken/resource';
import { resetpwd2 } from './functions/resetpwd2/resource';
import * as iam from "aws-cdk-lib/aws-iam";
import * as sns from "aws-cdk-lib/aws-sns";

const backend = defineBackend({
  auth,
  data,
  register,
  login,
  logout,
  chgpwd,
  resetpwd,
  checkToken,
  resetpwd2,
});

const registerLambda = backend.register.resources.lambda
const loginLambda = backend.login.resources.lambda
const logoutLambda = backend.logout.resources.lambda
const chgpwdLambda = backend.chgpwd.resources.lambda
const resetpwdLambda = backend.resetpwd.resources.lambda
const checkTokenLambda = backend.checkToken.resources.lambda
const resetpwd2Lambda = backend.resetpwd2.resources.lambda

const topicStackRegister = backend.createStack("register")
const topicRegister = new sns.Topic(topicStackRegister, "TopicRegister", {
  displayName: "digest",
})
const topicStackLogin = backend.createStack("login")
const topicLogin = new sns.Topic(topicStackLogin, "TopicLogin", {
  displayName: "digest",
})
const topicStackLogout = backend.createStack("logout")
const topicLogout = new sns.Topic(topicStackLogin, "TopicLogout", {
  displayName: "digest",
})
const topicStackChgpwd = backend.createStack("chgpwd")
const topicChgpwd = new sns.Topic(topicStackLogin, "TopicChgpwd", {
  displayName: "digest",
})
const topicStackResetPwd = backend.createStack("resetpwd")
const topicResetPwd = new sns.Topic(topicStackLogin, "TopicResetpwd", {
  displayName: "digest",
})
const topicStackCheckToken = backend.createStack("checkToken")
const topicCheckToken = new sns.Topic(topicStackLogin, "TopicCheckToken", {
  displayName: "digest",
})
const topicStackResetPwd2 = backend.createStack("resetpwd2")
const topicResetPwd2 = new sns.Topic(topicStackLogin, "TopicResetpwd2", {
  displayName: "digest",
})

const statement = new iam.PolicyStatement({
  sid: "AllowDynamoDBAccess",
  actions: [
    "dynamodb:PutItem",
    "dynamodb:GetItem",
    "dynamodb:UpdateItem",
    "dynamodb:DeleteItem",
    "dynamodb:Query",
    "dynamodb:Scan",
  ],
  resources: [
    `arn:aws:dynamodb:eu-west-2:381492188973:table/users`,
    `arn:aws:dynamodb:eu-west-2:381492188973:table/sessions`
  ],
})

registerLambda.addToRolePolicy(statement)
loginLambda.addToRolePolicy(statement)
logoutLambda.addToRolePolicy(statement)
chgpwdLambda.addToRolePolicy(statement)
resetpwdLambda.addToRolePolicy(statement)
checkTokenLambda.addToRolePolicy(statement)
resetpwd2Lambda.addToRolePolicy(statement)