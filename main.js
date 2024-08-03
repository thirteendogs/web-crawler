import { normalizeURL } from "./crawl.js";

const urls = [
  "https://blog.boot.dev/path/",
  "https://blog.boot.dev/path",
  "http://blog.boot.dev/path/",
  "http://blog.boot.dev/path",
  "http://google.com/pepperoni/",
];

for (const url of urls) {
  console.log(normalizeURL(url));
}
