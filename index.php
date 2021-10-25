<?php 

define('DEBUG', true);

include_once 'headers/base.headers.php';

$method = $_SERVER["REQUEST_METHOD"];
$formData = getFormData($method);

$url = (isset($_GET['q'])) ? $_GET['q'] : '';
$url = rtrim($url, '/');
$urls = explode('/', $url);

$router = $urls[0];
$urlData = array_slice($urls, 1);

try {
  if (file_exists('routes/' . $router . '.routes.php')) {
    include_once 'routes/' . $router . '.routes.php';
    if (function_exists('route')) {
      echo route($method, $urlData, $formData);
      exit;
    }
  }

  include_once 'utils/response.php';
  echo response(array('message' => 'Bad Request. No Such Route'), 400);
} catch (Throwable $e) {
  if (constant('DEBUG')) {
    echo $e;
  }
  include_once 'utils/response.php';
  echo response(['message' => 'Произошла ошибка на сервере, повторите попытку поже', 'error' => $e->getMessage()]);
}


function getFormData($method) {
  if ($method === 'GET') return $_GET;
  if ($method === 'POST') return strlen(file_get_contents("php://input")) ? file_get_contents("php://input") : $_POST;

  // TODO 23.09.2021 8:56: Добавить методы put patch delete
}

?>