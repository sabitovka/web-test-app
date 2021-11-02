import { request, url } from "../utils/http.js";
import { QuizesView } from "../views/quizes.view.js";
import { HeaderView } from "../views/header.view.js"

export const Quizes = () => {
  return {
    name: 'quizes',
    model: {
      quizes: []
    },
    *view(model) {
      yield HeaderView(model) 
      yield QuizesView(model);
    },
    async controller(model, params) {
      model.quizes = await request(url + 'quizes');;
    }
  }
}