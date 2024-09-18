import { api } from "./api";
import { bucket, publishableSecret } from "./storage";
import { userPool, identityPool, userPoolClient } from "./auth";

const region = aws.getRegionOutput().name;

export const frontend = new sst.aws.StaticSite("Frontend", {
  path: "packages/frontend",
  build: {
    output: "dist",
    command: "npm run build",
  },
  // domain: $app.stage === "production" 
  // ? {
  //   name: "notes.showmen.wslabs.no",
  //   redirects: ["www.notes.showmen.wslabs.no"],
  // } 
  // : $app.stage === "dev" 
  // ? {
  //   name: `${$app.stage}.notes.showmen.wslabs.no` ,
  //   redirects: [`www.${$app.stage}.notes.showmen.wslabs.no`],
  // }  
  // : undefined,
  environment: {
    VITE_REGION: region,
    VITE_API_URL: api.url,
    VITE_BUCKET: bucket.name,
    VITE_USER_POOL_ID: userPool.id,
    VITE_IDENTITY_POOL_ID: identityPool.id,
    VITE_USER_POOL_CLIENT_ID: userPoolClient.id,
    VITE_STRIPE_PUBLISHABLE_KEY: publishableSecret.value
  },
});