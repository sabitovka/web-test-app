import getData from './data.js'
import { getLocalStorage } from './storage.js'
import { getScoreECTS, getScore } from './resultParser.js'
import { getSession, setSession } from './session.js'

const cyrb53 = (str, seed = 0) => {
  var h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (var i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1>>>16, 2246822507) ^ Math.imul(h2 ^ h2>>>13, 3266489909);
  h2 = Math.imul(h2 ^ h2>>>16, 2246822507) ^ Math.imul(h1 ^ h1>>>13, 3266489909);
  return 4294967296 * (2097151 & h2) + (h1>>>0);
};

const hash32 = str => str.split('').reduce((prevHash, currVal) =>
(((prevHash * 32) - prevHash) + currVal.charCodeAt(0))|0, 0);

const adminData ={
  username: 92668751,
  password: 92668751,
  login(username, password) {
    const usernameHash = hash32(username);
    const passHash = hash32(password);
    console.log(usernameHash, passHash);
    if (this.username === usernameHash &&
      this.password === passHash){
        setSession('salt', 5)//Math.random());
        setSession('hash', cyrb53(""+usernameHash+passHash, 5))//Math.random());
        return true;
      }
    return false;
  },
  isLoginned() {
    const salt = getSession('salt');
    const hash = getSession('hash');

    if (!salt || !hash) return false;

    const crPass = ""+cyrb53(''+this.username+this.password, salt);
    console.log(crPass, hash, crPass === hash);
    return crPass === hash;
  }
}

const handleLogin = () => {
  if (adminData.isLoginned()) {
    console.log('loggined');
    location.href = './all-tests.html';
    return
  }
  document.forms[0].classList.remove('d-none');
  document.forms[0].addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.forms[0].elements[0].value;
    const password = document.forms[0].elements[1].value;
    if (adminData.login(username, password)) {
      location.reload();
    }
  });
}

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
} else if (location.pathname.includes('index') || location.pathname === '/admin/') 
  handleLogin();

