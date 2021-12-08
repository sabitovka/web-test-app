<?php
require_once 'objects/Model.php';
require_once 'objects/Variant.php';
class Question extends Model {
  /*
  Выбирает вопросы по идентификатору теста
  Возвращает:
    quiz_id, title, descr, time_limit, variants
  */
  public static function findAllByQuizId($db, $id) {
    // Запрос на выборку
    $query = 'SELECT *
      FROM question  
      WHERE quiz_id=' . $id;
    // выоплняем запрос
    $stmt = self::executeQuery($db, $query);
    // устанавливаем режим обработки в класс
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'Question');
    // здесь будет результат
    $res = array();
    // достаем все данные
    while($row = $stmt->fetch()) {
      // достаем варианты ответов по идентификатору вопроса
      $row->variants = Variant::findAllByQuestionId($db, $row->question_id);
      // заносим в результат
      array_push($res, $row);
    }
    return $res;
  }
}

?>