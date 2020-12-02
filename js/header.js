import { handleAutorizeWindow, handleUserWindow } from './autorization.js';
import User from './userData.js';

// создаем header
const generateHeader = () => {

  const headerHTML = `
    <header class="header">
      <div class="header-wrapper container d-flex align-items-center">
        <a href="index.html" class="logo">
          <img src="img/logo.svg" alt="logo" class="logo-img">
        </a>
        ${
          !User.isAutorized() ? 
        `<button class="btn signin-btn ml-auto d-flex" data-toggle="modal" data-target="#user-login">
            <span class="material-icons mr-1">fingerprint</span>
            Войти
          </button> 
        ` : 
        `<div class="user-container ml-auto col-3">
          <div class="user-head d-flex align-items-center w-100 " data-toggle="modal" data-target="#user-info">
            <span class="material-icons mr-2">
              perm_identity
            </span>
            <span class="user-name text-truncate d-inline-block">${User.name}</span>
            <span class="material-icons ml-auto">
              keyboard_arrow_down
            </span>
          </div>
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
    <div class="modal fade" id="user-login" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Авторизуйтесь для прохождения</h5>
          </div>
          <div class="modal-body">
            <form name="user-login">
              <div class="form-group">
                <label for="user-name">Фамилия, Имя</label>
                <input type="text" class="form-control" id="user-name">
              </div>
              <div class="form-group">
                <label for="user-group">Группа</label>
                <input type="text" class="form-control" id="user-group">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-login" data-dismiss="modal">Войти</button>
          </div>
        </div>
      </div>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', loginCardHTML);
}

const createUserCard = () => {
  const cardHTML = `
    <div class="modal fade" id="user-info" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${User.name}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="user-details1 ">
              <p class="us__group">Группа: <span></span></p>
              <p class="us__tests-passed">Пройдено тестов: <span></span></p>
              <p class="us__avg-score">Средний бал: <span></span></p>
              <p class="us__avg-ects">По ECTS: <span></span></p>
              <p class="us__avg-gov">По гос.шкале: <span></span></p>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-logout" data-dismiss="modal">Выйти</button>
          </div>
        </div>
      </div>
    </div>
  `

  document.body.insertAdjacentHTML('beforeend', cardHTML);
}

export default generateHeader;