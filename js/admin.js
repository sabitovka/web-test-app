import getData from './data.js'

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

getData.quizesList(showTestsTable);