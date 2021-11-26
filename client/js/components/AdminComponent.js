import { request, url } from "../utils/http.js";
import md5 from "../utils/md5.js";

export const AdminComponent = () => {
  return {
    name: 'admin_login',
    model: {
      loading: true,
    },
    *view(model) {
      yield `
        <div class="container">
          <form class="form-signin col-md-4 mx-auto text-center mt-5">
            <h1 class="h3 mb-5 font-weight-normal">Введите данные администратора</h1>
            <label for="inputPassword" class="sr-only">Пароль</label>
            <input type="password" id="inputPassword" class="form-control mt-3" placeholder="Пароль" required="">
            <button class="btn btn-lg btn-primary btn-block mt-4 btn-admin-login" type="submit">Войти</button>
            <p class="mt-5 mb-3 text-muted">© ${new Date().getFullYear()}</p>
          </form>
        </div>
      `;
      $('.form-signin').submit((e) => {
        e.preventDefault();
        console.log(e, $('#inputPassword').val());
        request(url + 'admin/login', 'POST', {password: md5($('#inputPassword').val())})
          .then(console.log)
          .catch(console.error);
      })
    },
    async controller(model, params) {

    }
  }
}