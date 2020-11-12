import { getLocalStorage } from './storage.js'

const getScoreECTS = (value) => {
  if (value <= 34) {
    return 'F';
  } else if (value <= 59) {
    return 'FX'
  } else if (value <= 69) {
    return 'E'
  } else if (value <= 74) {
    return 'D'
  } else if (value <= 79) {
    return 'C'
  } else if (value <= 89) {
    return 'B'
  } else if (value <= 100) {
    return 'A'
  }
}

const generateTable = (data) => {
  const tableRes = document.querySelector('.table-res');

  let rowsHTML = '';

  data.forEach(item => {

    const rightCount = item.resultMask.filter(item => item === true).length;
    const allCount = item.resultMask.length;
    const score = rightCount / allCount * 100;
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