import { request, url } from '../utils/http.js';

export function *TestView (model) {
  if (model.loading) return ''
  yield `
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
  const deadline = model.question.remains ??= (new Date(Date.parse(new Date()) + model.question.limit * 60 * 1000));
  _initializeTimer('timer', deadline)

  yield `
      <main>
        <div class="container">
          <div class="question-wrapper">
            <div class="question">
              <h2 class="question-legend col-10 mx-auto">${model.question.currentQuestion?.title}</h2>
              <div class="col-8 mx-auto">
                <form action="#">
                  ${_QuestionsView(model)}
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

  $('.next-button').click(_handleNextQuestion(model));

}

const _QuestionsView = (model) => {
  return model.question.currentQuestion
    ?.variants
    ?.reduce((prev, cur, index) => 
      prev += `
        <div class="answer">
          <input id="radio-${cur.id}" type="${model.question.quest_type === 'multiChoise' ? 
            'checkbox' : 'radio'}" name="radio" value="${cur.id}">
          <label for="radio-${cur.id}">${cur.title}</label>
        </div>
      `, '');
}

const _handleNextQuestion = (model) => {
  return (e) => {
    const value = document.forms[0].querySelectorAll('input:checked')[0]?.value ?? 0
    model.question.answers.push(Number(value));
    model.question.currentQuestion = model.question.questions[model.question.index];
    model.question.index++;
    model.question = model.question;
    if (model.question.index > model.question.count) {
      const result = {
        userid: model.user.userid,
        quizid: model.question.quiz_id,
        answers: model.question.answers,
        start_time: model.question.start_time.getTime(),
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
}

const _getTimeRemaining = (endtime) => {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}

const _initializeTimer = (id, deadline) => {
  const minutesSpan = $('#'+id+' span:first-child');
  const secondsSpan = $('#'+id+' span:last-child');
  const updateClock = () => {
    const t = _getTimeRemaining(deadline);

    minutesSpan.html(('0' + t.minutes).slice(-2));
    secondsSpan.html(('0' + t.seconds).slice(-2));
    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }
  updateClock();
  var timeinterval = setInterval(updateClock, 500);
}