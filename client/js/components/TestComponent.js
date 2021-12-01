import { user } from "../utils/autorization.js";
import { url, request } from "../utils/http.js";
import { TestView } from "../views/test.view.js";

export const Test = () => {
  return {
    name: 'test',
    model: {
      question: {},
      user: {},
      loading: true
    },
    *view(model) {
      document.title = 'Foo.bar | Тест';
      yield *TestView(model);
    },
    async controller(model, params) {
      try {
        const questions = await request(url + `quizes/${params.id}/test`);
        const quiz = await request(url + `quizes/${params.id}`);

        model.question = {
          currentQuestion: questions[0],
          questions: questions,
          limit: quiz.time_limit,
          count: questions.length,
          index: 1,
          answers: [],
          start_time: new Date(),
          quiz_id: params.id
        }

        model.user = {
          ...user(),
        }
      } catch(e) {
        console.error(e);
      } finally {
        model.loading = false
      }
    }
  }
}