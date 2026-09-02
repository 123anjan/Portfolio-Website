"use strict";

/* --- Universal Theme Toggle --- */
document.addEventListener("DOMContentLoaded", () => {
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  const toggleContainer = document.querySelector(".theme-container");

  if (toggleContainer) {
    // Populate the container with the toggle switch HTML
    toggleContainer.innerHTML = `
            <div class="theme-switch-wrapper">
                <label class="theme-switch" for="dark-mode-checkbox">
                <label class="theme-switch" for="dark-mode-checkbox"aria-label="Toggle dark mode">
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
  const navbar = document.querySelector(".navbar");
  if (navbar && !document.getElementById("hamburger")) {
    navbar.insertAdjacentHTML(
      "beforeend",
      `
        <button class="hamburger" id="hamburger" aria-label="Toggle Navigation">
          <img src="https://github.com/123anjan/Portfolio-Website/blob/main/assets/icons/close.png" alt="Menu" class="icon-menu" id="menu-icon"/>
          <img src="https://github.com/123anjan/Portfolio-Website/blob/main/assets/icons/menu.png" alt="Close" class="icon-close" id="close-icon"/>
        </button>
      `,
    );
  }

  const hamburger = document.getElementById("hamburger");
  const navLinks =
    document.getElementById("navLinks") || document.querySelector(".nav-links");
  const navItems = navLinks ? navLinks.querySelectorAll("a") : [];

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    navItems.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }
});
