"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".input");

    inputs.forEach((input) => {
        // Ensure inputs work correctly with placeholder attribute checks
        if (!input.hasAttribute("placeholder")) {
            input.setAttribute("placeholder", " ");
        }

        input.addEventListener("focus", () => {
            input.parentNode.classList.add("focus");
        });

        input.addEventListener("blur", () => {
            if (input.value === "") {
                input.parentNode.classList.remove("focus");
            }
        });
    });
});