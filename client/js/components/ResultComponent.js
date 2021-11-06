import { request, url } from "../utils/http.js";
import { ResultView } from "../views/result.view.js"

export const Result = () => {
  return {
    name: 'result',
    model: {
      result: {},
      loading: true
    },
    *view(model) {
      yield ResultView.View(model);
      ResultView.Script();
    },
    async controller(model,params) {
      model.result = await request(url+`/results/${params.id}`)  
      model.loading = false;  
    }
  }
}