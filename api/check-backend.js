export default async function handler(req, res) {
    const renderBackendURL = "https://eacademy-project.onrender.com/";
  
    try {
      // Check if Render is up
      const response = await fetch(`${renderBackendURL}/health`, { timeout: 2000 });
      if (response.ok) {
        // Redirect to Render service if available
        return res.redirect(302, renderBackendURL);
      }
    } catch (err) {
      // Ignore errors, backend is down
    }
  
    // If Render is down, show the loading page
    res.status(200).sendFile("loading.html", { root: "./public" });
  }
  