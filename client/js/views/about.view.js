export const AboutView = {
  
  View(model) {
    this.model = model;
    return `
    <main>
      <div class="container">
        <section class="about-test-section mx-auto text-center col-8">
          <div class="greeting d-none">Приветствую, <span></span>, пройдите тест</div>
          <h2 class="test-name">${model.quiz.title}</h2>
          <a href="#" class="btn start-test-link">Начать тест</a>
          <noscript>Похоже, Вы не включили JavaScript :(</noscript>
        </section>
        <article class="about-test">
          ${model.quiz.descr}
        </article>
      </div>
    </main>  
    `
  },

  Script() {
    console.log(1);
    if (this.model.user?.userid) {
      $('.greeting span').removeClass('d-none');
      $('.greeting').text(this.model.user?.name);
      $('.start-test-link').attr('href', `#test?id=${this.model.quiz.quiz_id}`)
    } else {
      $('.start-test-link').attr('data-toggle', 'modal');
      $('.start-test-link').attr('data-target', '#user-login');
    }
  }

}