<?php

class Model {

  protected static function executeQuery($db, $sql) {
    $stmt = $db->prepare($sql);
    $stmt->execute();
    return $stmt;
  }

}

?>