"use strict";
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
const navbar = document.querySelector(".navbar");
const navItems = navLinks.querySelectorAll("a");

/* --- Universal Dark Theme Toggle --- */
document.addEventListener("DOMContentLoaded", () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  const toggleContainer = document.querySelector(".theme-container");
  if (toggleContainer) {
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
  if (navbar && !document.getElementById("hamburger")) {
    navbar.insertAdjacentHTML(
      "beforeend",
      `
            <button class="hamburger" id="hamburger" aria-label="Toggle Navigation">
              <img src="assets/icons/menu.png" alt="Menu" class="icon-menu" id="menu-icon"/>
              <img src="assets/icons/close.png" alt="Close" class="icon-close" id="close-icon"/>
            </button>
        `,
    );
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when a link is clicked

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }
});
