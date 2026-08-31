"use strict";

const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");
const savedTheme = localStorage.getItem("theme") || "light";
const readMoreButtons = document.querySelectorAll(".read-more-btn");



document.addEventListener("DOMContentLoaded", () => {
  console.log("Website Loaded");

  // Dark Mode Toggle
  /* --- Theme Toggle Functionality --- */
  const toggleSwitch = document.querySelector(
    '.theme-switch-wrapper input[type="checkbox"]',
  );

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  if (toggleSwitch) {
    toggleSwitch.addEventListener("change", switchTheme, false);
  }
});
/* --- Services conditions --- */

readMoreButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.preventDefault();

    const card = this.closest(".skill-card");
    const moreText = card.querySelector(".more-text");

    if (moreText.style.display === "none") {
      moreText.style.display = "inline";
      this.textContent = "Read Less";
    } else {
      moreText.style.display = "none";
      this.textContent = "Read More";
    }
  });
});

/* --- Automatic Sliding Image Gallery (Pure JavaScript) --- */
document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.querySelector(".gallery-grid");
    if (!galleryGrid) return;

    // Optional: Style container to act as a sliding track or flex row
    galleryGrid.style.display = "flex";
    galleryGrid.style.overflow = "hidden";
    galleryGrid.style.scrollBehavior = "smooth";
    galleryGrid.style.gap = "1.5rem";

    const items = galleryGrid.querySelectorAll(".gallery-item");
    
    // Ensure all items have a fixed flexible width so they slide nicely
    items.forEach(item => {
        item.style.flex = "0 0 calc(33.333% - 1rem)";
        item.style.boxSizing = "border-box";
    });

    let currentIndex = 0;

    function slideGallery() {
        // Determine how many items fit based on screen width
        const visibleCount = window.innerWidth <= 768 ? 1 : 3;
        const maxIndex = items.length - visibleCount;

        currentIndex++;
        if (currentIndex > maxIndex) {
            currentIndex = 0; // Loop back to start
        }

        // Calculate scroll position based on item width + gap
        const itemWidth = items[0].getBoundingClientRect().width + 24; // 24px matches 1.5rem gap
        galleryGrid.scrollTo({
            left: currentIndex * itemWidth,
            behavior: "smooth"
        });
    }

    // Automatically trigger slide every 3.5 seconds
    let slideInterval = setInterval(slideGallery, 3000);

    // Pause auto-slide when user hovers over the gallery
    galleryGrid.addEventListener("mouseenter", () => clearInterval(slideInterval));
    galleryGrid.addEventListener("mouseleave", () => {
        slideInterval = setInterval(slideGallery, 3000);
    });
});