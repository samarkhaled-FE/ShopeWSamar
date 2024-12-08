
// *********************Animation-signin-and-sighn-up***************************//
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});
// ********************* Regular Expressions ***************************// 
document.addEventListener("DOMContentLoaded", () => {
  const signInForm = document.querySelector(".sign-in-form");
  const signUpForm = document.querySelector(".sign-up-form");
  const signInButton = signInForm.querySelector("input[type='submit']");
  const signUpButton = signUpForm.querySelector("input[type='submit']");

  const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  function validateField(input, regex, errorMessageElement) {
    const value = input.value.trim();
    if (regex.test(value)) {
      input.classList.add("success");
      input.classList.remove("error");
      errorMessageElement.style.display = "none";
      return true;
    } else {
      input.classList.add("error");
      input.classList.remove("success");
      errorMessageElement.style.display = "block";
      return false;
    }
  }

  function toggleSubmitButton(form, button) {
    const inputs = form.querySelectorAll("input");
    let valid = true;
    inputs.forEach((input) => {
      if (input.classList.contains("error")) {
        valid = false;
      }
    });
    button.disabled = !valid;
  }

  signInForm.querySelector("#UserName").addEventListener("input", function () {
    validateField(this, usernameRegex, document.querySelector("#usermessege"));
  });

  signInForm.querySelector("#email").addEventListener("input", function () {
    validateField(this, emailRegex, document.querySelector("#emailmessege"));
  });

  signInForm.querySelector("#password").addEventListener("input", function () {
    validateField(this, passwordRegex, document.querySelector("#passwordmessege"));
  });

  signUpForm.querySelector("#signupUserName").addEventListener("input", function () {
    validateField(this, usernameRegex, document.querySelector("#signupUserMessage"));
  });

  signUpForm.querySelector("#signupEmail").addEventListener("input", function () {
    validateField(this, emailRegex, document.querySelector("#signupEmailMessage"));
  });

  signUpForm.querySelector("#signupPassword").addEventListener("input", function () {
    validateField(this, passwordRegex, document.querySelector("#signupPasswordMessage"));
  });

  signInForm.addEventListener("input", () => toggleSubmitButton(signInForm, signInButton));
  signUpForm.addEventListener("input", () => toggleSubmitButton(signUpForm, signUpButton));
});
