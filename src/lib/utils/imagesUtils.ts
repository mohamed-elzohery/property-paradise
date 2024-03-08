function extractFileName(url: string): string {
  const parts = url.split("/");
  const lastPart = parts[parts.length - 1];
  // Extract filename without query parameters
  const filename = lastPart.split("?")[0] || "";
  return filename;
}
