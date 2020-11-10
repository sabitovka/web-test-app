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
  }
} 

export default User;
