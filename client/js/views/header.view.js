import { login, logout, user } from '../utils/autorization.js';
import { request, url } from '../utils/http.js';

export function *HeaderView(model) {
  yield `
    ${!model.user?.userid ? _createLoginWindow(model) : _createUserCard(model)}
    <header class="header">
      <div class="header-wrapper container d-flex align-items-center">
        <a href="#" class="logo">
          <img src="img/logo.svg" alt="logo" class="logo-img">
        </a>
        ${
          !model.user?.userid ? 
        ` <button class="btn signin-btn ml-auto d-flex" data-toggle="modal" data-target="#user-login">
            <span class="material-icons mr-1">fingerprint</span>
            Войти
          </button> 
        ` : 
        `<div class="user-container ml-auto col-3">
          <div class="user-head d-flex align-items-center w-100 " data-toggle="modal" data-target="#user-info">
            <span class="material-icons mr-2">
              perm_identity
            </span>
            <span class="user-name text-truncate d-inline-block">${model.user?.name}</span>
            <span class="material-icons ml-auto">
              keyboard_arrow_down
            </span>
          </div>
        </div>`
        }
      </div>
    </header>
  ` 

  $('.btn-login').click((e) => {
    const username = $('#user-name').val();
    const groupid = $('.form-select').val();
    request(url + 'users/login', 'POST', { username, groupid })
      .then(data => {
        login(data.userid, username)
        model.user = _updateUser(model);
      })
      .catch(console.error)
  });
  $('.btn-logout').click((e) => {
    logout();
    model.user = _updateUser(model);
  })

}

const _updateUser = (model) => {
    const { userid, name } = user();
    model.user.userid = userid;
    model.user.name = name;
    return model.user;
  },

// создаем окно входа
_createLoginWindow = (model) => {
  return `
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
                <select class="form-select form-control" aria-label="Выберите группу">
                  ${model.user?.groups?.reduce((prev, cur) => {
                    return prev += `<option value="${cur.group_id}">${cur.name}</option>`
                  }, '')}
                </select>
                
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-primary btn-login" data-dismiss="modal">Войти</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `
},
  
_createUserCard = (model) => {
  return `
    <div class="modal fade" id="user-info" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${model.user?.name}</h5>
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
}