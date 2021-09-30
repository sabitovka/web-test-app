<?php 

$method = $_SERVER["REQUEST_METHOD"];
$formData = getFormData($method);

$url = (isset($_GET['q'])) ? $_GET['q'] : '';
$url = rtrim($url, '/');
$urls = explode('/', $url);

$router = $urls[0];
$urlData = array_slice($urls, 1);

include_once 'routes/' . $router . '.routes.php';
echo route($method, $urlData, $formData);

function getFormData($method) {
  if ($method === 'GET') return $_GET;
  if ($method === 'POST') return $_POST;

  // TODO 23.09.2021 8:56: Добавить методы put patch delete
}

?>