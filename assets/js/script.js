"use strict";

const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");
const savedTheme = localStorage.getItem("theme") || "light";
const readMoreButtons = document.querySelectorAll(".read-more-btn");
const grid = document.querySelector(".testimonials-grid");
const prevBtn = document.querySelector(".testimonials-nav .prev-btn");
const nextBtn = document.querySelector(".testimonials-nav .next-btn");

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

/* --- Testimonials Auto-Slide & Arrow Navigation (Pure JavaScript) --- */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".testimonials-grid");
  const prevBtn = document.querySelector(".testimonials-nav .prev-btn");
  const nextBtn = document.querySelector(".testimonials-nav .next-btn");

  if (!grid) return;

  const cards = grid.querySelectorAll(".testimonial-card");
  if (cards.length === 0) return;

  let currentIndex = 0;

  function getVisibleCount() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  function scrollToCard(index) {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseInt(window.getComputedStyle(grid).gap) || 32;
    const scrollAmount = index * (cardWidth + gap);

    grid.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  function nextTestimonial() {
    const visibleCount = getVisibleCount();
    const maxIndex = cards.length - visibleCount;

    currentIndex++;
    if (currentIndex > maxIndex) {
      currentIndex = 0; // Loop back to the start
    }
    scrollToCard(currentIndex);
  }

  function prevTestimonial() {
    const visibleCount = getVisibleCount();
    const maxIndex = cards.length - visibleCount;

    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = maxIndex; // Loop to the end
    }
    scrollToCard(currentIndex);
  }

  // Manual arrow controls with timer reset
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextTestimonial();
      resetInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevTestimonial();
      resetInterval();
    });
  }

  // Automatic sliding loop every 4 seconds
  let slideInterval = setInterval(nextTestimonial, 4000);

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextTestimonial, 4000);
  }

  // Pause auto-sliding on hover
  grid.addEventListener("mouseenter", () => clearInterval(slideInterval));
  grid.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextTestimonial, 4000);
  });

  // Re-align on resize
  window.addEventListener("resize", () => {
    scrollToCard(currentIndex);
  });
});

/* --- About page resume Download conditions --- */
document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("downloadResumeBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", (e) => {
      // Optional visual confirmation animation
      downloadBtn.classList.add("downloading");
      const textSpan = downloadBtn.querySelector("span");
      const originalText = textSpan.textContent;

      textSpan.textContent = "Downloading...";

      // Reset button text after download triggers
      setTimeout(() => {
        downloadBtn.classList.remove("downloading");
        textSpan.textContent = "Downloaded!";

        setTimeout(() => {
          textSpan.textContent = originalText;
        }, 2500);
      }, 1500);
    });
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
  items.forEach((item) => {
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
      behavior: "smooth",
    });
  }

  // Automatically trigger slide every 3.5 seconds
  let slideInterval = setInterval(slideGallery, 3000);

  // Pause auto-slide when user hovers over the gallery
  galleryGrid.addEventListener("mouseenter", () =>
    clearInterval(slideInterval),
  );
  galleryGrid.addEventListener("mouseleave", () => {
    slideInterval = setInterval(slideGallery, 3000);
  });
});
