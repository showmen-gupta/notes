import { api } from "./api";
import { bucket } from "./storage";

const region = aws.getRegionOutput().name;

export const userPool = new sst.aws.CognitoUserPool("UserPool", {
  usernames: ["email"]
});

export const userPoolClient = userPool.addClient("UserPoolClient");

export const identityPool = new sst.aws.CognitoIdentityPool("IdentityPool", {
  userPools: [
    {
      userPool: userPool.id,
      client: userPoolClient.id,
    },
  ],
  permissions: {
    /* In the above policy we are granting our logged in users access to the path private/${cognito-identity.amazonaws.com:sub}/ within our S3 bucket’s ARN. Where cognito-identity.amazonaws.com:sub is the authenticated 
    user’s federated identity id (their user id). So a user has access to only their folder within the bucket. This allows us to separate access to our user’s file uploads within the same S3 bucket.
    */
    authenticated: [
      {
        actions: ["s3:*"],
        resources: [
          $concat(bucket.arn, "/private/${cognito-identity.amazonaws.com:sub}/*"),
        ],
      },
      /* We are creating an IAM policy to allow our authenticated users to access our API. You can learn more about IAM here. */ 
      {
        actions: [
          "execute-api:*",
        ],
        resources: [
          $concat(
            "arn:aws:execute-api:",
            region,
            ":",
            aws.getCallerIdentityOutput({}).accountId,
            ":",
            api.nodes.api.id,
            "/*/*/*"
          ),
        ],
      },
    ],
  },
});