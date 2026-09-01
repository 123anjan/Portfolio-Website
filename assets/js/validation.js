document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll(".input");
  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const phoneInput = document.getElementById("phoneInput");
  const phoneError = document.getElementById("phoneError");

  function focusFunc() {
    let parent = this.parentNode;
    parent.classList.add("focus");
  }

  function blurFunc() {
    let parent = this.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }

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

  // Handle form submission with 10-digit phone verification
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Stop default form submit

      // Clean input to check digit count only
      const phoneVal = phoneInput.value.trim();
      const phoneDigitsOnly = phoneVal.replace(/\D/g, ""); // strip non-numeric characters

      // Validation rule: Must be exactly 10 digits
      if (phoneDigitsOnly.length !== 10) {
        phoneInput.classList.add("error");
        phoneError.style.display = "block";

        // Optional soft shake effect invocation
        phoneInput.focus();
        return; // Prevent form from submitting successfully
      } else {
        phoneInput.classList.remove("error");
        phoneError.style.display = "none";
      }

      // If validation passes, display success notification
      successMessage.style.display = "block";
      contactForm.reset();

      // Clear input labels
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
