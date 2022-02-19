import { Context } from "@deps";

export const rootHandler = (ctx: Context) => {
  ctx.response.body = "Hello world!";
};

export const denoHandler = (ctx: Context) => {
  ctx.response.body = Deno.version;
};
