function main() {
  console.log('Hello', Deno.args.join(' ') || 'World');
}

if (import.meta.main) main();
