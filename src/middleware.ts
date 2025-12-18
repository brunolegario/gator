import { CommandHandler, UserCommandHandler } from "./commands/commands";
import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/users";

export function middlewareLoggedIn(
  handler: UserCommandHandler
): CommandHandler {
  return async (cmdName: string, ...args: string[]): Promise<void> => {
    const config = readConfig();
    const userName = config.currentUserName;
    if (!userName) {
      throw new Error(`No user is currently logged in. Please log in first.`);
    }

    const user = await getUser(userName);
    if (!user) {
      throw new Error(`User ${userName} not found in the database.`);
    }

    await handler(cmdName, user, ...args);
  };
}
