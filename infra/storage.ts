export const bucket = new sst.aws.Bucket("Uploads", {
  cors: true,
});
export const secret = new sst.Secret("StripeSecretKey");

// Create the DynamoDB table
export const table = new sst.aws.Dynamo("Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: { hashKey: "userId", rangeKey: "noteId" },
  });