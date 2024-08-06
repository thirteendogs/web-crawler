function printReport(pages) {
  console.log("Report is Starting...");

  Object.entries(pages).forEach(([url, links]) => {
    console.log(`Found ${links} links on ${url}`);
  });
}
export { printReport };
