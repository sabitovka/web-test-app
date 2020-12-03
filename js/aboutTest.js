import User from './userData.js'
import getData from './data.js'

const generateAboutPage = () => {

  const loadAbout = (data) => {

    const greeting = document.querySelector('.greeting');
    const testName = document.querySelector('.test-name');
    const startTestLink = document.querySelector('.start-test-link');
    const aboutTest = document.querySelector('.about-test');

    if (User.isAutorized()) {
      console.log(greeting);
      greeting.classList.remove('d-none');
      greeting.querySelector('span').textContent = User.name;
      startTestLink.setAttribute('href', `/test.html#${data.id}`)
    } else {
      startTestLink.setAttribute('data-toggle', 'modal');
      startTestLink.setAttribute('data-target', '#user-login');
    }

    testName.textContent = data.title;
    aboutTest.innerHTML = data.description;
    
  }


  if (location.pathname.startsWith('/Web-Test-App/about-test') || location.pathname.startsWith('/about-test')) {
    getData.quiz(location.hash.substr(1), loadAbout);
  }

}

export default generateAboutPage;