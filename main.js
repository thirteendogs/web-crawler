import { normalizeURL, getHTML } from "./crawl.js";

const urls = [
  "https://blog.boot.dev/path/",
  "https://blog.boot.dev/path",
  "http://blog.boot.dev/path/",
  "http://blog.boot.dev/path",
];
const normalizedURL = "blog.boot.dev/path";
const defectuousURL = "https://bloggg.booeet.devvv/path/";

for (const url of urls) {
  console.log(normalizeURL(url));
}

getHTML(urls[0]);
