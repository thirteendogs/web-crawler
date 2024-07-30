import { test, describe, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

const urls = [
  "https://blog.boot.dev/path/",
  "https://blog.boot.dev/path",
  "http://blog.boot.dev/path/",
  "http://blog.boot.dev/path",
];
const normalizedURL = "blog.boot.dev/path";
const defectuousHostnameURL = "https://bloggg.booeet.devvv/path/";
const defectuousPathnameURL = "http://blog.boot.dev/wrongpathname";

describe("normalizeURL", () => {
  test("should return the normalized url", () => {
    for (const url of urls) {
      expect(normalizeURL(url)).toBe(normalizedURL);
    }
  });
  test("should throw an error if url is empty", () => {
    expect(() => normalizeURL()).toThrow("Invalid URL");
  });
  test("should throw an error if the URL has wrong hostname", () => {
    expect(() => normalizeURL(defectuousHostnameURL)).toThrow(
      "Invalid hostname",
    );
  });
  test("should throw an error if the URL has wrong pathname", () => {
    expect(() => normalizeURL(defectuousPathnameURL)).toThrow(
      "Invalid pathname",
    );
  });
});
