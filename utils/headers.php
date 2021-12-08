<?php

function get_header($name_header) {
  foreach (getallheaders() as $name => $value) {
    if ($name === $name_header)
      return $value;
  }
  return null;
}

?>