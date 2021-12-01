import { request, url } from "../utils/http.js";
import { AdminHeaderView } from "../views/adminheader.view.js";
import { AdminPanelView } from "../views/adminpanel.view.js";

export const AdminPanelComponent = () => {
  return {
    name: 'admin_panel',
    model: {
      loading: true,
      quizes: []
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
      yield *AdminPanelView(model);     
    },
    async controller(model, params) {
      model.loading = true
      const token = localStorage.getItem('token');
      model.quizes = await request('/api/quizes/', 'GET');
      model.loading = false;
    }
  }
}