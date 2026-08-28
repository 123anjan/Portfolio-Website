"strict mode";

const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");
const savedTheme = localStorage.getItem("theme") || "light";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Website Loaded");

  // Dark Mode Toggle
  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") {
      themeToggle.textContent = "☀️";
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      let theme = document.documentElement.getAttribute("data-theme");
      if (theme === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙";
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️";
      }
    });
  }
});
