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

async function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const URLs = [];
  dom.window.document
    .querySelectorAll("a")
    .forEach((item) => URLs.push(item.toString()));

  const absoluteURLs = URLs.map((URL) => {
    if (URL.startsWith("/")) {
      return `${baseURL}${URL}`;
    } else {
      return URL;
    }
  });
  console.log(absoluteURLs);
  return absoluteURLs;
}

async function getHTMLfromURL(url) {
  const response = await fetch(url);
  const html = await response.text();

  return html;
}
export { normalizeURL, getURLsFromHTML, getHTMLfromURL };
