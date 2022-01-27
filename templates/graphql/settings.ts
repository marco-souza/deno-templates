export const port: number = parseInt(Deno.env.get("PORT") ?? "8000", 10);
export const hostname: string = Deno.env.get("HOST") ?? "localhost";
