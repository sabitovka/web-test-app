<?php 

define('DEBUG', false);

include_once 'headers/base.headers.php';
include_once 'exceptions/UnauthorizedException.php';
include_once 'exceptions/BadRequestException.php';

$method = $_SERVER["REQUEST_METHOD"];
$formData = getFormData($method);

$url = (isset($_GET['q'])) ? $_GET['q'] : '';
$url = rtrim($url, '/');
$urls = explode('/', $url);

$router = $urls[0];
$urlData = array_slice($urls, 1);

try {
  if (!file_exists('routes/' . $router . '.routes.php')) {
    throw new BadRequestException("No Such Route");
  }

  include_once 'routes/' . $router . '.routes.php';
  if (!function_exists('route')) {
    throw new BadRequestException("No Such Route");
  }
  echo route($method, $urlData, $formData);

} 
catch (BadRequestException $e) {
  include_once 'utils/response.php';
  echo response(['message' => 'Bad Request', 'error' => $e->getMessage()], 400);
}
catch (UnauthorizedException $e) {
  include_once 'utils/response.php';
  echo response(['message' => 'Ошибка авторизации', 'error' => $e->getMessage()], 401);
}
catch (Throwable $e) {
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