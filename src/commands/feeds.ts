import { createFeedFollow } from "../lib/db/queries/feed-follows";
import { createFeed, getFeeds } from "../lib/db/queries/feeds";
import { getUserById } from "../lib/db/queries/users";
import { Feed, User } from "../lib/db/schema";
import { printFeedFollow } from "./feed-follows";

export async function handlerAddFeed(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 2) {
    throw new Error(`Usage: ${cmdName} <feed-name> <feed-url>`);
  }

  const feedName = args[0];
  const feedUrl = args[1];

  const feed = await createFeed(feedName, feedUrl, user.id);
  if (!feed) {
    throw new Error(`Failed to create feed ${feedName} for user ${user.name}.`);
  }

  const feedFollow = await createFeedFollow(user.id, feed.id);
  printFeedFollow(user.name, feedFollow.feedName);

  console.log(`Feed ${feed.name} added successfully for user ${user.name}.`);
  printFeed(feed, user);
}

function printFeed(feed: Feed, user: User) {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}

export async function handlerListFeeds(_: string) {
  const feeds = await getFeeds();
  if (feeds.length === 0) {
    console.log("No feeds found.");
    return;
  }

  for (const feed of feeds) {
    const user = await getUserById(feed.userId);
    if (!user) {
      console.log(`Feed ${feed.name} has an invalid user ID: ${feed.userId}`);
      continue;
    }

    printFeed(feed, user);
    console.log("-------------------------");
  }
}
