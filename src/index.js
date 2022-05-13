import './css/styles.css'; // подключаем стили
import debounce from 'lodash.debounce';  // подключаем библиотеку для обработки ожидания ввода
import Notiflix from 'notiflix';  // подключаем библиотеку для обработки нотификаций
import { fetchCountries } from './js/fetch-countries';  // подключаем функцию для получения стран

const DEBOUNCE_DELAY = 300; // задержка для обработки ожидания ввода
const refs = {  // создаем объект с обращениями к элементам
  searchBox: document.querySelector('#search-box'),  // обращение к полю ввода
  countriesList: document.querySelector('.country-list'), // обращение к списку стран
  countryInfo: document.querySelector('.country-info'),  // обращение к информации о стране
};

refs.searchBox.addEventListener('input', debounce(handleSearch, DEBOUNCE_DELAY));  // подключаем обработчик ожидания ввода

function clearData() {  // функция для очистки данных
  refs.countriesList.innerHTML = '';  // очищаем список стран
  refs.countryInfo.innerHTML = '';  // очищаем информацию о стране
}

function handleSearch(event) { // функция для обработки ожидания ввода
  const inputValue = event.target.value.trim();  // получаем значение из поля ввода
  if (inputValue === '') {  // если поле пустое, то очищаем данные
    clearData(); // очищаем данные
    return; // выходим из функции
  }
  fetchCountries(inputValue) // получаем данные по названию страны из сервера
    .then(countries => {  // получаем данные по названию страны из сервера и присваиваем переменной countries
      if (countries.length > 10) { // если количество стран больше 10, то выводим ошибку
        clearData(); // очищаем данные
        Notiflix.Notify.info('Too many matches found. Please enter a more specific query!'); // выводим ошибку
        return; // выходим из функции
      }
      else if (countries.length === 1) { // если количество стран равно 1, то выводим информацию о стране
        clearData(); // очищаем данные
        renderCountry(countries[0]); // выводим информацию о стране
        return;  // выходим из функции
      }
        renderCountries(countries);  // выводим список стран
      
    })
    .catch(error => {  // получаем ошибку из сервера
      clearData();  // очищаем данные
      Notiflix.Notify.failure('Oops, there is no country with that name!'); // выводим ошибку
    }
    );
}

let country = null; // переменная для хранения информации о стране

function renderCountry(country) { // функция для отрисовки информации о стране
  refs.countryInfo.innerHTML = ` 
      <div class="info-title">
        <img src = "${country.flags.svg}" alt = Flag of"${country.name.official} class = "flag" ">
        <h1>${country.name.official}</h1>
        <p><span>Capital:</span> ${country.capital}</p>
        <p><span>Population:</span> ${country.population}</p>
        <p><span>Language:</span> ${Object.values(country.languages).join(', ')}</p> 
        </div>`; 
} 

function renderCountries(countries) {  // функция для отрисовки списка стран
  clearData();  // очищаем данные
  countries.map(country => {  // перебираем массив стран
    const countryItem = `
      <li>
        <img src = "${country.flags.svg}" alt = Flag of"${country.name.official} ">
        <span>${country.name.official}</span>
      </li>`; 
    refs.countriesList.insertAdjacentHTML('beforeend', countryItem); // вставляем страну в список
  }
);}
