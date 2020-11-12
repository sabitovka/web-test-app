import { getLocalStorage } from './storage.js'

const generateTable = (data) => {
  const tableRes = document.querySelector('.table-res');

  let rowsHTML = '';

  data.forEach(item => {
    rowsHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.group}</td>
        <td>${item.resultMask.filter(item => item === true).length}</td>
        <td>1</td>
        <td>2</td>
        <td><a href="/admin/results-page.html#idd1">Результаты</a></td>
      </tr>
    `
  });

  tableRes.insertAdjacentHTML('beforeend', rowsHTML);
}

const allres = getLocalStorage('results');
console.log(allres);
generateTable(allres);