import getData from './data.js'

const showTestsTable = (data) => {

  const tableQuiz = document.querySelector('.table-quiz');

  let rows = '';
  data.forEach(item => {
    rows += 
    `<tr>
        <td>${item.title}</td>
        <td>${item.questions.length}</td>
        <td><a href="/allresults.html#${item.id}">Результаты</a></td>
      </tr>
    `
  });
  
  tableQuiz.insertAdjacentHTML('beforeend', rows);
}

getData.quizesList(showTestsTable);

