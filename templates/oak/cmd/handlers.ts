import { Context } from "oak";

export const rootHandler = (ctx: Context) => {
  ctx.response.body = "Hello world!";
};

export const denoHandler = (ctx: Context) => {
  ctx.response.body = Deno.version;
};
