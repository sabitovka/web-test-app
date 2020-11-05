import cookieParser from './cookie.js'

export const isAutorized = () => cookieParser.getCookie('name') &&
  cookieParser.getCookie('group');

export const handleAutorizeWindow = () => {
  const loginWindow = document.querySelector(".login-window");
  const overlay = document.querySelector(".overlay");
  const signinBtn = document.querySelector(".signin-btn");

  const btnLoginButton = document.querySelector(".login-window__btn-submit");
  const inputName = document.querySelector("#login-window__input-name");
  const inputGroup = document.querySelector("#login-window__input-group");

  const openSignInWindow = () => {
    loginWindow.classList.remove("hide");
    overlay.classList.remove("hide");
  }

  const closeSignInWindow = () => {
    loginWindow.classList.add("hide");
    overlay.classList.add("hide");
  }

  const login = (event) => {
    event.preventDefault();
    let name = inputName.value;
    let group = inputGroup.value;
    cookieParser.setCookie("name", name);
    cookieParser.setCookie("group", group);
    console.log(name, group);
    closeSignInWindow();
    location.reload();
  }

  signinBtn.addEventListener("click", openSignInWindow);
  overlay.addEventListener("click", closeSignInWindow);
  btnLoginButton.addEventListener("click", login);
}

export const handleUserWindow = () => {
  const userName = cookieParser.getCookie('name');
  const group = cookieParser.getCookie('group');

  const userSpan = document.querySelector('.user');
  userSpan.textContent = userName + ' - ' + group;
}