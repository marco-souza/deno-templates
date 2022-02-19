import { Application } from "@deps";
import { port, hostname } from "@settings";

import { graphqlServiceRouter } from "./graphql.ts";
import { middlewares } from "./middlewares.ts";

export async function startServer(app: Application) {
  setupServer(app);

  console.log(`Starting server at http://${hostname}:${port}/graphql`);
  return await app.listen({ port, hostname });
}

function setupServer(app: Application) {
  // add middlewares
  middlewares.map((middleware) => app.use(middleware));

  // add graphql handler
  app.use(graphqlServiceRouter.routes(), graphqlServiceRouter.allowedMethods());
}
