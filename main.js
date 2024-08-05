import readline from "node:readline";
import { crawlPage } from "./crawl.js";

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("What's URL you want to crawl? ", async (baseURL) => {
    const pages = await crawlPage(baseURL, baseURL, {});

    for (const page of Object.entries(pages)) {
      console.log(page);
    }

    rl.close();
  });
}

main();
