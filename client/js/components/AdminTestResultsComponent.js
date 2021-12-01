import { request, url } from "../utils/http.js";
import { AdminHeaderView } from "../views/adminheader.view.js";
import { AdminTestResultsView } from "../views/admintestresults.view.js";

export const AdminTestResultsComponent = () => {
  return {
    name: 'admin_test_results',
    model: {
      loading: true,
    },
    *view(model) {
      if (!localStorage.getItem('token')) {
        location = "#/admin";
        return;
      }
      if (model.loading)
        return;
      document.title = 'Администартивная панель Foo.bar'
      yield *AdminHeaderView();
      yield *AdminTestResultsView(model);
    },
    async controller(model, params) { 
      model.loading = true
      model.quiz_result = await request(`/api/results/quiz/${params.id}`, 'GET');
      model.loading = false;
    }
  }
}