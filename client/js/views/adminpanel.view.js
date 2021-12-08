export function *AdminPanelView(model) {

  yield `
    <main>
      <div class="container">
        <h4 class="mt-5">Список тестов:</h4>
        <div class="table-wrapper card mt-3">
          <table class="table table-striped table-bordered table-all-tests">
            <thead class="text-center">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Название теста</th>
                <th scope="col">Вопросов</th>
                <th></th>
              </tr>
            </thead>
            <tbody class="text-center">
              ${model.quizes?.reduce((prev, curr, index) => `
                <tr>
                  <td>${index+1}</>
                  <td class="text-left">${curr.title}</td>
                  <td>${curr.questions_count}</td>
                  <td><a href="#/admin/panel/results?id=${curr.id}">Результаты</a></td>
                </tr>
              `, '')}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  `;

}