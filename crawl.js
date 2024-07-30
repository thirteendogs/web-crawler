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

export { normalizeURL };
