<?php 
require_once 'objects/Model.php';
class Quiz extends Model {

  private static $table_name = 'quiz';

  /*
  Выбирает все тесты, считая количество вопросов в каждом тесте
  Возвращает:
    id, title, questions_count
  */
  public static function findAll($db) {
    $query = 'SELECT * FROM v_allquizes';
    return self::executeQuery($db, $query);
  }

  /*
  Выбирает тест по идентификатору
  Возвращает:
    quiz_id, title, descr, time_limit
  */
  public static function findById($db, $id) {
    $query = 'SELECT * FROM ' . self::$table_name . ' WHERE quiz_id=' . $id;
    return self::executeQuery($db, $query);
  }

}

?>