import { getLocalStorage, setLocalStorage } from './storage.js';
import cookieParser from './cookie.js'

const User = {
  nameData: cookieParser.getCookie('name'),
  groupData: cookieParser.getCookie('group'),

  get name() { return this.nameData },
  get group() { return this.groupData }, 

  set name(title) {
    cookieParser.setCookie("name", title);
    this.nameData = title;
  },

  set group(title) {
    cookieParser.setCookie("group", title);
    this.groupData = title;
  },

  toString() {
    return this.name + " - " + this.group;
  },
  isAutorized() { 
    return this.name && this.group;
  },

  set result(res) {
    res.name = this.name;
    res.group = this.group;
    // находим все результаты
    const allRes = getLocalStorage('results');
    let obj = allRes.find(item => 
      item.id === res.id && 
      item.name === this.name && 
      item.group === this.group);
    if (obj) {
      obj.results = res.results;
    } else {
      allRes.push(res);
    }

    console.log(allRes);
    setLocalStorage('results', allRes);
  }
} 

export default User;
