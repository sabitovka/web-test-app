import { getScoreECTS, getScore } from '../utils/result-parser.js'

export function *AdminTestResultsView(model) {
  if (!model.quiz_result) {
    console.log();
    yield `
      <div class="container">
        <h3 class="mt-4">Загрузка результатов...</h3>
      </div>
    `
    return
  } 
  yield `
    <main>
      <div class="container">
        <section class="test-result-section mt-5">
          <h5 class="h5 ">Тест: <span class="font-weight-light">${model.quiz_result?.title}</span></h5>
          <h4 class="h4">Результаты тестирования:</h4>
        </section>
        <div class="table-wrapper mt-4 card">
          <table class="table table-striped table-bordered text-center">
            <thead>
              <tr>
                <th>#</th>
                <th class="text-left">Студент</th>
                <th>Группа</th>
                <th>Правильных</th>
                <th>Время</th>
                <th>Балл</th>
                <th>по ECTS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              ${model.quiz_result?.results?.reduce((_, item, index) => {
                const rightCount = item.result_mask
                  .split('').map(el => Boolean(+el))
                  .filter(Boolean).length;
                const allCount = item.result_mask.length;
                const score = getScore(rightCount, allCount);
                const scoreECTS = getScoreECTS(score);
                return `
                  <tr>
                    <td>${index++}</td>
                    <td class="text-left">${item.user.name}</td>
                    <td>${item.user.group_name}</td>
                    <td>${rightCount}/${allCount}</td>
                    <td></td>
                    <td>${score}</td>
                    <td>${scoreECTS}</td>
                    <td><a href="#/result?id=${item.result_id}">Результат</a></td>
                  </tr>
                `}, '')}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  `
}