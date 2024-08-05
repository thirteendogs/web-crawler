import { JSDOM } from "jsdom";

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`crawling: ${currentURL}`);

  try {
    const response = await fetch(currentURL);

    if (response.status > 399) {
      console.error(
        `Error trying to fetch on ${currentURL} with status ${response.status}.`,
      );
      return pages;
    }

    if (!response.headers.get("content-type").includes("text/html")) {
      console.error(
        `No html content found, the content type is ${response.headers.get("content-type")}`,
      );
      return pages;
    }
    const html = await response.text();

    const nextURLs = getURLsFromHtml(html, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (error) {
    console.error(error.message);
  }
  return pages;
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

export { normalizeURL, getURLsFromHtml, crawlPage };
