import { request, url } from "../utils/http.js";
import { AboutView } from "../views/about.view.js";
import { HeaderView } from "../views/header.view.js";

export const About = () => {
  return {
    name: 'about_quiz',
    model: {
      quiz: []
    },
    *view(model) {
      yield HeaderView();
      yield AboutView(model);
    },
    async controller(model, params) {
      try {
        model.quiz = await request(url + `quizes/${params?.id}`);
      } catch (e) {
        model.error = e;
      }
    }
  }
}