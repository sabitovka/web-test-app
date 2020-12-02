import { getLocalStorage } from './storage.js'

export const getScoreECTS = (value) => {
  if (value <= 34) {
    return 'F';
  } else if (value <= 59) {
    return 'FX'
  } else if (value <= 69) {
    return 'E'
  } else if (value <= 74) {
    return 'D'
  } else if (value <= 79) {
    return 'C'
  } else if (value <= 89) {
    return 'B'
  } else if (value <= 100) {
    return 'A'
  }
}

export const getScore = (rightCount, allCount) => (Math.floor(rightCount / allCount * 100));

export const getScoreGov = (value) => {
  if (value <= 59) {
    return "Неудовлетворительно"
  } else if (value <= 74) {
    return "Удовлетворительно"
  } else if (value <= 89) {
    return "Хорошо"
  } else if (value <= 100) {
    return "Отлично"
  }
}

export const loadResults = (name, group, id) => {
  // находим все результаты
  const allRes = getLocalStorage('results');
  // находим результат с совпадающими name, group, id
  return allRes.find(item => 
    item.id === id && 
    item.name === name && 
    item.group === group);
}