import { request, url } from '../utils/http.js';

export const TestView = {
  Header(model) {
    return `
      <header class="test-header d-flex justify-content-between align-items-center">
        <div class="questions-count">
          <span>${model.question.index}</span>/<span>${model.question.count ? model.question.count : ""}</span> 
        </div>
        <div id="timer" class="timer${model.question.limit ? '' : ' d-none'}">
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
              'checkbox' : 'radio'}" name="radio" value="${cur.id}">
            <label for="radio-${cur.id}">${cur.title}</label>
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
    this.model = model
    $('.next-button').click(this._handleNextQuestion());

    const deadline = model.question.remains ??= (new Date(Date.parse(new Date()) + model.question.limit * 60 * 1000));
    this._initializeTimer('timer', deadline)
  },

  _handleNextQuestion() {
    return (e) => {
      const value = document.forms[0].querySelectorAll('input:checked')[0]?.value ?? 0
      this.model.question.answers.push(Number(value));
      this.model.question.currentQuestion = this.model.question.questions[this.model.question.index];
      this.model.question.index++;
      this.model.question = this.model.question;
      if (this.model.question.index > this.model.question.count) {
        const result = {
          userid: this.model.user.userid,
          quizid: this.model.question.quiz_id,
          answers: this.model.question.answers,
          start_time: this.model.question.start_time.getTime(),
          end_time: new Date().getTime(),
          debug: true
        };        
        request(url+'results', 'POST', result)
          .then(data => {
            console.log(data);
            document.location = `#/result?id=${data.resultid}`;
          })
          .catch(console.error);
      }
    }
  },

  _getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    return {
      'total': t,
      'minutes': minutes,
      'seconds': seconds
    };
  },

  _initializeTimer(id, deadline) {
    const minutesSpan = $('#'+id+' span:first-child');
    const secondsSpan = $('#'+id+' span:last-child');
    const updateClock = () => {
      const t = this._getTimeRemaining(deadline);

      minutesSpan.html(('0' + t.minutes).slice(-2));
      secondsSpan.html(('0' + t.seconds).slice(-2));
      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }
    updateClock();
    var timeinterval = setInterval(updateClock, 500);
  }

}