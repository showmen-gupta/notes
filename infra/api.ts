import { table, secret, publishableSecret } from "./storage";

// Create the API
export const api = new sst.aws.ApiGatewayV2("Api", {
  cors: true,
  // domain: $app.stage === "production" 
  // ? 'notesapi.showmen.wslabs.no' 
  // : $app.stage === "dev" 
  // ? `notesapi-${$app.stage}.showmen.wslabs.no` 
  // : undefined,

  transform: {
    route: {
      handler: {
        link: [table, secret, publishableSecret],
      },
      args: {
        auth: { iam: true }
      },      
    }
  }
});

api.route("POST /notes", "packages/functions/src/create.main");
api.route("GET /notes/{id}", "packages/functions/src/get.main");
api.route("GET /notes", "packages/functions/src/list.main");
api.route("PUT /notes/{id}", "packages/functions/src/update.main");
api.route("DELETE /notes/{id}", "packages/functions/src/delete.main");
api.route("POST /billing", "packages/functions/src/billing.main");