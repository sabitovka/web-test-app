const storageName = 'userData';

export const user = () => { 
  const data = JSON.parse(localStorage.getItem(storageName));
  return {...data};
};

export const login = (id, name) => {
  localStorage.setItem(storageName, JSON.stringify({
    userid: id, name
  }))
}

export const logout = () => {
  localStorage.removeItem(storageName);
}
