import { db } from "..";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import { firstOrUndefined } from "./utils";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name: string) {
  const user = await db.select().from(users).where(eq(users.name, name));
  return firstOrUndefined(user);
}

export async function getUserById(id: string) {
  const user = await db.select().from(users).where(eq(users.id, id));
  return firstOrUndefined(user);
}

export async function getUsers() {
  const allUsers = await db.select().from(users);
  return allUsers;
}

export async function resetUsers() {
  await db.delete(users);
}
