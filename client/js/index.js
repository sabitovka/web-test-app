'use strict'

import App from './lib/App.js';
import Router from './lib/Router.js';
import { Quizes } from './components/quizes.js';
import { About } from './components/About.js';

const app = new App(document.querySelector('#app'));
const router = new Router(app);

app.addComponent(Quizes());
app.addComponent(About());

router.addRoute('quizes', /^#?\/?(index)?\/?$/);
router.addRoute('about_quiz', /^#\/?about-test(\?(\S*=\w*)*&?)?$/);