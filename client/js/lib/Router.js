class Router {

  constructor(app) {
    this.app = app;
    this.routes = [];
    this.hashChange = this.hashChange.bind(this);
    window.addEventListener('hashchange', this.hashChange);
    window.addEventListener('DOMContentLoaded', this.hashChange);
  }

  addRoute(name, path) {
    this.routes.push({
      name, path
    })
  }

  hashChange() {
    const { hash } = window.location;
    const route = this.routes.find(route => hash.match(new RegExp(route.path)));
    if (route) {
      const params = new RegExp(route.path).exec(hash);
      this.params = params;
      const search = hash.split('?', 2)[1]
        ?.split('&')
        .map(item => item.split('=',2))
        .reduce((prev, cur) => { 
          prev[cur[0]] = cur[1];
          return prev;
         }, {});
      this.app.showComponent(route.name, search)
    }
  }
}

export default Router;