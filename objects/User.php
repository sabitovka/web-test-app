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
}

?>