import { User } from './autorization.js'

import getData from './data.js'

if (location.pathname.startsWith('/index') || location.pathname === '/') {
  getData.quizesList(console.log);
}

if (location.hash && location.pathname.includes('quiz') && User.isAutorized()) {
  getData.quiz('idd03', console.log);
} else {
  console.log('Перенаправляем на index.html');
}