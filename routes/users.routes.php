<?php

include_once 'headers/base.headers.php';
include_once 'utils/response.php';
include_once 'utils/authorization.php';
include_once 'config/database.php';
include_once 'objects/User.php'; 

$db = Database::getConnection();

function route($method, $urlData, $formData) {
  if ($method === 'GET') {
    if (is_autorized() && !count($urlData)) {
      return findAll();
    }
    // GET /users/:id
    if (count($urlData) === 1 && is_numeric($urlData[0])) {
      return findById($urlData[0]);
    }
    // GET /users/groups
    if (count($urlData) === 1 && $urlData[0] === 'groups') {
      return findAllGroups();
    }
  }
  if ($method === 'POST') {
    /* // POST /users/
    if (!count($urlData)) {
      return getUser(json_decode($formData, true));
    } */
    // POST /users/login/
    if (count($urlData) === 1 && $urlData[0] === 'login') {
      return loginUser(json_decode($formData, true));
    }
  }

  return response(['message' => 'Bad Request'], 400);
}

function findById($id) {
  global $db;
  $user = User::findById($db, $id);
  if (!$user) {
    return response(array('message' => 'Пользователь не найден'), 404);
  }
  return response($user, 200);
}

function findAll() {
  global $db;

  $users = User::findAll($db);
  if (!$users) {
    return [];
  }
  return response($users, 200);
}

function findAllGroups() {
  global $db;

  $groups = User::findAllGroups($db);

  if (!count($groups))
    return response(array('message' => 'Not Found'), 404);

  return response($groups, 200);
}

function loginUser($formData) {
  global $db;
  
  $user = User::saveUser($db, $formData['username'], $formData['groupid']);

  if (!$user) return response(['message' => 'Произошла ошибка добавления пользователя']);
  return response(['userid' => $user->userid], 200);
}


?>