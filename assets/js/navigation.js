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
/* --- Universal Theme Toggle Injector & Functionality --- */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Apply saved theme immediately on page load
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    // 2. Inject toggle switch into navbar if it doesn't already exist on the page
    let switchWrapper = document.querySelector('.theme-switch-wrapper');
    if (!switchWrapper) {
        const navLinks = document.querySelector('.nav-links') || document.querySelector('.navbar');
        if (navLinks) {
            switchWrapper = document.createElement('div');
            switchWrapper.className = 'theme-switch-wrapper';
            switchWrapper.innerHTML = `
                <label class="theme-switch" for="dark-mode-checkbox">
                    <input type="checkbox" id="dark-mode-checkbox" ${currentTheme === 'dark' ? 'checked' : ''} />
                    <div class="slider"></div>
                </label>
                <span class="theme-label">Dark Mode</span>
            `;
            navLinks.appendChild(switchWrapper);
        }
    }

    // 3. Handle change events and state persistence
    const toggleSwitch = document.querySelector('#dark-mode-checkbox');
    if (toggleSwitch) {
        toggleSwitch.checked = (currentTheme === 'dark');
        
        toggleSwitch.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
    }
});