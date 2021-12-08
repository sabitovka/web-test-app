import { request, url } from "../utils/http.js";
import md5 from "../utils/md5.js";

export const AdminLoginComponent = () => {
  return {
    name: 'admin_login',
    model: {
      loading: true,
    },
    *view(model) {
      const token = localStorage.getItem("token");
      if (token) {
        document.location = '#/admin/panel';
        return;
      }
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
        request(url + 'admin/login', 'POST', {password: md5($('#inputPassword').val())})
          .then(({ token }) => {
            localStorage.setItem('token', token);
            document.location = '#/admin/panel';
          })
          .catch(console.error);
      })
    },
    async controller(model, params) {

    }
  }
}