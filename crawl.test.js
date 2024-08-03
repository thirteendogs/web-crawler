import { test, describe, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHtml } from "./crawl.js";

describe("normalizeURL", () => {
  const urls = [
    "https://blog.boot.dev/path/",
    "https://blog.boot.dev/path",
    "http://blog.boot.dev/path/",
    "http://blog.boot.dev/path",
    "http://BLOG.boot.dev/path/",
  ];
  const normalizedURL = "blog.boot.dev/path";

  test("should return the normalized url", () => {
    for (const url of urls) {
      expect(normalizeURL(url)).toEqual(normalizedURL);
    }
  });
  test("should return normalized url without / in the end", () => {
    for (const url of urls) {
      expect(normalizeURL(url).endsWith("/")).toBeFalsy();
    }
  });
});

describe("getURLsFromHtml", () => {
  const htmlBody = `
    <html>
      <body>
        <a href="https://blog.boot.dev/">Frequently Asked Questions</a>
      </body>
    </html>
`;
  const baseUrl = "https://blog.boot.dev/";
  test("should return an array of urls", () => {
    expect(getURLsFromHtml(htmlBody, baseUrl)).toEqual([
      "https://blog.boot.dev/",
    ]);
  });
});
