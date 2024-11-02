function displayTopSites() {
    chrome.topSites.get((sites) => {
        let topSitesList = document.getElementById("top-sites-list");

        // Limit to the top 5 sites
        let topSites = sites.slice(0, 5);

        // Display each site with its favicon and title
        topSites.forEach((site) => {
            let listItem = document.createElement("li");

            // Create favicon element
            let favicon = document.createElement("img");
            favicon.src = `${new URL(site.url).origin}/favicon.ico`; // Generate favicon URL
            favicon.width = 16;  // Set width for consistency
            favicon.height = 16; // Set height for consistency
            favicon.alt = "";    // Decorative alt text

            // Add error handling to use a default icon if favicon is missing
            favicon.onerror = () => {
                favicon.src = "default-icon.png"; // Replace with path to your placeholder icon
            };

            // Create link element
            let link = document.createElement("a");
            link.href = site.url;
            link.textContent = site.title || site.url;
            link.target = "_blank"; // Opens the link in a new tab

            // Append favicon and link to list item
            listItem.appendChild(favicon);
            listItem.appendChild(link);
            topSitesList.appendChild(listItem);
        });
    });
}

// Run displayTopSites when the popup is loaded
document.addEventListener("DOMContentLoaded", displayTopSites);
