"use strict";
const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
/* --- Universal Theme Toggle Injector for Dedicated Containers --- */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Apply saved theme immediately on page load

  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  // 2. Find the empty container on the current page
  const toggleContainer = document.querySelector(".theme-container");

  if (toggleContainer) {
    // Populate the container with the toggle switch HTML
    toggleContainer.innerHTML = `
            <div class="theme-switch-wrapper">
                <label class="theme-switch" for="dark-mode-checkbox">
                    <input type="checkbox" id="dark-mode-checkbox" ${currentTheme === "dark" ? "checked" : ""} />
                    <div class="slider"></div>
                </label>
                <span class="theme-label">Dark Mode</span>
            </div>
        `;

    // 3. Handle change events and state persistence
    const toggleSwitch = toggleContainer.querySelector("#dark-mode-checkbox");
    if (toggleSwitch) {
      toggleSwitch.addEventListener("change", (e) => {
        if (e.target.checked) {
          document.documentElement.setAttribute("data-theme", "dark");
          localStorage.setItem("theme", "dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          localStorage.setItem("theme", "light");
        }
      });
    }
  }

  /* --- The hamburger-menu --- */

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked
    const navItems = navLinks.querySelectorAll("a");

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }
});
