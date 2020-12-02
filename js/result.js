import { getScoreECTS, getScore, loadResults } from './resultParser.js'

const generateResults = () => {
  
  
  const renderResult = (name, group, id) => {
    const testTitle = document.querySelector('.test-title');
    const scoreSpan = document.querySelector('.score-result :first-child')
    const scoreElem = document.querySelector('.score-result :nth-child(2)');
    const ects = document.querySelector('.score-result :last-child');
    const resSpan = document.querySelector('.about-result b');
    const resultWrapper = document.querySelector('.result');
    const canvas = document.getElementById('chart').getContext('2d');
    const resultLink = document.querySelector('.result-link a');
    const resultLinkButton = document.querySelector('.result-link button');
    const resultLinkInput = document.querySelector('.result-link input');
    const btnTryAgain = document.querySelector('.btn-try-again');

    const res = loadResults(name, group, id);

    if (!res) {
      testTitle.textContent = "Не найдено результатов :(";
      resultWrapper.style.display = 'none';
      return;
    }

    let rightCount = res.resultMask.filter(item => item === true).length;
    let allCount = res.resultMask.length;
    let score = getScore(rightCount, allCount);

    scoreSpan.textContent =  score <= 59 ? 'не' : '';
    resSpan.textContent = `${rightCount} из ${allCount}`;
    scoreElem.textContent = score;
    ects.textContent = getScoreECTS(score);

    resultLink.setAttribute('href', location.href);
    resultLink.textContent = location.href;
    resultLinkInput.value = location.href;

    resultLinkButton.addEventListener('click', () => {
      resultLinkInput.select();
      document.execCommand("copy");
    })
    btnTryAgain.setAttribute('href', `/test.html#${id}`)
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
    });

  }
  
  if (location.search && location.pathname.startsWith('/result')) {
    const search = decodeURI(location.search).slice(1).split('&');
    const name = search[0].split('=')[1];
    const group = search[1].split('=')[1];
    const id = search[2].split('=')[1];
    console.log(search, name, group, id);
    renderResult(name, group, id);
  } 

}

export default generateResults;