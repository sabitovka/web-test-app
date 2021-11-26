<?php 

include_once 'headers/base.headers.php';
include_once 'utils/response.php';


function route($method, $urlData, $formData) {

  if ($method === 'GET') {

  }

  if ($method === 'POST') {
    if (count($urlData) === 1 && $urlData[0] === 'login') {
      return login(json_decode($formData, true));
    }

  }
  return response(array('message' => 'Bad Request'), 400);
}

function login($formData) {
  require_once 'config/pdoconfig.php';
  if (md5($adminPassword) === $formData['password']) {
    return response(['token' => '1548d11a4542c45f1'], 200);
  }
  else {
    return response(['message' => 'Неверный пароль'], 401);
  }
}

?>