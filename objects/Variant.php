<?php
require_once 'objects/Model.php';
class Variant extends Model {

  /*
  Выбирает вариант по идентификатору
  Возвращает:
    variant_id, title, right, question_id
  */
  public static function findById($db, $id) {
    $query = 'SELECT * FROM variant WHERE variant_id=' . $id;
    $stmt = self::executeQuery($db, $query);
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'Variant');    
    // записываем результат
    return $stmt->fetch();
  }

  /*
  Выбирает варианты по идентификатору вопроса
  Возвращает:
    id, title
  */
  public static function findAllByQuestionId($db, $id) {
    $query = 'SELECT variant_id as id, title 
      FROM variant 
      WHERE question_id=' . $id;
    $stmt = self::executeQuery($db, $query);
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'Variant');
    $res = array();
    while($row = $stmt->fetch()) {
      array_push($res, $row);
    }
    return $res;
  }
}

?>