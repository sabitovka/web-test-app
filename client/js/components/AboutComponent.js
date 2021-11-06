import { user } from "../utils/autorization.js";
import { request, url } from "../utils/http.js";
import { AboutView } from "../views/about.view.js";
import { HeaderView } from "../views/header.view.js";

export const About = () => {
  return {
    name: 'about_quiz',
    model: {
      quiz: [],
      user: {},
      loading: true
    },
    *view(model) {
      yield HeaderView.View(model);
      yield AboutView.View(model);
      HeaderView.Script();
      AboutView.Script();
    },
    async controller(model, params) {
      try {
        model.quiz = await request(url + `quizes/${params?.id}`);
        model.user = {
          ...user(),
          groups: await request(url + 'users/groups'),
        }
      } catch (e) {
        model.error = e;
      } finally {
        model.loading = false
      }
    }
  }
}