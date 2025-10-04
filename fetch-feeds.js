import Parser from "rss-parser";
import fs from "fs";

const parser = new Parser();
const feeds = [
  "https://www.archdaily.com/rss",
  "https://www.highsnobiety.com/feed/"
];

async function fetchFeeds() {
  for (let url of feeds) {
    const feed = await parser.parseURL(url);
    feed.items.slice(0, 2).forEach(item => {
      const content = `---
title: "${item.title.replace(/"/g, "'")}"
date: "${new Date().toISOString()}"
---
${item.contentSnippet}

[Read more here](${item.link})
`;
      const filename = `site/content/posts/${Date.now()}.md`;
      fs.writeFileSync(filename, content);
    });
  }
}

fetchFeeds();
