"strict mode";

const themeToggle = document.getElementById("themeToggle");
const currentTheme = localStorage.getItem("theme");
const savedTheme = localStorage.getItem("theme") || "light";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Website Loaded");

  // Dark Mode Toggle
  /* --- Theme Toggle Functionality --- */
const toggleSwitch = document.querySelector('.theme-switch-wrapper input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

if (toggleSwitch) {
    toggleSwitch.addEventListener('change', switchTheme, false);
}
});
