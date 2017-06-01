'use strict';

/**
 * Функция принимает данные и 
 * 
 * @param {string} data - извлечённый из файла контент 
 * @param {string} comment - строка комментария по которой отсекается контент  
 * @returns 
 */
function fetchData(data, comment) {
  if (!comment) throw new Error('Type is not speified!');

  const start = data.indexOf(`<!--{${comment.toUpperCase()}}-->`);
  const end = data.indexOf(`<!--{/${comment.toUpperCase()}}-->`);

  return data.substring(start, end);
}

module.exports = fetchData; 