import fetch from "node-fetch";
import { readFileSync } from "fs";
import { join } from "path";

export default async function handler(req, res) {
  const renderBackendURL = "https://eacademy-project.onrender.com";

  try {
    // Check if Render backend is live
    const response = await fetch(`${renderBackendURL}/health`, { timeout: 5000 });
    if (response.ok) {
      return res.redirect(302, renderBackendURL);
    }
  } catch (err) {
    console.error("Backend check failed:", err);
  }

  // If backend is down, serve the static loading page
  const loadingPagePath = join(process.cwd(), "public", "loading.html");
  try {
    const loadingPageContent = readFileSync(loadingPagePath, "utf8");
    res.status(200).send(loadingPageContent);
  } catch (error) {
    console.error("Error reading loading.html:", error);
    res.status(500).send("Error loading the service page.");
  }
}
