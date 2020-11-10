import getData from './data.js'

const generateQuizesPage = () => {

  const quizes = document.querySelector('.quizes');

  // генерация карточек с тестами
  const generateCard = (data) => {
    quizes.textContent = '';

    let contentHTML = '';

    data.forEach(item => {
      contentHTML += `
        <div class="col s12 m6">
          <div class="card horizontal">
            <div class="card-stacked">
              <div class="card-content">
                <p>${item.title}</p>
              </div>
              <div class="card-action">
                <a href="/quiz.html#${item.id}">Начать тест</a>
              </div>
            </div>
          </div>
        </div>
      `
    })

    quizes.insertAdjacentHTML('afterbegin', contentHTML);
  }

  // если мы назодимя на глвной странице - отображаем список тестов
  if (location.pathname.startsWith('/index') || location.pathname === '/') {
    getData.quizesList(generateCard);
  }

}

export default generateQuizesPage;