function displayTopSites() {
    chrome.topSites.get((sites) => {
        let topSitesList = document.getElementById("top-sites-list");

        let topSites = sites.slice(0, 5);

        topSites.forEach((site) => {
            let listItem = document.createElement("li");

            let favicon = document.createElement("img");
            favicon.src = `${new URL(site.url).origin}/favicon.ico`; 
            favicon.width = 16; 
            favicon.height = 16; 
            favicon.alt = "";    

            favicon.onerror = () => {
                favicon.src = "default-icon.png";
            };

            let link = document.createElement("a");
            link.href = site.url;
            link.textContent = site.title || site.url;
            link.target = "_blank"; 


            listItem.appendChild(favicon);
            listItem.appendChild(link);
            topSitesList.appendChild(listItem);
        });
    });
}

document.addEventListener("DOMContentLoaded", displayTopSites);
