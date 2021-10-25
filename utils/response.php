<?php

function response($data, $status = 500) {
  http_response_code($status);
  return json_encode($data, JSON_UNESCAPED_UNICODE);
}

?>