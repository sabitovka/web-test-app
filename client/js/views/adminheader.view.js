export function *AdminHeaderView() {
  
  yield `
    <header class="header">
      <div class="header-wrapper container d-flex align-items-center">
        <a href="#" class="logo">
          <img src="./img/logo.svg" alt="logo" class="logo-img">
        </a>
        <nav>
          <span><a href="#/admin/panel" class="text-decoration-none text-dark ml-5">Все тесты</a></span>
        </nav>
        <button class="btn btn-logout signin-btn ml-auto d-flex">
          Выйти
        </button> 
      </div>
    </header>
  `;
  $('.btn-logout').click(e => {
    localStorage.removeItem('token');
    location = '#';
  });

}