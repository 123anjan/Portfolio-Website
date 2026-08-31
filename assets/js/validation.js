document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".input");
    const contactForm = document.getElementById("contactForm");
    const successMessage = document.getElementById("successMessage");

    inputs.forEach((input) => {
        input.addEventListener("focus", () => {
            input.parentNode.classList.add("focus");
        });

        input.addEventListener("blur", () => {
            if (input.value === "") {
                input.parentNode.classList.remove("focus");
            }
        });
    });

    // Handle form submission and success message display
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page reload

            // Show success message
            successMessage.style.display = "block";

            // Reset the form fields
            contactForm.reset();

            // Reset input container focus states
            inputs.forEach((input) => {
                input.parentNode.classList.remove("focus");
            });

            // Hide success message automatically after 5 seconds
            setTimeout(() => {
                successMessage.style.display = "none";
            }, 5000);
        });
    }
});