<?php 

include_once 'headers/base.headers.php';
include_once 'utils/response.php';
include_once 'config/database.php';
include_once 'objects/Quiz.php';
include_once 'objects/User.php';
include_once 'objects/Result.php';
include_once 'objects/Variant.php';

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
    "start_time": 1635138013940,
    "end_time": 1635138013940
}
@returns id резуьтата
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

  // делим на 1000 потому что js показывает количество МИЛЛИСЕКУНД - деалем СЕКУНДЫ
  $start_time = $formData['start_time'];
  $end_time = $formData['end_time'];

  $diff = ($end_time - $start_time) / 1000;
  // TODO 19.10.2021: Если лимит в quiz = 0 - нет лимита и обрабатывать его не надо
  $limit = $quiz->time_limit * 60;
  if ($diff < 0 || $diff > $limit) {
    return response(array('message' => 'Время теста вышло'), 403);
  }

  // TODO 19.10.2021: проверять результат
  $result_mask = '';
  foreach($formData['answers'] as $variantId) {
    // TODO 25.10.2021: обрабатывать множественный вариант ответа
    if (is_array($variantId)) {
      $is_correct = false;
      /* foreach($variantId as $new_var_id) {
        if (($variant = Variant::findById($db, $new_var_id)) && !$variant->right ) {
          $is_correct = false;
          break;
        }
      } */
      $result_mask .= (int) $is_correct;
      continue;
    }
    if ($variant = Variant::findById($db, $variantId))
      $result_mask .= $variant->right;
  }

  //// добавляем запись
  // создаем объект на основе переданных данных
  $result = new Result($quiz, $user, $start_time, $end_time, $result_mask);
  // сохраняем и запомнаем id
  if (!$formData['debug'])
    $resultId = Result::save($db, $result);
  else 
    $resultId = 45;
  ////
  if (!$resultId) return response(['message' => 'Произошла непредвиденная ошибка']);
  return response(['resultid' => $resultId], 200);
}

?>