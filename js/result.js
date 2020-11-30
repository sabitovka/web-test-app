import User from './userData.js'
import { getScoreECTS, getScore } from './resultParser.js'

const generateResults = () => {
  
  
  const renderResult = (id) => {
    const nameSpan = document.querySelector('.name-span');
    const groupSpan = document.querySelector('.group-span');
    const resSpan = document.querySelector('.res-span');
    const bal = document.querySelector('.bal');
    const spanEcts = document.querySelector('.span-ects');
    const canvas = document.getElementById('result-chart').getContext('2d');
    const header = document.querySelector('h3');
    const resultWrapper = document.querySelector('.result-wrapper');

    if (!User.isAutorized()) {
      resultWrapper.style.display = 'none';
      alert("Выполните вход");
      location.href = "/"
      return;
    }

    const res = User.loadResults(id);

    if (!res) {
      header.textContent = "Не найдено результатов";
      resultWrapper.style.display = 'none';
      return;
    }

    let rightCount = res.resultMask.filter(item => item === true).length;
    let allCount = res.resultMask.length;
    let score = getScore(rightCount, allCount);

    nameSpan.textContent = User.name;
    groupSpan.textContent = User.group;
    resSpan.textContent = `${rightCount}/${allCount}`;
    bal.textContent = score;
    spanEcts.textContent = getScoreECTS(score);

    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Правильных', 'Неправильных'],
        datasets: [{
          label: 'some label?',
          backgroundColor: ['green', 'darkred' ],
          borderColor: 'black',
          data: [rightCount, allCount-rightCount]
        }]
      }
    });

  }
  
  if (location.href.includes('result')) {
    if (User.isAutorized()) {
      const id = location.hash.slice(1);      
      renderResult(id);
    } else {
      location.href = '/';
    }
  }  

}

export default generateResults;