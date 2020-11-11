import User from './userData.js'

const generateResults = () => {
  
  
  const renderResult = (id) => {
    const nameSpan = document.querySelector('.name-span');
    const groupSpan = document.querySelector('.group-span');
    const resSpan = document.querySelector('.res-span');
    const bal = document.querySelector('.bal');
    const spanEcts = document.querySelector('.span-ects');

    const res = User.loadResults(id);

    nameSpan.textContent = User.name;
    groupSpan.textContent = User.group;
    resSpan.textContent = res.resultMask.length;
    bal.textContent = 45;
    spanEcts.textContent = 2344;

  }
  
  if (location.href.includes('result')) {
    const id = location.hash.slice(1);      

    renderResult(id);
  }  

}

export default generateResults;