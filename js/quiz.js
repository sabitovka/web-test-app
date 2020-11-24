import User from './userData.js' 
import getData from './data.js';

const generateQuiz = () => {

  

  // функция обработки всего теста
  const handleQuiz = ({ id, title, questions }) => {

    // заголовок теста
    const quizTitle = document.querySelector('.quiz-title');
    // кнопка следующего вопроса
    const nextBtn = document.querySelector('.next-btn');

    // индекс текущего вопроса
    let currentQuestion = 0;

    // устанавливаем заголовок теста
    quizTitle.textContent = title;
    // отображаем первый вопрос и инкрементируем его
    renderQuestion(questions[currentQuestion++]);

    // объект для хранения результатов
    const userAnswers = {
      id: id,
      results: [],
    };

    // функция сохранения результата
    const saveAnswer = () => {
      // Флаг теста с множественным выбором. Берем предыдущий вопрос и смотрим его тип
      const isMulti = questions[currentQuestion-1].type === 'multiChoise';
      // если множественный выбор, то в результате должен быть массив
      let result =  !isMulti ? 0 : [];
      document.forms[0]
        // находим все элементы управления
        .querySelectorAll(`input${questions[currentQuestion-1].type !== 'text' ? ':checked' : ''}`)
        // для каждого элемента
        .forEach(item => {
          if (!isMulti) {
            // присваиваем результату
            result = !Number(item.value) ? item.value : Number(item.value); 
          }
          else {
            // пшим в массив
            result.push(Number(item.value));
          }
        });
      // сохраняем в массив результатов в объекте
      userAnswers.results.push(result);
    }

    // проверяем ответы
    const checkAnswers = () => {
      // индекс текущего элемента
      let curr = 0;
      // делаем новый массив - маску ответов. Пример: [true, true, false, true]
      return questions.map(item => {
        switch(item.type) {
          case 'text':
            return item.right.toLowerCase() === userAnswers.results[curr++].toLowerCase();
          case 'singleChoise': 
            return item.right === userAnswers.results[curr++];
          case 'multiChoise':
            curr++;
            return item.right.every(item => userAnswers.results[curr-1].includes(item));
        }
      });
    }

    // обрабатываем нажатие на следующий вопрос
    const handleNext = () => {
      // если следующий вопрос последний
      if (currentQuestion + 1 >= questions.length) {
        nextBtn.textContent = 'Завершить';
        nextBtn.removeEventListener('click', handleNext);
        // удаляем старый слушатель и делаем новый
        nextBtn.addEventListener('click', () => { 
          //заполняем маску результатов
          userAnswers.resultMask = checkAnswers();
          // сохраняем результаты в localStorage
          User.result = userAnswers;
          // перенаправляем на страницу результатов
          document.location.href = 
            `/result.html#${id}` 
        });
      }
      
      // отображаем следующий вопрос
      renderQuestion(questions[currentQuestion++])
    }

    nextBtn.addEventListener('click', saveAnswer);
    nextBtn.addEventListener('click', handleNext);
    
  }

  // простое отображение вопроса
  const renderQuestion = ({ title, img, type, variants }) => {    
    // заголовок вопроса
    const questionTitle = document.querySelector('.question-title');
    // место для вопроса
    const questionPlaceholder = document.querySelector('.question-placeholder');

    let contentHTML = '';
    let quizInputHTML = '';

    // если вопрос не с текстовым полем, то итерируем варианты ответов и делаем инпуты
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

  // если есть хэш, путь включает quiz b пользователь авторизован - отображаем тест
  if (location.hash && location.pathname.includes('quiz'))

    if(User.isAutorized()) 
      getData.quiz(location.hash.substr(1), handleQuiz);
    else {
      alert("Вы должны выполнить вход");
      location.href = "/"; // TODO с action=login
    }

}

export default generateQuiz;