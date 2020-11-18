export const setSession = (name, value) => {
  sessionStorage.setItem(name, value);
};

export const getSession = (name) => {
  return sessionStorage.getItem(name);
}