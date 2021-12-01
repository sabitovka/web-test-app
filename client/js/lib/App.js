class App {

  constructor(selector) {
    this.appElement = selector;
    this.components = {};
  }

  addComponent(component) {
    this.components[component.name] = component;
    component.model = this.proxify(component.model);
  }

  proxify(model) {
    return new Proxy(model, {
      set: (target, property, value) => {
        console.log('changing', property, 'from', target[property], 'to', value);
        target[property] = value;
        this.updateView();
        return true;
      }
    })
  }
  
  showComponent(name, params = {}) {
    this.currentComponent = this.components[name];
    this.updateView();
    if (this.currentComponent) {
      this.currentComponent.controller(this.currentComponent.model, params)
    }
  }
  
  updateView() {
    if (this.currentComponent) {     
      this.appElement.innerHTML = "";
      for (let view of this.currentComponent.view(this.currentComponent.model)) {
        this.appElement.insertAdjacentHTML('beforeend', view);
      }
    }
  }

}

export default App;