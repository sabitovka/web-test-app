import { getScore, getScoreECTS } from "../utils/result-parser.js";

export const ResultView = {
  View(model) {
    this.model = model;
    return `
    <main>
      <section class="section-top dark">
        <div class="container h-100">
          <a class="btn btn-return" href="#">
            <img src="./img/arrow.svg" alt="">
            <span>Назад</span>
          </a>
          <div class="test-title col-10 text-center mx-auto">
            Не найдено результатов :(
          </div>
        </div>
      </section>
      <div class="container">
        <section class="result d-none row">
          <article class="result-article col-7">
            <h4>Ваши результаты:</h4>
            <p class="about-result">Вы правильно ответили на <b></b> вопросов.</p>
            <p class="score-result">Вы <span></span> сдали тест, набрав <b></b> баллов. Ваша оценка по системе ECTS: <b></b> </p>
            <div class="result-link">
              Ваша постоянная сылка результата:
              <div class="d-flex align-items-center justify-content-between">
                <input type="text">
                <a href="./"></a>
                <button class="btn ml-auto">Копировать</button>
              </div>
            </div>
          </article>
          <div class="chart-wrapper col-4 mx-auto">
            <canvas id="chart"></canvas> 
            <!-- <img src="./img/chart.jpg" alt="chart"> -->
            <a class="btn-try-again ml-auto mt-5 d-none">
              <span class="material-icons mr-1">
                autorenew
              </span>
              Пройти тест еще раз
            </a>
          </div>
        </section> 
      </div>
      </div>
    </main>
    `
  },
  Script() {
    if (this.model.loading) return
    let rightCount = this.model.result?.result_mask?.split('')?.map(Number)?.filter(Boolean)?.length;
    let allCount = this.model.result.result_mask.length;
    let score = getScore(rightCount, allCount);

    $('.test-title').text(this.model.result.quiz.title)
    $('.score-result :first-child').text(score <= 59 ? 'не' : '')
    $('.score-result :nth-child(2)').text(score)
    $('.score-result :last-child').text(getScoreECTS(score))
    $('.about-result b').text(`${rightCount} из ${allCount}`)
    $('.result').removeClass('d-none')
    $('.result-link a').attr('href', location.href).text(location.href)
    $('.result-link input').val(location.href)
    $('.result-link button').click(() => {
      $('.result-link input').select();
      document.execCommand("copy");
    })
    $('.btn-try-again').attr(this.model.result.quiz.title)

    const canvas = $('#chart')[0].getContext('2d')
    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Правильных', 'Неправильных'],
        datasets: [{
          label: 'Результаты теста',
          backgroundColor: ['green', 'darkred' ],
          borderColor: 'black',
          data: [rightCount, allCount-rightCount]
        }]
      }
    })
  }
}