import sendSignupLogin from "./sendSignupLogin.js";

const inputEmail = document.getElementById("email");

const inputPassword = document.getElementById("password");

const buttonSignup = document.getElementById("signup-button");

const buttonLogin = document.getElementById("login-button");

const errorMsg = document.querySelector(".error-msg");

const inputData = {
  email: "",
  password: "",
};

if (buttonSignup) {
  buttonSignup.addEventListener("click", (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;

    if (validateEmail(email) && validatePassword(password)) {
      inputData.email = email;
      inputData.password = password;
      errorMsg.style.display = "";
    } else {
      errorMsg.style.display = "block";
    }
    sendSignupLogin("http://localhost:3000/signup", inputData).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  });
}

if (buttonLogin) {
  buttonLogin.addEventListener("click", (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;

    if (validateEmail(email) && validatePassword(password)) {
      inputData.email = email;
      inputData.password = password;
      errorMsg.style.display = "";
    } else {
      errorMsg.style.display = "block";
    }
    sendSignupLogin("http://localhost:3000/login", inputData).then(
      (res) => {
        console.log(res);
        window.location.replace(
          "https://www.youtube.com/watch?v=_UZhioKe8vg&list=RD_UZhioKe8vg&start_radio=1"
        );
      },
      (err) => {
        console.log(err);
      }
    );
  });
}

function validateEmail(email) {
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailFormat);
}

function validatePassword(password) {
  return password.length >= 6;
}
