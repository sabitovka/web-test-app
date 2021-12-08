<?php 

include_once 'headers/base.headers.php';
include_once 'utils/response.php';
include_once 'config/database.php';
include_once 'objects/Quiz.php';
include_once 'objects/Question.php';
include_once 'objects/Variant.php';

$db = Database::getConnection();

function route($method, $urlData, $formData) {
  //echo $method;
  //print_r($urlData);
  
  if ($method === 'GET') {
    // GET /quizes/
    if (!count($urlData)) {
      return findAll();
    }
    // GET /quizes/:id
    if (count($urlData) === 1 && is_numeric($urlData[0])) {
      return findById($urlData[0]);
    }
    // GET /quizes/:id/test
    if (count($urlData) === 2 && is_numeric($urlData[0]) && $urlData[1] === 'test') {
      return findAllQuestionByQuizId($urlData[0]);
    }
  }
  return response(array('message' => 'Bad Request'), 400);
}

/*
  Находит все тесты. Отображает неполную информацию: только название, количесво вопросов, лимит и ИД
  Работает по роуту:
  GET /quizes/
*/
function findAll() {
  global $db;
  // вытаскиваем все данные из БД
  $quizes = Quiz::findAll($db);

  // если ничего не нашлось - 404
  if (!count($quizes))
    return response(array('message' => 'Not Found'), 404);
  
  // если что-то есть - достаем
  return response($quizes, 200);
}

/*
  Находит тест по Id. Отображает полную информацию о тесте: название, описание, корличество вопросов, лимит времени 
  GET /quizes/:id
*/
function findById($id) {
  global $db;
  // вытаскиваем тест по id
  $quiz = Quiz::findById($db, $id);

  if (!$quiz) {
    return response(array('message' => 'Not Found'), 404);
  }

  return response($quiz, 200);
}

/*
  Находит вопросы с вариантами ответов по идентификатору теста
  GET /quizes/:id/test
*/
function findAllQuestionByQuizId($quizId) {
  global $db;
  // вытаскиваем вопросы
  $questions = Question::findAllByQuizId($db, $quizId);

  // если ничего не найдено - выводим 404
  if (!count($questions)) 
    return response(array('message' => 'Not Found'), 404);

  return response($questions, 200);  
}

?>