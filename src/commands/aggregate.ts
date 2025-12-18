import { getNextFeedToFetch, markFeedFetched } from "../lib/db/queries/feeds";
import { Feed, NewPost } from "../lib/db/schema";
import { fetchFeed } from "../lib/rss";
import { parseDuration } from "../lib/time";
import { createPost } from "../lib/db/queries/posts";

export async function handlerAgg(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`Usage: ${cmdName} <time_between_reqs>`);
  }

  const time = args[0];
  const timeBetweenReqs = parseDuration(time);
  if (!timeBetweenReqs) {
    throw new Error(
      `Invalid duration format: ${time} — use format 1h 30m 15s or 3500ms`
    );
  }

  console.log(`Starting aggregation every ${time}...`);

  scrapeFeeds().catch(handleError);
  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, timeBetweenReqs);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregation...");
      clearInterval(interval);
      resolve();
    });
  });
}

export async function scrapeFeeds() {
  const feed = await getNextFeedToFetch();
  if (!feed) {
    console.log("No feeds to fetch.");
    return;
  }

  console.log(`Fetching feed: ${feed.name}`);
  await scrapeFeed(feed);
}

export async function scrapeFeed(feed: Feed) {
  await markFeedFetched(feed.id);

  const feedData = await fetchFeed(feed.url);
  for (let item of feedData.channel.item) {
    console.log(`Found post: ${item.title}`);
    const now = new Date();

    await createPost({
      url: item.link,
      feedId: feed.id,
      title: item.title,
      createdAt: now,
      updatedAt: now,
      description: item.description,
      publishedAt: new Date(item.pubDate),
    } satisfies NewPost);
  }

  console.log(
    `Feed ${feed.name} collected, ${feedData.channel.item.length} posts found`
  );
}

function handleError(err: unknown) {
  console.error(
    `Error during aggregation: ${err instanceof Error ? err.message : err}`
  );
}
