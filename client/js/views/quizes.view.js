export const QuizesView = (model) => {

  const testsWrapper = model.quizes.reduce((previos, current) => 
        `<div class="col mb-4">
            <div class="card h-100">
              <div class="card-body">
                <div class="card-text text-truncate">
                  ${current.title}
                </div>
              </div>
              <div class="card-footer d-flex align-items-center justify-content-between">
                <a href="#about-test?id=${current.id}">НАЧАТЬ ТЕСТ</a>
                <small>Вопросов: <span>${current.questions_count}</span></small>
              </div>
              <!-- .card-footer -->
            </div>
            <!-- .card -->
          </div>
          <!-- .col -->
        `, '');  

  return (
  `<main>
    <div class="container">
      <h3 class="tests-heading">Выберите тест</h3>
      <noscript>Похоже, Вы не включили JavaScript :(</noscript>
      <div class="tests-wrapper row row-cols-1 row-cols-md-2 row-cols-lg-3">
        ${testsWrapper}
      </div>
    </div>
  </main>
  `);

}