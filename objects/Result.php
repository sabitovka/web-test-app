<?php
require_once 'objects/Model.php';
include_once 'objects/User.php';
include_once 'objects/Quiz.php';
class Result extends Model {
  
  public $result_id;
  public $quiz;
  public $user;
  public $start_time;
  public $end_time;
  public $result_mask;

  public function __construct($quiz=null,  $user=null,  $start_time=null,  $end_time=null,  $result_mask=null) {  
    $this->quiz = $quiz;
    $this->user = $user;
    $this->start_time = $start_time;
    $this->end_time = $end_time;
    $this->result_mask = $result_mask;
  }

  public static function findAllByQuizId($db, $id) {
    $sql = 'SELECT result_id, quiz_id as quiz, user_id as user, result_mask, start_time, end_time 
      FROM result WHERE quiz_id = ?';
    $stmt = $db->prepare($sql);
    $stmt->execute([$id]);
    $stmt->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Result');

    $quiz = Quiz::findById($db, $id);
    if (!$quiz) return null;
    $quiz->results = [];
    while ($row = $stmt->fetch()) {
      $user = User::findById($db, $row->user);
      $row->user = $user;
      array_push($quiz->results, $row);
    }
    return $quiz;
  }

  public static function findById($db, $id) {
    $sql = 'SELECT result_id, quiz_id as quiz, user_id as user, result_mask, start_time, end_time
      FROM result WHERE result_id=?';
    $stmt = $db->prepare($sql);
    $stmt->execute([$id]);
    $stmt->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Result');    
    $res = $stmt->fetch();
    if (!$res) return null;
    $quiz = Quiz::findById($db, $res->quiz);
    $user = User::findById($db, $res->user);
    $res->quiz = $quiz;
    $res->user = $user;
    return $res;
  }

  public static function save($db, $result) {
    $sql = 'INSERT INTO result (start_time, end_time, result_mask, quiz_id, user_id) 
      values (:start_time, :end_time, :mask, :quiz, :user)';
    $stmt = $db->prepare($sql);
    $stmt->execute(['start_time' => date('Y-m-d H:i:s', $result->start_time / 1000),
      'end_time' => date('Y-m-d H:i:s', $result->end_time / 1000),
      'mask' => $result->result_mask,
      'quiz' => $result->quiz->quiz_id,
      'user' => $result->user->user_id]);
    return $db->lastInsertId();
  }

}

?>