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

export const getScore = (rightCount, allCount) => rightCount / allCount * 100;