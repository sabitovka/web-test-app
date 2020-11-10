import { handleAutorizeWindow, handleUserWindow } from './autorization.js';
import User from './userData.js';

// создаем header
const generateHeader = () => {
  const headerHTML = `
    <header class="brown lighten-4">
      <div class="header-wrapper container">
        <a href="index.html" class="logo">
          <img src="img/logo.svg" alt="logo" class="logo-img">
        </a>
        ${
          !User.isAutorized() ? 
        `<button class="signin-btn btn btn-small brown">
          Войти
        </button>` :
        `<span class="user"></span>`
        }
      </div>
    </header>
  `

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  // если пользователь не авторизован - создать окно входа
  if (!User.isAutorized()) {
    createLoginWindow();
    handleAutorizeWindow();
  } else {
    // иначе сделать его карточку
    handleUserWindow();
  }
}

// создаем окно входа
const createLoginWindow = () => {
  const loginCardHTML = `
  <div class="login-window card-panel hide">
    <form class="login-window__form" action="/">
      <div class="login-window__input-item">
        <label for="login-window__input-name">Введите имя</label>
        <input type="text" id="login-window__input-name">
      </div>
      <div class="login-window__input-item">
        <label for="login-window__input-group">Введите группу</label>
        <div>
          <input type="text" id="login-window__input-group" class="inline">
          <button type="submit" class="login-window__btn-submit btn btn-flat waves-effect waves-brown">Войти</button>
        </div>
      </div>
    </form> 
  </div>
  <div class="overlay hide"/>
  `

  document.body.insertAdjacentHTML('beforeend', loginCardHTML);
}

export default generateHeader;