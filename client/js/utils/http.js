export const request = async (url, method = 'GET', body = null, headers = {}) => {
  if (body) {
    body = JSON.stringify(body);
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    headers['Access-Control-Allow-Origin'] = "*";
  }

  const response = await fetch(url, { method, body, headers });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Что-то пошло не так')
  }

  return data;
}

export const COMMON = {
  backend_url: 'http://localhost:80/',
  api_url: '../api/',
}

export const url = /* COMMON.backend_url + */ COMMON.api_url;