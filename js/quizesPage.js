import getData from './data.js'

const generateQuizesPage = () => {

  const testsWrapper = document.querySelector('.tests-wrapper');

  // генерация карточек с тестами
  const generateCard = (data) => {
    testsWrapper.textContent = '';

    let contentHTML = '';

    data.forEach(item => {
      contentHTML += `
        <div class="col mb-4">
          <div class="card h-100">
            <div class="card-body">
              <div class="card-text text-truncate">
                ${item.title}
              </div>
            </div>
            <div class="card-footer d-flex align-items-center justify-content-between">
              <a href="about-test.html#${item.id}">НАЧАТЬ ТЕСТ</a>
              <small>Вопросов: <span>${item.questions.length}</span></small>
            </div>
            <!-- .card-footer -->
          </div>
          <!-- .card -->
        </div>
        <!-- .col -->
      `
    })

    testsWrapper.insertAdjacentHTML('afterbegin', contentHTML);
  }

  // если мы назодимя на глвной странице - отображаем список тестов
  if (location.pathname.startsWith('/Web-Test-App/index') || location.pathname === '/Web-Test-App/' 
  || location.pathname.startsWith('/index') || location.pathname === '/') {
    getData.quizesList(generateCard);
  }

}

export default generateQuizesPage;