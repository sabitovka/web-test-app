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
        `<div class="user-container">
          <img src="./img/user.svg" alt="user" width="30" height="30">
          <span class="user-name">${User.name}</span>
        </div>`
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
    createUserCard();
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

const createUserCard = () => {
  const cardHTML = `
    <div class="user-profile card user-profile_hidden">
      <div class="user-profile__name center">Карим Сабитов</div>
      <div class="user-profile__group center">ПКС-15</div>
      <div class="user-profile__test-passed">Пройдено тестов: <span class="user-profile__test-passed-span">6</span></div>
      <div class="user-profile__avg-score">Средний бал: <span class="user-profile__avg-score-span">6</span></div>
      <div class="user-profile__avg-score-ects">По ECTS: <span class="user-profile__avg-score-ects-span">A</span></div>
      <div class="user-profile__avg-score-gov">По гос. шкале: <span class="user-profile__avg-score-gov-span">хорошо</span></div>
      <div class="divider"></div>
      <button class="user-profile__btn-exit btn brown right btn-small">Выйти</button>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', cardHTML);
}

export default generateHeader;