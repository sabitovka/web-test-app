import getData from './data.js'
import { getLocalStorage } from './storage.js'
import { getScoreECTS, getScore } from './resultParser.js'

const showTestsTable = (data) => {

  const tableQuiz = document.querySelector('.table-wrapper tbody');

  let rows = '';
  let index = 1;
  data.forEach(item => {
    rows += 
    `<tr>
        <td>${index++}</>
        <td class="text-left">${item.title}</td>
        <td>${item.questions.length}</td>
        <td><a href="./students-result.html#${item.id}">Результаты</a></td>
      </tr>
    `
  });
  
  tableQuiz.insertAdjacentHTML('beforeend', rows);
}

const showResultsTable = (data, id) => {

  const tableRes = document.querySelector('.table-wrapper tbody');
  const testResultSection = document.querySelector('.test-result-section span');

  getData.quiz(id, data => {
    if (data)
      testResultSection.textContent = data.title;
  })

  const res = data.filter(item => item.id === id);
  let rows = '';
  let index = 1;

  res.forEach(item => {
    const rightCount = item.resultMask.filter(item => item === true).length;
    const allCount = item.resultMask.length;
    const score = getScore(rightCount, allCount);
    const scoreECTS = getScoreECTS(score);
  
    rows += 
    `<tr>
      <td>${index++}</td>
      <td class="text-left">${item.name}</td>
      <td>${item.group}</td>
      <td>${rightCount}/${allCount}</td>
      <td>${score}</td>
      <td>${scoreECTS}</td>
      <td><a href="../result.html?name=${item.name}&group=${item.group}&id=${item.id}">Результат</a></td>
    </tr>`
  });

  tableRes.insertAdjacentHTML("beforeend", rows);

}

if (location.pathname.includes('all-tests')) {
  getData.quizesList(showTestsTable);
} else if (location.hash && location.pathname.includes('students-result.html')) {
  const res = getLocalStorage('results');
  showResultsTable(res, location.hash.slice(1));
}
