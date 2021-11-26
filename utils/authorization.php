<?php 

include_once 'headers/base.headers.php';
include_once 'utils/response.php';
include_once 'utils/headers.php';
include_once 'config/core.php';
include_once 'libs/php-jwt-5.5.1/src/BeforeValidException.php';
include_once 'libs/php-jwt-5.5.1/src/ExpiredException.php';
include_once 'libs/php-jwt-5.5.1/src/SignatureInvalidException.php';
include_once 'libs/php-jwt-5.5.1/src/JWT.php';
use \Firebase\JWT\JWT;

function is_autorized() {

  $header = get_header('Authorization') ??  "";
  $match = "";
  if (!preg_match('/Bearer\s(\S+)/', $header, $match)) {
    throw new UnauthorizedException("Отсутствут токен");
  }

  $jwt = $match[1];
  if ($jwt) {
    try {
      $decoded = JWT::decode($jwt, KEY, ['HS256']);
      return true;
    } 
    catch (Exception $e) {
      throw new UnauthorizedException("Неверный токен");
    }
  }  
}

function get_token() {
  $token = array(
    "iss" => ISS,
    "aud" => AUD,
    "iat" => IAT,
    "nbf" => NBF,
    "data" => array(
      "name" => "adminus",
      "password" => ADMIN_PSWD
    )
  );

  return JWT::encode($token, KEY);
}

?>