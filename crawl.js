import { JSDOM } from "jsdom";

function normalizeURL(url) {
  const myUrl = new URL(url);

  if (!myUrl.hostname || myUrl.hostname !== "blog.boot.dev") {
    throw new Error("Invalid hostname");
  }

  if (myUrl.pathname.endsWith("/")) {
    myUrl.pathname = myUrl.pathname.slice(0, -1);
  }

  if (myUrl.pathname !== "/path") {
    throw new Error("Invalid pathname");
  }

  return `${myUrl.hostname}${myUrl.pathname}`;
}
async function getHTML(url) {
  const response = await fetch(url);
  const html = await response.text();
  console.log(html);
}

function getURLsFromHTML(htmlBody, baseURL) {}
export { normalizeURL, getHTML, getURLsFromHTML };
