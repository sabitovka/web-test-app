import User from './userData.js'

// обабатываем окно авторизации
export const handleAutorizeWindow = () => {

  const btnLogin = document.querySelector('.btn-login');

  const inputName = document.querySelector("#user-name");
  const inputGroup = document.querySelector("#user-group");

  // выполяем вход
  const login = (event) => {
    event.preventDefault();
    let name = inputName.value;
    let group = inputGroup.value;
    User.name = name;
    User.group = group;
    // перегружаем страницу
    location.reload();
  }
  
  btnLogin.addEventListener('click', login)
}

export const handleUserWindow = () => {

  (async () => {
    let res = await User.getResultsInfo();
    console.log(res);
    document.querySelector('.us__group span').textContent = User.group;
    document.querySelector('.us__tests-passed span').textContent = res.testsPassed;
    document.querySelector('.us__avg-score span').textContent = res.avgScore;
    document.querySelector('.us__avg-ects span').textContent = res.ectsScore;
    document.querySelector('.us__avg-gov span').textContent = res.govScore;
  })();

  const logOut = () => {
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('group');
    location.reload();
  }

  document.querySelector('.btn-logout').addEventListener('click', logOut);

}