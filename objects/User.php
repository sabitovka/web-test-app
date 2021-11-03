<?php
require_once 'objects/Model.php';
class User extends Model {
  /*
  Выбирает пользователя по идентификатору
  Возвращает:
    user_id, name, group_name
  */
  public static function findById($db, $id) {
    $query = 'SELECT * FROM v_allusers WHERE user_id=' . $id;
    $stmt = self::executeQuery($db, $query);
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'User');    
    // записываем результат
    return $stmt->fetch();
  }

  public static function findAll($db) {
    $sql = 'SELECT * FROM v_allusers';
    $stmt = self::executeQuery($db, $sql);
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'User');
    $res = [];
    while($row = $stmt->fetch()) {      
      array_push($res, $row);
    }
    return $res;
  }

  public static function findAllGroups($db) {
    $sql = 'SELECT * FROM `group`';
    $stmt = self::executeQuery($db, $sql);
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'User');
    $res = [];
    while($row = $stmt->fetch()) {      
      array_push($res, $row);
    }
    return $res;
  }

  public static function saveUser($db, $name, $group_id) {
    $sql = 'SELECT get_user(:username, :group_id) as userid';
    $stmt = $db->prepare($sql);
    $stmt->execute(['username' => $name, 'group_id' => $group_id]);
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'User');
    $res = $stmt->fetch();
    if (!$res) return null;
    return $res;
  }

}

?>