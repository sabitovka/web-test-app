'use strict'

import App from './lib/App.js';
import Router from './lib/Router.js';
import { Quizes } from './components/QuizesComponent.js';
import { About } from './components/AboutComponent.js';
import { Test } from './components/TestComponent.js';
import { Result } from './components/ResultComponent.js';
import { AdminLoginComponent } from './components/AdminLoginComponent.js';
import { AdminPanelComponent } from './components/AdminPanelComponent.js';
import { AdminTestResultsComponent } from './components/AdminTestResultsComponent.js';

const app = new App(document.querySelector('#app'));
const router = new Router(app);

app.addComponent(Quizes());
app.addComponent(About());
app.addComponent(Test());
app.addComponent(Result());
app.addComponent(AdminLoginComponent());
app.addComponent(AdminPanelComponent());
app.addComponent(AdminTestResultsComponent());

router.addRoute('quizes', '^#?/?(index)?/?$', {own: true});
router.addRoute('about_quiz', 'about-test', {supportParams: true});
router.addRoute('test', 'test', {supportParams: true});
router.addRoute('result', 'result', {supportParams: true});
router.addRoute('admin_login', 'admin', {exact: true});
router.addRoute('admin_panel', 'admin/panel', {exact: true});
router.addRoute('admin_test_results', 'admin/panel/results', {supportParams: true});