import fetch from "node-fetch";
import { readFileSync } from "fs";
import { join } from "path";

export default async function handler(req, res) {
  const renderBackendURL = "https://eacademy-project.onrender.com";

  try {
    // Send a HEAD request to check if the Render backend is reachable
    const response = await fetch(renderBackendURL, {
      method: "HEAD",
      timeout: 3000, // 3 Sec in milliseconds
    });

    if (response.ok) {
      // If backend is reachable, redirect the user
      return res.redirect(302, renderBackendURL);
    }
  } catch (err) {
    console.error("Backend check failed:", err);
  }

  // If backend is unreachable, serve the static loading page
  const loadingPagePath = join(process.cwd(), "public", "loading.html");
  try {
    const loadingPageContent = readFileSync(loadingPagePath, "utf8"); // Read the HTML file
    res.status(200).send(loadingPageContent); // Send HTML content to the browser
  } catch (error) {
    console.error("Error reading loading.html:", error);
    res.status(500).send("Error loading the service page.");
  }
}