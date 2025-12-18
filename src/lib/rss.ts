import { XMLParser } from "fast-xml-parser";

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedUrl: string) {
  const result = await fetch(feedUrl, {
    method: "GET",
    headers: {
      "User-Agent": "gator",
      accept: "application/rss+xml",
    },
  });

  if (!result.ok) {
    throw new Error(
      `Failed to fetch feed: ${result.status} ${result.statusText}`
    );
  }

  const feedData = await result.text();
  return parseFeed(feedData);
}

function parseFeed(xmlData: string) {
  const parser = new XMLParser();
  const parsed = parser.parse(xmlData);

  const channel = parsed.rss?.channel;
  if (!channel) {
    throw new Error("Invalid RSS feed format: missing channel");
  }

  if (
    !channel.title ||
    !channel.link ||
    !channel.description ||
    !channel.item
  ) {
    throw new Error(
      "Invalid RSS feed format: missing required fields from channel"
    );
  }

  const items: any[] = Array.isArray(channel.item)
    ? channel.item
    : [channel.item];
  const rssItems: RSSItem[] = [];

  for (const item of items) {
    if (!item.title || !item.link || !item.description || !item.pubDate) {
      continue;
    }

    rssItems.push({
      title: item.title,
      link: item.link,
      description: item.description,
      pubDate: item.pubDate,
    });
  }

  const rss: RSSFeed = {
    channel: {
      title: channel.title,
      link: channel.link,
      description: channel.description,
      item: rssItems,
    },
  };

  return rss;
}
