import {
  CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import { handlerAgg } from "./commands/aggregate";
import {
  handlerLogin,
  handlerRegister,
  handlerResetUsers,
  handlerListUsers,
} from "./commands/users";
import { handlerAddFeed, handlerListFeeds } from "./commands/feeds";
import {
  handlerFollow,
  handlerListFeedFollows,
  handlerUnfollow,
} from "./commands/feed-follows";
import { middlewareLoggedIn } from "./middleware";

async function main() {
  const registry: CommandsRegistry = {};
  await registerCommand(registry, "login", handlerLogin);
  await registerCommand(registry, "register", handlerRegister);
  await registerCommand(registry, "reset", handlerResetUsers);
  await registerCommand(registry, "users", handlerListUsers);
  await registerCommand(registry, "agg", handlerAgg);
  await registerCommand(registry, "feeds", handlerListFeeds);
  await registerCommand(
    registry,
    "addfeed",
    middlewareLoggedIn(handlerAddFeed)
  );
  await registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
  await registerCommand(
    registry,
    "following",
    middlewareLoggedIn(handlerListFeedFollows)
  );
  await registerCommand(
    registry,
    "unfollow",
    middlewareLoggedIn(handlerUnfollow)
  );

  const args = process.argv.slice(2);
  const commandName = args[0];
  const commandArgs = args.slice(1);

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
