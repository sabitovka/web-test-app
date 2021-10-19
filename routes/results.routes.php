<?php 

include_once 'headers/base.headers.php';
include_once 'utils/response.php';
include_once 'config/database.php';
include_once 'objects/Quiz.php';
include_once 'objects/User.php';
include_once 'objects/Result.php';

$db = Database::getConnection();

function route($method, $urlData, $formData) {
  if ($method === 'GET') {
    // GET /results/:id
    if (count($urlData) === 1 && is_numeric($urlData[0])) {
      return findById($urlData[0]);
    }
  }
  if ($method === 'POST') {
    // POST /results/
    if (!count($urlData)) {
      return saveResult(json_decode($formData, true));
    }
  }

  return response(['message' => 'Bad Request'], 400);
}

function findById($id) {
  global $db;

  $res = Result::findById($db, $id);

  if (!$res) {
    return response(array('message' => 'Not Found'), 404);
  }

  return response($res, 200);
}

/*
Добавляет результат из POST запроса
@param $formData JSON вида:
{
    "quizid": 1,
    "userid": 2,
    "answers": [17,20,3,1, [2,3,1], 1, 2],
    "start_time": "2021-10-18T09:56:00.548Z",
    "end_time": "2021-10-18T10:15:00.548Z"
}
@returns Объект резуьтата
*/
// TODO 19.10.2021: Если такой результат существует - перезаписать
function saveResult($formData) {
  global $db;
  // проверяем наличие пользователя
  if (!$user = User::findById($db, $formData['userid'])) {
    return response(array('message' => 'Пользователь не найден'), 401);
  }
  // проверяем, что тест длился нужное время
  if (!$quiz = Quiz::findById($db, $formData['quizid'])) {
    return response(array('message' => 'Тест не найден. Возможно он перемещен или удален'), 404);
  }

  $start_time = strtotime($formData['start_time']);
  $end_time = strtotime($formData['end_time']);

  $diff = intval(($end_time - $start_time) / 60);
  // TODO 19.10.2021: Если лимит в quiz = 0 - нет лимита и обрабатывать его не надо
  $limit = $quiz->time_limit;
  if ($diff < 0 || $diff > $limit) {
    return response(array('message' => 'Время теста вышло'), 403);
  }
  // TODO 19.10.2021: проверять результат

  //// добавляем запись
  // создаем объект на основе переданных данных
  $result = new Result($quiz, $user, date('Y-m-d', $start_time), date('Y-m-d', $end_time), $formData['answers'] );
  // сохраняем и запомнаем id
  $resultId = Result::save($db, $result);
  $result->result_id = $resultId;
  ////
  if (!$resultId) return response(['message' => 'Произошла непредвиденная ошибка']);
  return response(['result' => $result], 200);
}

?>