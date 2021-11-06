'use strict'

import App from './lib/App.js';
import Router from './lib/Router.js';
import { Quizes } from './components/QuizesComponent.js';
import { About } from './components/AboutComponent.js';
import { Test } from './components/TestComponent.js';
import { Result } from './components/ResultComponent.js';

const app = new App(document.querySelector('#app'));
const router = new Router(app);

app.addComponent(Quizes());
app.addComponent(About());
app.addComponent(Test());
app.addComponent(Result())

router.addRoute('quizes', '^#?/?(index)?/?$', {own: true});
router.addRoute('about_quiz', 'about-test', {supportParams: true});
router.addRoute('test', 'test', {supportParams: true});
router.addRoute('result', 'result', {supportParams: true})