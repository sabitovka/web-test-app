import  User  from './userData.js'
import getData from './data.js'

if (location.pathname.startsWith('/index') || location.pathname === '/') {
  getData.quizesList(console.log);
}

if (location.search && location.pathname.includes('result')) {
  const [name, group, id] = decodeURI(location.search).substr(1).split('&').map(item => item.split('=')[1]);

  
  /*group = encodeURIComponent(group); */

  console.log(name);
  console.log(group);
  console.log(id);
}  

if (location.hash && location.pathname.includes('quiz') && User.isAutorized()) {
  //getData.quiz('idd03', console.log);
} else {
  console.log('Перенаправляем на index.html');
}