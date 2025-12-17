import {
  CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import {
  handlerLogin,
  handlerRegister,
  handlerResetUsers,
  handlerListUsers,
} from "./commands/users";

async function main() {
  const registry: CommandsRegistry = {};
  await registerCommand(registry, "login", handlerLogin);
  await registerCommand(registry, "register", handlerRegister);
  await registerCommand(registry, "reset", handlerResetUsers);
  await registerCommand(registry, "users", handlerListUsers);

  const args = process.argv.slice(2);
  const commandName = args[0];
  const commandArgs = args.slice(1);

  if (!commandName) {
    console.error("Not enough arguments provided.");
    process.exit(1);
  }

  if (
    commandArgs.length === 0 &&
    (commandName === "login" || commandName === "register")
  ) {
    console.error("Username is required for login and register commands.");
    process.exit(1);
  }

  try {
    await runCommand(registry, commandName, ...commandArgs);
  } catch (error: any) {
    if (error instanceof Error) {
      console.error(`Error running command ${commandName}: ${error.message}`);
    } else {
      console.error(`Error running command ${commandName}: ${error}`);
    }
    process.exit(1);
  }

  process.exit(0);
}

main();
