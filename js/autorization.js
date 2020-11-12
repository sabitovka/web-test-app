import User from './userData.js'

// обабатываем окно авторизации
export const handleAutorizeWindow = () => {
  const loginWindow = document.querySelector(".login-window");
  const overlay = document.querySelector(".overlay");
  const signinBtn = document.querySelector(".signin-btn");

  const btnLoginButton = document.querySelector(".login-window__btn-submit");
  const inputName = document.querySelector("#login-window__input-name");
  const inputGroup = document.querySelector("#login-window__input-group");

  // показываем окно входа
  const openSignInWindow = () => {
    loginWindow.classList.remove("hide");
    overlay.classList.remove("hide");
  }

  // скрываем окно входа
  const closeSignInWindow = () => {
    loginWindow.classList.add("hide");
    overlay.classList.add("hide");
  }

  // выполяем вход
  const login = (event) => {
    event.preventDefault();
    let name = inputName.value;
    let group = inputGroup.value;
    User.name = name;
    User.group = group;
    closeSignInWindow();
    // перегружаем страницу
    location.reload();
  }

  signinBtn.addEventListener("click", openSignInWindow);
  overlay.addEventListener("click", closeSignInWindow);
  btnLoginButton.addEventListener("click", login);
}

export const handleUserWindow = () => {
  const userProfile = document.querySelector('.user-profile');
  const userName = document.querySelector('.user-name');
  const userContainer = document.querySelector('.user-container');
  const overlay = document.querySelector(".overlay");

  const openUserWindow = () => {
    userProfile.classList.remove('user-profile_hidden');
    userName.classList.add('user-name_hidden');
    overlay.classList.remove("hide");
  }

  const closeUserWindow = () => {
    userProfile.classList.add('user-profile_hidden');
    userName.classList.remove('user-name_hidden');
    overlay.classList.add("hide");
  }

  userContainer.addEventListener('click', openUserWindow);
  overlay.addEventListener('click', closeUserWindow)
}