"stirct mode";

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Hamburger Menu Toggle Functionality
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Close mobile menu when clicking any nav link
    const links = navLinks.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }
});
