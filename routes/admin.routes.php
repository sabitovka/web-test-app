<?php 

include_once 'headers/base.headers.php';
include_once 'utils/response.php';
include_once 'utils/authorization.php';
include_once 'config/core.php';

function route($method, $urlData, $formData) {
  if ($method === 'GET') {
    return is_autorized();
  }

  if ($method === 'POST') {
    if (count($urlData) === 1 && $urlData[0] === 'login') {
      return login(json_decode($formData, true));
    }
  }
  return response(array('message' => 'Bad Request'), 400);
}

function login($formData) {
  if (md5(ADMIN_PSWD) === $formData['password']) {
    return response(['token' => get_token()], 200);
  }
  else {
    return response(['message' => 'Неверный пароль'], 401);
  }
}

?>