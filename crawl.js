import { JSDOM } from "jsdom";

function getURLsFromHtml(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const anchors = dom.window.document.querySelectorAll("a");

  anchors.forEach((anchor) => urls.push(anchor.href));

  return urls;
}
function normalizeURL(url) {
  const myUrl = new URL(url);

  if (myUrl.pathname.endsWith("/")) {
    myUrl.pathname = myUrl.pathname.slice(0, -1);
  }

  return `${myUrl.hostname}${myUrl.pathname}`;
}

export { normalizeURL, getURLsFromHtml };
