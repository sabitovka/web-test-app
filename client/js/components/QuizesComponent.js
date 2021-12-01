import { request, url } from "../utils/http.js";
import { QuizesView } from "../views/quizes.view.js";
import { HeaderView } from "../views/header.view.js"
import { user } from "../utils/autorization.js";

export const Quizes = () => {
  return {
    name: 'quizes',
    model: {
      quizes: [],
      user: {},
      loading: true
    },
    *view(model) {
      document.title = 'Foo.bar | Cайт тестирования'
      yield HeaderView.View(model);
      yield QuizesView(model);
      HeaderView.Script();
    },
    async controller(model, params) {
      model.user = {
        ...user(),
        groups: await request(url + 'users/groups'),
      }
      model.quizes = await request(url + 'quizes');
      model.loading = false;
    }
  }
}