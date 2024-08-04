import readline from "node:readline";
import { getHtmlFromUrl } from "./crawl.js";

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("What's URL you want to crawl? ", (url) => {
    console.log(getHtmlFromUrl(url));
    rl.close();
  });
}

main();
