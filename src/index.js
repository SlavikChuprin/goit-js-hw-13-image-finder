import './sass/main.scss';
import fetchCountries from './js/fetchCountries';
import countriesListTpl from './templates/countriesList.hbs';
import countryInfoTpl from './templates/countryInfo.hbs';
import { alert, defaults } from '@pnotify/core';
const _ = require('lodash');
const textErrorManyCountries = 'Too many matches found. Please enter a more specific query!';
const textErrorNoFound = 'Сheck the correctness of entered query';
const refs={
    input: document.querySelector('.input'),
    countriesMarkUp: document.querySelector('.countries-result'),
};


refs.input.addEventListener('input',_.debounce(onSearch,500))

function onSearch(e) {
    const searchQuery= e.target.value;
    fetchCountries(searchQuery)
    .then((countries)=> {
        console.log(countries);
        if (countries.status === 404){
            myAlert(textErrorNoFound, 'error');
            return;
        }
        if(countries.length < 10){
          renderCountriesList(countries);
        }  else  {
           myAlert(textErrorManyCountries,'notice'); 
        }  
    })
    .catch((error)=> console.log("это лог ошибки", error));     
};

function renderCountriesList(countries){
    if(countries.length ===1){
 const list= countryInfoTpl(...countries);
 refs.countriesMarkUp.innerHTML =list;
    } else {
     const list= countriesListTpl(countries);
     refs.countriesMarkUp.innerHTML =list;
 };
};

function myAlert(text, type) {
     refs.countriesMarkUp.innerHTML='';
alert({
  text,
  type,
});};
defaults.mode = 'light';
defaults.hide= true;
defaults.delay= 3000;


