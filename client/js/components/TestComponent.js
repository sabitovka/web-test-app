import { user } from "../utils/autorization.js";
import { url, request } from "../utils/http.js";
import { TestView } from "../views/test.view.js";

export const Test = () => {
  return {
    name: 'test',
    model: {
      question: {},
      user: {},
      loading: true
    },
    *view(model) {
      document.title = 'Foo.bar | Тест';
      yield TestView.Header(model);
      yield TestView.View(model);
      TestView.Scripts(model);
    },
    async controller(model, params) {
      try {
        const questions = await request(url + `quizes/${params.id}/test`);
        const quiz = await request(url + `quizes/${params.id}`);

        model.question = {
          currentQuestion: questions[0],
          questions: questions,
          limit: quiz.time_limit,
          count: questions.length,
          index: 1,
          answers: [],
          start_time: new Date(),
          quiz_id: params.id
        }

        model.user = {
          ...user(),
        }
      } catch(e) {
        console.error(e);
      } finally {
        model.loading = false
      }
      
      

    //   quiz.questions = questions;
    //   console.log(quiz);

    //   // функция обработки всего теста
    //   const handleQuiz = ({id, title, questions }) => {
    //     // кнопка следующего вопроса
    //     const nextBtn = document.querySelector('.next-button');
    //     const allquestionsCount = document.querySelector('.questions-count :last-child')
    //     // индекс текущего вопроса
    //     let currentQuestion = 0;
    //     allquestionsCount.textContent = questions.length;
    //     // отображаем первый вопрос и инкрементируем его
    //     renderQuestion(questions[currentQuestion++], currentQuestion);
    //     // объект для хранения результатов
    //     const userAnswers = {
    //       id: id,
    //       title,
    //       results: [],
    //     };

    //     // функция сохранения результата
    //     const saveAnswer = () => {
    //       // Флаг теста с множественным выбором. Берем предыдущий вопрос и смотрим его тип
    //       const isMulti = questions[currentQuestion - 1].type === 'multiChoise';
    //       // если множественный выбор, то в результате должен быть массив
    //       let result = !isMulti ? 0 : [];
    //       document.forms[0]
    //         // находим все элементы управления
    //         .querySelectorAll(`input${questions[currentQuestion-1].type !== 'text' ? ':checked' : ''}`)
    //         // для каждого элемента
    //         .forEach(item => {
    //           if (!isMulti) {
    //             // присваиваем результату
    //             result = !Number(item.value) ? item.value : Number(item.value);
    //           } else {
    //             // пшим в массив
    //             result.push(Number(item.value));
    //           }
    //         });
    //       // сохраняем в массив результатов в объекте
    //       userAnswers.results.push(result);
    //     }

    //     // проверяем ответы
    //     const checkAnswers = () => {
    //       // индекс текущего элемента
    //       let curr = 0;
    //       // делаем новый массив - маску ответов. Пример: [true, true, false, true]
    //       return questions.map(item => {
    //         switch (item.type) {
    //           /* case 'text':
    //             return item.right.toLowerCase() === userAnswers.results[curr++].toLowerCase(); */
    //           case 'singleChoise':
    //             return item.right === userAnswers.results[curr++];
    //           case 'multiChoise':
    //             curr++;
    //             return item.right.every(item => userAnswers.results[curr - 1].includes(item));
    //         }
    //       });
    //     }

    //     // обрабатываем нажатие на следующий вопрос
    //     const handleNext = () => {
    //       // если следующий вопрос последний
    //       if (currentQuestion + 1 >= questions.length) {
    //         // nextBtn.textContent = 'Завершить';
    //         //nextBtn.removeEventListener('click', handleNext);
    //         // удаляем старый слушатель и делаем новый
    //         nextBtn.addEventListener('click', () => {
    //           //заполняем маску результатов
    //           userAnswers.resultMask = checkAnswers();
    //           // сохраняем результаты в localStorage
    //           User.result = userAnswers;
    //           // перенаправляем на страницу результатов
    //           document.location.href =
    //             `./result.html?name=${User.name}&group=${User.group}&id=${id}`
    //         });

    //       }
    //       // отображаем следующий вопрос
    //       renderQuestion(questions[currentQuestion++], currentQuestion);
    //     }

    //     nextBtn.addEventListener('click', saveAnswer);
    //     nextBtn.addEventListener('click', handleNext);

    //   }

    //   // простое отображение вопроса
    //   const renderQuestion = ({ title, img, type, variants
    //   }, questionIndex) => {
    //     // заголовок вопроса
    //     const questionTitle = document.querySelector('.question-legend');
    //     // место для вопроса
    //     const questionPlaceholder = document.forms[0];
    //     document.querySelector('.questions-count :first-child').textContent = questionIndex;

    //     let contentHTML = '';

    //     // если вопрос не с текстовым полем, то итерируем варианты ответов и делаем инпуты
    //     if (type !== 'text') {
    //       let index = 0;
    //       variants.forEach(item => {
    //         contentHTML += `
    //           <div class="answer">
    //             <input id="radio-${index}" type="${type === 'multiChoise' ? 'checkbox' : 'radio'}" name="radio" value="${index}">
    //             <label for="radio-${index++}">${item}</label>
    //           </div>
    //         `
    //       });
    //     }

    //     questionTitle.textContent = title;
    //     questionPlaceholder.textContent = '';
    //     questionPlaceholder.insertAdjacentHTML('afterbegin', contentHTML);
    //     questionPlaceholder.querySelector('input').click()

    //   }

    //   handleQuiz(quiz)

    }
  }
}