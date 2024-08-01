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

async function getURLsFromHTML(baseURL) {
  const response = await fetch(baseURL);
  const html = await response.text();

  console.log(html);

  const dom = new JSDOM(html);
  const listOfAnchors = [];
  dom.window.document
    .querySelectorAll("a")
    .forEach((item) => listOfAnchors.push(item.toString()));

  console.log(listOfAnchors);
}
export { normalizeURL, getURLsFromHTML };
