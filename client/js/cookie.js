const cookieParser = {

  parseCookie() {
    return document.cookie.split("; ").map(item => item.split("=")[1]);
  },

  // устанавливаем куки
  setCookie(name, value) {
    const updatetedCookie = encodeURIComponent(name) + "="+ encodeURIComponent(value)

    document.cookie = updatetedCookie;
  },

  // получаем куки
  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }

}

export default cookieParser;