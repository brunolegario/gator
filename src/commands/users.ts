import { readConfig, setUser } from "../config";
import { createUser, getUser, resetUsers, getUsers } from "../lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  const userName = args[0];
  if (!userName) {
    throw new Error(`usage: ${cmdName} <name>`);
  }

  const existingUser = await getUser(userName);
  if (!existingUser) {
    throw new Error(`User "${userName}" does not exist.`);
  }

  setUser(existingUser.name);
  console.log(`User set to ${existingUser.name}`);
}

export async function handlerRegister(cmdName: string, ...args: string[]) {
  const userName = args[0];
  if (!userName) {
    throw new Error(`usage: ${cmdName} <name>`);
  }

  const user = await createUser(userName);
  if (!user) {
    throw new Error(`User ${userName} not found`);
  }

  setUser(user.name);
  console.log(`User "${userName}" registered successfully.`);
}

export async function handlerListUsers() {
  const users = await getUsers();
  if (users.length === 0) {
    console.log("No users found.");
    return;
  }

  const loggedUser = readConfig().currentUserName;
  users.forEach((user) => {
    if (user.name === loggedUser) {
      console.log(`* ${user.name} (current)`);
    } else {
      console.log(`* ${user.name}`);
    }
  });
}

export async function handlerResetUsers() {
  await resetUsers();
  console.log("All users have been reset.");
}
