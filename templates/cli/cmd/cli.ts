import { Command, colors } from "~deps";

interface IOptions {
  name: string;
}

/**
 * Main CLI command, as of right now the CLI does not have sub-commands.
 */
export async function run() {
  const cmd = makeCommand();
  const args = await cmd.parse(Deno.args);
  console.log(args);
}

function makeCommand() {
  return new Command()
    .name("deno-cli")
    .version("v1.0.0")
    .description("Sample of deno CLI.")
    .option("-n, --name [name:string]", "Add a custom name.", { default: "World" })
    .action((options: IOptions) => {
      console.log(`Hello, ${colors.red(options.name)}!`);
    });
}
