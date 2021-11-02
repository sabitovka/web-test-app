'use strict'

import App from './lib/App.js';
import Router from './lib/Router.js';
import { Quizes } from './components/Quizes.js';
import { About } from './components/About.js';
import { Test } from './components/Test.js';

const app = new App(document.querySelector('#app'));
const router = new Router(app);

app.addComponent(Quizes());
app.addComponent(About());
app.addComponent(Test());

router.addRoute('quizes', /^#?\/?(index)?\/?$/);
router.addRoute('about_quiz', /^#\/?about-test(\?(\S*=\w*)*&?)?$/);
router.addRoute('test', /^#\/?test(\?(\S*=\w*)*&?)?$/);