import { isAutorized } from './autorization.js' 
import getData from './data.js';

const generateQuiz = () => {


  const handleQuiz = ({ title, questions }) => {

    const quizTitle = document.querySelector('.quiz-title');
    const nextBtn = document.querySelector('.next-btn');

    let currentQuestion = 0;

    quizTitle.textContent = title;
    renderQuestion(questions[1]);

    nextBtn.addEventListener('click', () => renderQuestion(questions[currentQuestion++]))
  }

  const renderQuestion = ({ title, img, type, variants }) => {    
    const questionTitle = document.querySelector('.question-title');
    const questionPlaceholder = document.querySelector('.question-placeholder');

    let contentHTML = '';
    let quizInputHTML = '';

    if (type !== 'text') {
      variants.forEach(item => {
        quizInputHTML += `
          <li class="collection-item">
            <label>
              <input name="group1" type="${type === 'multiChoise' ? 'checkbox' : 'radio'}"/>
              <span>${item}</span>
            </label>
          </li>
        `
      });
    } else {
      quizInputHTML = `
          <li class="collection-item">
            <label>
                <span>Введите ответ</span>
                <input name="group1" type="text" />              
            </label>
          </li>
        `
    }

    contentHTML = `
      <div class="question">
        ${img ? `
        <div class="card-panel">
          <img src=${img} alt="" width="100%" height="100%" >
        </div>
        ` : ''}
        <ul class="quiz-input collection ">
          ${quizInputHTML}
        </ul>
      </div>
    `

    
    questionTitle.textContent = title;
    questionPlaceholder.textContent = '';
    questionPlaceholder.insertAdjacentHTML('afterbegin', contentHTML);

  }

  if (location.hash && location.pathname.includes('quiz') && isAutorized()) {
    getData.quiz(location.hash.substr(1), handleQuiz);
  }

}

export default generateQuiz;