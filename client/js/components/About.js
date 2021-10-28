import { request, COMMON } from "../utils/http.js";
import { AboutView } from "../views/about.view.js";
import { HeaderView } from "../views/header.view.js";

export const About = () => {
  return {
    name: 'about_quiz',
    model: {
      quiz: []
    },
    view(model) {
      let content = '';
      content += HeaderView();
      content += AboutView(model);
      return content;
    },
    async controller(model, params) {
      try {
        model.quiz = await request(COMMON.backend_url + `webtest/api/quizes/${params?.id}`);
      } catch (e) {
        model.error = e;
      }
    }
  }
}