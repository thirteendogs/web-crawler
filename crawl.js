import { JSDOM } from "jsdom";

async function getHtmlFromUrl(url) {
  try {
    const response = await fetch(url);

    if (response.status > 399) {
      console.error(
        `Error trying to fetch on ${url} with status ${response.status}.`,
      );
      return;
    }

    if (!response.headers.get("content-type").includes("text/html")) {
      console.error(
        `No html content found, the content type is ${response.headers.get("content-type")}`,
      );
      return;
    }
    const html = await response.text();
    console.log(html);
    return html;
  } catch (error) {
    console.error(error.message);
  }
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
