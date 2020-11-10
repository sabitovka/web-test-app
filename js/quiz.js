import { User } from './autorization.js' 
import getData from './data.js';

const generateQuiz = () => {

  const handleQuiz = ({ id, title, questions }) => {

    const quizTitle = document.querySelector('.quiz-title');
    const nextBtn = document.querySelector('.next-btn');
    const nextBtnLink = document.querySelector('.next-btn');

    let currentQuestion = 0;

    quizTitle.textContent = title;
    renderQuestion(questions[currentQuestion++]);

    const userAnswers = {
      id: id,
      name: User.name,
      group: User.group,
      results: [],
    };

    const saveAnswer = () => {
      const isMulti = questions[currentQuestion-1].type === 'multiChoise';
      let result =  !isMulti ? 0 : [];
      document.forms[0]
        .querySelectorAll(`input${questions[currentQuestion-1].type !== 'text' ? ':checked' : ''}`)
        .forEach(item => {
          if (!isMulti)
            result = item.value;
          else {
            result.push(item.value);
          }
        });
      userAnswers.results.push(result);
      console.log(userAnswers);
    }


    const handleNext = () => {
      if (currentQuestion + 1 >= questions.length) {
        nextBtn.textContent = 'Завершить';
        nextBtn.removeEventListener('click', handleNext);
        // todo сохранить результаты в localstorage
        //nextBtn.addEventListener('click', () => document.location.href = '/result.html');
      }
      
      renderQuestion(questions[currentQuestion++])
    }

    nextBtn.addEventListener('click', saveAnswer);
    nextBtn.addEventListener('click', handleNext);
    
  }

  const renderQuestion = ({ title, img, type, variants }) => {    
    const questionTitle = document.querySelector('.question-title');
    const questionPlaceholder = document.querySelector('.question-placeholder');

    let contentHTML = '';
    let quizInputHTML = '';

    if (type !== 'text') {
      let index = 0;
      variants.forEach(item => {
        quizInputHTML += `
          <li class="collection-item">
            <label>
              <input name="group1" type="${type === 'multiChoise' ? 'checkbox' : 'radio'}" value="${index++}"/>
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
      <form class="question">
        ${img ? `
        <div class="card-panel">
          <img src=${img} alt="" width="100%" height="100%" >
        </div>
        ` : ''}
        <ul class="quiz-input collection ">
          ${quizInputHTML}
        </ul>
      </form>
    `

    
    questionTitle.textContent = title;
    questionPlaceholder.textContent = '';
    questionPlaceholder.insertAdjacentHTML('afterbegin', contentHTML);

  }

  if (location.hash && location.pathname.includes('quiz') && User.isAutorized()) {
    getData.quiz(location.hash.substr(1), handleQuiz);
  }

}

export default generateQuiz;