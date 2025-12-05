import { API_KEY } from "./config.js";
const URL = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;

function getTimeAgo(publishedDate) {
  if (!publishedDate) return "";
  
  const now = new Date();
  const published = new Date(publishedDate);
  const diffInSeconds = Math.floor((now - published) / 1000);
  
  if (diffInSeconds < 60) {
    return "just now";
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
}

async function loadStories() {
  const grid = document.getElementById("grid");

  try {
    const res = await fetch(URL);
    const data = await res.json();

    grid.innerHTML = "";

    data.results.slice(0, 24).forEach((story) => {
      const image = story.multimedia?.find(m => m.format === "superJumbo")?.url || 
                    story.multimedia?.find(m => m.format === "threeByTwoSmallAt2X")?.url ||
                    story.multimedia?.[0]?.url || "";
      const title = story.title;
      const link = story.url;
      const abstract = story.abstract || "";
      const section = story.section || "";
      const byline = story.byline || "";
      const publishedDate = story.published_date || "";
      const timeAgo = getTimeAgo(publishedDate);

      const card = document.createElement("a");
      card.className = "card";
      card.href = link;
      card.target = "_blank";
      card.rel = "noopener noreferrer";

      const imageContainer = document.createElement("div");
      imageContainer.className = "card-image-container";

      if (image) {
        const img = document.createElement("img");
        img.src = image;
        img.alt = title;
        img.loading = "lazy";
        imageContainer.appendChild(img);
      } else {
        // Fallback background if no image
        imageContainer.style.background = "#e0e0e0";
      }

      card.appendChild(imageContainer);

      // Add text content below image
      const textContent = document.createElement("div");
      textContent.className = "text";

      if (section) {
        const sectionEl = document.createElement("span");
        sectionEl.className = "section";
        sectionEl.textContent = section;
        textContent.appendChild(sectionEl);
      }

      const h2 = document.createElement("h2");
      h2.textContent = title;
      textContent.appendChild(h2);

      if (abstract) {
        const abstractEl = document.createElement("p");
        abstractEl.className = "abstract";
        abstractEl.textContent = abstract;
        textContent.appendChild(abstractEl);
      }

      if (byline) {
        const bylineEl = document.createElement("p");
        bylineEl.className = "byline";
        bylineEl.textContent = byline;
        textContent.appendChild(bylineEl);
      }

      if (timeAgo) {
        const timeAgoEl = document.createElement("p");
        timeAgoEl.className = "byline";
        timeAgoEl.textContent = timeAgo;
        textContent.appendChild(timeAgoEl);
      }

      card.appendChild(textContent);
      grid.appendChild(card);
    });

  } catch (err) {
    console.error("NYT fetch error:", err);
    grid.innerHTML = "<p>Failed to load stories.</p>";
  }
}

// Dark mode toggle functionality
function initDarkMode() {
  const toggle = document.getElementById("dark-mode-toggle");
  const body = document.body;
  
  // Check for saved preference or default to light mode
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  
  if (isDarkMode) {
    body.classList.add("dark-mode");
    toggle.querySelector(".toggle-icon").textContent = "☀️";
  }
  
  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
    toggle.querySelector(".toggle-icon").textContent = isDark ? "☀️" : "🌙";
  });
}

// Initialize dark mode on page load
initDarkMode();

loadStories();
