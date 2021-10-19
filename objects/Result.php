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
    $stmt->execute(['start_time' => $result->start_time,
      'end_time' => $result->end_time,
      'mask' => '$result->result_mask',
      'quiz' => $result->quiz->quiz_id,
      'user' => $result->user->user_id]);
    return $db->lastInsertId();
  }

}

?>