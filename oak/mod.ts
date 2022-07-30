import { Application } from "oak";
import { startServer } from "@cmd/server.ts";

const app = new Application();

if (import.meta.main) {
  await startServer(app);
}
