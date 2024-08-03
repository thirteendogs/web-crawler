function normalizeURL(url) {
  const myUrl = new URL(url);

  if (myUrl.pathname.endsWith("/")) {
    myUrl.pathname = myUrl.pathname.slice(0, -1);
  }

  return `${myUrl.hostname}${myUrl.pathname}`;
}

export { normalizeURL };
