 export function fetchCountries(name) { // эскпортируем фукцию для использования в других файлах
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`; // получаем данные по названию страны из сервера
  return fetch(url).then(response => { // возвращаем обещание
    if (response.status !== 200) { // если ответ не 200, то выбрасываем ошибку
      throw new Error(response.status); // выбрасываем ошибку
    }
    return response.json(); // возвращаем обещание с данными
  }
  );
}