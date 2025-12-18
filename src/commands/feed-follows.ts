import {
  createFeedFollow,
  deleteFeedFollow,
  getFeedFollowsForUser,
} from "../lib/db/queries/feed-follows";
import { getFeedByURL } from "../lib/db/queries/feeds";
import { User } from "../lib/db/schema";

export async function handlerFollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error(`Usage: ${cmdName} <feed-url>`);
  }

  const feedUrl = args[0];
  const feed = await getFeedByURL(feedUrl);
  if (!feed) {
    throw new Error(`Feed with URL ${feedUrl} not found.`);
  }

  const ffRow = await createFeedFollow(user.id, feed.id);

  console.log("Feed follow created:");
  printFeedFollow(ffRow.userName, ffRow.feedName);
}

export function printFeedFollow(username: string, feedName: string) {
  console.log(`* User:          ${username}`);
  console.log(`* Feed:          ${feedName}`);
}

export async function handlerListFeedFollows(_: string, user: User) {
  const feedFollows = await getFeedFollowsForUser(user.id);
  if (feedFollows.length === 0) {
    console.log(`User ${user.name} is not following any feeds.`);
    return;
  }

  console.log(`Feeds followed by user ${user.name}:`);
  for (const ff of feedFollows) {
    console.log(`* ${ff.feedName}`);
  }
}

export async function handlerUnfollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error(`Usage: ${cmdName} <feed-url>`);
  }

  const feedUrl = args[0];
  const feed = await getFeedByURL(feedUrl);
  if (!feed) {
    throw new Error(`Feed with URL ${feedUrl} not found.`);
  }

  const result = await deleteFeedFollow(feed.id, user.id);
  if (!result) {
    throw new Error(`Failed to unfollow feed: ${feedUrl}`);
  }

  console.log(`${feed.name} unfollowed successfully!`);
}
