export const TestView = {
  Header(model) {
    return `
      <header class="test-header d-flex justify-content-between align-items-center">
        <div class="questions-count">
          <span>${model.question.index}</span>/<span>${model.question.count ? model.question.count : ""}</span> 
        </div>
        <div class="timer${model.question.limit ? '' : ' d-none'}">
          <span>00</span>:<span>00</span>
        </div>
        <a href="#" class="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </a>
      </header>
    `
  },

  _QuestionsView(model) {
    return model.question
      .currentQuestion
      ?.variants
      ?.reduce((prev, cur, index) => 
        prev += `
          <div class="answer">
            <input id="radio-${cur.id}" type="${model.question.quest_type === 'multiChoise' ? 
              'checkbox' : 'radio'}" name="radio" value="${index}">
            <label for="radio-${index++}">${cur.title}</label>
          </div>
        `, '');
  },

  View(model) {
    return `
      <main>
        <div class="container">
          <div class="question-wrapper">
            <div class="question">
              <h2 class="question-legend col-10 mx-auto">${model.question.currentQuestion?.title}</h2>
              <div class="col-8 mx-auto">
                <form action="#">
                  ${this._QuestionsView(model)}
                </form>
                <button type="button" class="next-button d-inline-flex">
                  <img src="./img/arrow.svg" alt="next">
                </button>
                </div>
              </div>
          </div>
        </div>
      </main>
      `
  },

  Scripts(model) {
    const nextBtn = document.querySelector('.next-button');
    nextBtn.addEventListener('click', (e) => {
      console.log(1);
      if (model.question.index+1 >= model.question.count) {
        nextBtn.addEventListener('click', () => {
          //заполняем маску результатов
          //userAnswers.resultMask = checkAnswers();
          // сохраняем результаты в localStorage
          //User.result = userAnswers;
          // перенаправляем на страницу результатов
          console.log(1);
        });
      }
      model.question = {
        ...model.question,
        currentQuestion: model.question.questions[model.question.index+1],
        index: model.question.index + 1,
      };
    });
  },


}