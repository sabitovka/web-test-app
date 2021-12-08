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
    $stmt = self::executeQuery($db, $query);
    // пользуемся магической функцией для автоматического формирования объекта
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'Quiz');
    // сюда будем записывать готовый объект
    $quiz_array = array();
    // пока что-то есть - достаем и пушим в массив
    while($row = $stmt->fetch()) {
      array_push($quiz_array, $row);
    }
    return $quiz_array;
  }

  /*
  Выбирает тест по идентификатору
  Возвращает:
    quiz_id, title, descr, time_limit
  */
  public static function findById($db, $id) {
    $query = 'SELECT * FROM ' . self::$table_name . ' WHERE quiz_id=' . $id;
    $stmt = self::executeQuery($db, $query);
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'Quiz');    
    // записываем результат
    return $stmt->fetch();
  }

}

?>