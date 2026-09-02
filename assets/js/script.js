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
  );"use strict";

/**
 * ============================================================================
 * 1. TOP-LEVEL CONSTANTS & CONFIGURATION
 * ============================================================================
 */
// DOM Element Selectors
const SELECTORS = {
  themeToggleSwitch: '.theme-switch-wrapper input[type="checkbox"]',
  testimonialGrid: ".testimonials-grid",
  testimonialCard: ".testimonial-card",
  testimonialPrevBtn: ".testimonials-nav .prev-btn",
  testimonialNextBtn: ".testimonials-nav .next-btn",
  downloadResumeBtn: "#downloadResumeBtn",
  readMoreBtn: ".read-more-btn",
  skillCard: ".skill-card",
  moreText: ".more-text",
  galleryGrid: ".gallery-grid",
  galleryItem: ".gallery-item",
};

// Component Configurations
const CONFIG = {
  mobileBreakpoint: 768,
  testimonialSlideDelay: 4000, // Speed in ms
  testimonialDefaultGap: 32,   // Fallback gap in px
  gallerySlideDelay: 3000,     // Speed in ms
  galleryGap: 24,              // Gap in px (1.5rem)
  resumeResetDelay: 2500,      // Text reset delay in ms
  resumeDownloadDelay: 1500,   // Trigger delay in ms
};

/**
 * ============================================================================
 * 2. APPLICATION INITIALIZATION
 * ============================================================================
 */
document.addEventListener("DOMContentLoaded", () => {
  initThemeManager();
  initTestimonialSlider();
  initResumeDownload();
  initReadMoreToggle();
  initGallerySlider();
});

/**
 * ============================================================================
 * 3. MODULE IMPLEMENTATIONS
 * ============================================================================
 */

/* --- Theme Manager --- */
function initThemeManager() {
  const toggleSwitch = document.querySelector(SELECTORS.themeToggleSwitch);
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (toggleSwitch && currentTheme === "dark") {
      toggleSwitch.checked = true;
    }
  }

  if (toggleSwitch) {
    toggleSwitch.addEventListener("change", (e) => {
      const newTheme = e.target.checked ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);
    });
  }
}

/* --- Testimonials Slider --- */
function initTestimonialSlider() {
  const grid = document.querySelector(SELECTORS.testimonialGrid);
  const prevBtn = document.querySelector(SELECTORS.testimonialPrevBtn);
  const nextBtn = document.querySelector(SELECTORS.testimonialNextBtn);

  if (!grid) return;

  const cards = grid.querySelectorAll(SELECTORS.testimonialCard);
  if (!cards.length) return;

  let currentIndex = 0;
  let slideInterval;

  const getVisibleCount = () => (window.innerWidth <= CONFIG.mobileBreakpoint ? 1 : 3);

  const scrollToCard = (index) => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseInt(window.getComputedStyle(grid).gap) || CONFIG.testimonialDefaultGap;
    grid.scrollTo({
      left: index * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const moveSlide = (direction) => {
    const maxIndex = Math.max(0, cards.length - getVisibleCount());

    currentIndex += direction;
    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;

    scrollToCard(currentIndex);
  };

  const startAutoSlide = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => moveSlide(1), CONFIG.testimonialSlideDelay);
  };

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      moveSlide(1);
      startAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      moveSlide(-1);
      startAutoSlide();
    });
  }

  grid.addEventListener("mouseenter", () => clearInterval(slideInterval));
  grid.addEventListener("mouseleave", startAutoSlide);
  window.addEventListener("resize", () => scrollToCard(currentIndex));

  startAutoSlide();
}

/* --- Resume Download --- */
function initResumeDownload() {
  const downloadBtn = document.querySelector(SELECTORS.downloadResumeBtn);

  if (!downloadBtn) return;

  downloadBtn.addEventListener("click", () => {
    const textSpan = downloadBtn.querySelector("span");
    if (!textSpan) return;

    const originalText = textSpan.textContent;

    downloadBtn.classList.add("downloading");
    textSpan.textContent = "Downloading...";

    setTimeout(() => {
      downloadBtn.classList.remove("downloading");
      textSpan.textContent = "Downloaded!";

      setTimeout(() => {
        textSpan.textContent = originalText;
      }, CONFIG.resumeResetDelay);
    }, CONFIG.resumeDownloadDelay);
  });
}

/* --- Read More Toggle --- */
function initReadMoreToggle() {
  const readMoreButtons = document.querySelectorAll(SELECTORS.readMoreBtn);

  readMoreButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      const card = this.closest(SELECTORS.skillCard);
      if (!card) return;

      const moreText = card.querySelector(SELECTORS.moreText);
      if (!moreText) return;

      const isHidden = moreText.style.display === "none" || moreText.style.display === "";

      moreText.style.display = isHidden ? "inline" : "none";
      this.textContent = isHidden ? "Read Less" : "Read More";
    });
  });
}

/* --- Gallery Slider --- */
function initGallerySlider() {
  const galleryGrid = document.querySelector(SELECTORS.galleryGrid);
  if (!galleryGrid) return;

  Object.assign(galleryGrid.style, {
    display: "flex",
    overflow: "hidden",
    scrollBehavior: "smooth",
    gap: "1.5rem",
  });

  const items = galleryGrid.querySelectorAll(SELECTORS.galleryItem);
  if (!items.length) return;

  items.forEach((item) => {
    item.style.flex = "0 0 calc(33.333% - 1rem)";
    item.style.boxSizing = "border-box";
  });

  let currentIndex = 0;
  let slideInterval;

  const slideGallery = () => {
    const visibleCount = window.innerWidth <= CONFIG.mobileBreakpoint ? 1 : 3;
    const maxIndex = Math.max(0, items.length - visibleCount);

    currentIndex++;
    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    const itemWidth = items[0].getBoundingClientRect().width + CONFIG.galleryGap;
    galleryGrid.scrollTo({
      left: currentIndex * itemWidth,
      behavior: "smooth",
    });
  };

  const startAutoSlide = () => {
    slideInterval = setInterval(slideGallery, CONFIG.gallerySlideDelay);
  };

  galleryGrid.addEventListener("mouseenter", () => clearInterval(slideInterval));
  galleryGrid.addEventListener("mouseleave", startAutoSlide);

  startAutoSlide();
};
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

// Run this in console to force show
document.querySelector('#hamburger').style.display = 'flex';
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');

const checkImages = () => {
  return new Promise((resolve) => {
    let loaded = 0;
    const total = 2;
    const results = {};

    const handler = () => {
      loaded++;
      if (loaded === total) {
        results.menuWidth = menuIcon.naturalWidth;
        results.closeWidth = closeIcon.naturalWidth;
        resolve(results);
      }
    };

    menuIcon.onload = handler;
    menuIcon.onerror = handler;
    closeIcon.onload = handler;
    closeIcon.onerror = handler;
    
    // In case they are already cached/loaded
    if(menuIcon.complete && closeIcon.complete) {
        results.menuWidth = menuIcon.naturalWidth;
        results.closeWidth = closeIcon.naturalWidth;
        resolve(results);
    }
  });
};

 checkImages();
