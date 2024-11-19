import fetch from "node-fetch";
import { readFileSync } from "fs";
import { join } from "path";

export default async function handler(req, res) {
    const renderBackendURL = "https://eacademy-project.onrender.com";

    try {
        const response = await fetch(`${renderBackendURL}/health`, { timeout: 2000 });
        if (response.ok) {
            return res.redirect(302, renderBackendURL);
        }
    } catch (err) {
        console.error("Backend check failed:", err);
    }

    const loadingPagePath = join(process.cwd(), "public", "loading.html");
    const loadingPageContent = readFileSync(loadingPagePath, "utf8");
    res.status(200).send(loadingPageContent);
}
