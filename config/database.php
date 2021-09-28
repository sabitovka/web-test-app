<?php 

class Database {

  private static $connection;

  public static function getConnection() {
    try {
      if (self::$connection === null) {
        require_once 'config/pdoconfig.php';
        self::$connection = new PDO('mysql:host='.$host.';dbname='.$dbname, $username, $password);
      }
    } catch (PDOException $exception) {
      echo "Connection error: " . $exception->getMessage();
    }
    return self::$connection;
  }

}

?>