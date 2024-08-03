import { test, describe, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

const urls = [
  "https://blog.boot.dev/path/",
  "https://blog.boot.dev/path",
  "http://blog.boot.dev/path/",
  "http://blog.boot.dev/path",
  "http://BLOG.boot.dev/path/",
];
const normalizedURL = "blog.boot.dev/path";

describe("normalizeURL", () => {
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
