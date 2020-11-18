import { getLocalStorage } from './storage.js'
import { getScoreECTS, getScore } from './resultParser.js'

const generateTable = (data) => {
  const tableRes = document.querySelector('.table-res');

  let rowsHTML = '';

  data.forEach(item => {

    const rightCount = item.resultMask.filter(item => item === true).length;
    const allCount = item.resultMask.length;
    const score = getScore(rightCount, allCount);
    const scoreECTS = getScoreECTS(score);

    rowsHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.group}</td>
        <td>${rightCount}  / ${allCount}</td>
        <td>${score}</td>
        <td>${scoreECTS}</td>
        <td><a href="/admin/results-page.html#idd1">Результаты</a></td>
      </tr>
    `
  });

  tableRes.insertAdjacentHTML('beforeend', rowsHTML);
}

const allres = getLocalStorage('results');
console.log(allres);
generateTable(allres);