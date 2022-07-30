import { Application, Router } from "oak";
import { port, hostname } from "@settings";
import { denoHandler, rootHandler } from "./handlers.ts";
import { middlewares } from "./middlewares.ts";

export async function startServer(app: Application) {
  setupServer(app);

  console.log(`Starting server at http://${hostname}:${port}`);
  return await app.listen({ port, hostname });
}

function setupServer(app: Application) {
  // add middlewares
  middlewares.map((middleware) => app.use(middleware));

  // add handlers / controllers
  app.use(router.routes());
}

const router = new Router()
  .get("/", rootHandler)
  .post("/", rootHandler)
  .get("/deno", denoHandler)
  .post("/deno", denoHandler);
