export const AboutView = (model) => {
  return `
  <main>
    <div class="container">
      <section class="about-test-section mx-auto text-center col-8">
        <div class="greeting d-none">Приветствую, <span></span>, пройдите тест</div>
        <h2 class="test-name">${model.quiz.title}</h2>
        <a href="#test?id=${model.quiz.quiz_id}" class="btn start-test-link">Начать тест</a>
        <noscript>Похоже, Вы не включили JavaScript :(</noscript>
      </section>
      <article class="about-test">
        ${model.quiz.descr}
      </article>
    </div>
  </main>  
  `

  //   if (User.isAutorized()) {
  //     console.log(greeting);
  //     greeting.classList.remove('d-none');
  //     greeting.querySelector('span').textContent = User.name;
  //     startTestLink.setAttribute('href', `./test.html#${data.id}`)
  //   } else {
  //     startTestLink.setAttribute('data-toggle', 'modal');
  //     startTestLink.setAttribute('data-target', '#user-login');
  //   }

}