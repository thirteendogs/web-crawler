import { getURLsFromHTML, getHTMLfromURL } from "./crawl.js";

const urls = [
  "https://blog.boot.dev/path/",
  "https://blog.boot.dev/path",
  "http://blog.boot.dev/path/",
  "http://blog.boot.dev/path",
];

const htmlBody = await getHTMLfromURL(urls[0]);
getURLsFromHTML(htmlBody, "https://blog.boot.dev");
