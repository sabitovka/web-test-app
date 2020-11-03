const generateHeader = () => {
  const headerHTML = `
    <header class="brown lighten-4">
      <div class="header-wrapper container">
        <a href="index.html" class="logo">
          <img src="img/logo.svg" alt="logo" class="logo-img">
        </a>
        <button class="signin-btn btn btn-small brown">
          Войти
        </button>
        <span class="user hide">Карим Сабитов - ПКС-15</span>
      </div>
    </header>
  `

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  checkAutorize();
}

const checkAutorize = () => {
  const autorized = true;
  if (autorized) {
    const signinBtn = document.querySelector('.signin-btn');

    const loginCardHTML = `
      <form class="login-window__form" action=".">
        <div class="login-window__input-item">
          <label for="login-window__input-name">Введите имя</label>
          <input type="text" id="login-window__input-name">
        </div>
        <div class="login-window__input-item">
          <label for="login-window__input-group">Введите группу</label>
          <div>
            <input type="text" id="login-window__input-group inline">
            <button type="submit" class="login-window__btn-submit btn btn-flat waves-effect waves-brown">Войти</button>
          </div>
        </div>
      </form> 
    `

    const loginWindow = document.createElement('div');
    loginWindow.classList.add('login-window', 'card-panel', 'hide');
    loginWindow.innerHTML = loginCardHTML;

    document.body.insertAdjacentElement('beforeend', loginWindow);

    signinBtn.addEventListener('click', () => {
      loginWindow.classList.toggle('hide')
    })

  }
}

export default generateHeader;