import readline from "node:readline";
import { crawlPage } from "./crawl.js";
import { printReport } from "./report.js";

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("What's URL you want to crawl? ", async (baseURL) => {
    const pages = await crawlPage(baseURL, baseURL, {});
    printReport(pages);

    rl.close();
  });
}

main();
