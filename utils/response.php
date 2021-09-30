<?php

function response($data, $status = 500) {
  header('HTTP/1.1 ' . $status . ' ' . request_status($status));
  return json_encode($data, JSON_UNESCAPED_UNICODE);
}

function request_status($code) {
  $status = array(
    200 => 'OK',
    400 => 'Bad Request',
    404 => 'Not Found',
    405 => 'Method Not Allowed',
    500 => 'Internal Server Error',
  );
  return $status[$code] ?? $status[500];
}

?>