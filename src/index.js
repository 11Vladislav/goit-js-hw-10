import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetch-countries';
import countriesListTpl from './templates/countries-list.hbs';
import countryInfoTpl from './templates/country-info.hbs';

const DEBOUNCE_DELAY = 300;
