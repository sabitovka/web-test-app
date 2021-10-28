import { request, COMMON } from "../utils/http.js";
import { QuizesView } from "../views/quizes.view.js";
import { HeaderView } from "../views/header.view.js"

export const Quizes = () => {
  return {
    name: 'quizes',
    model: {
      quizes: []
    },
    view(model) {
      let content = '';
      content += HeaderView(model);
      content += QuizesView(model);
      return content;
    },
    async controller(model, params) {
      model.quizes = await request(COMMON.backend_url + 'webtest/api/quizes');;
    }
  }
}