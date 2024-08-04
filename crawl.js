import { JSDOM } from "jsdom";

function getHtmlFromUrl(url) {
  console.log(url);
}

function getURLsFromHtml(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const anchors = dom.window.document.querySelectorAll("a");

  anchors.forEach((anchor) => {
    if (anchor.href.startsWith("/")) {
      try {
        const url = new URL(`${baseURL}${anchor.href}`);
        urls.push(url.href);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const url = new URL(anchor.href);
        urls.push(url.href);
      } catch (error) {
        console.log(error);
      }
    }
  });

  return urls;
}

function normalizeURL(url) {
  const myUrl = new URL(url);

  if (myUrl.pathname.endsWith("/")) {
    myUrl.pathname = myUrl.pathname.slice(0, -1);
  }

  return `${myUrl.hostname}${myUrl.pathname}`;
}

export { normalizeURL, getURLsFromHtml, getHtmlFromUrl };
