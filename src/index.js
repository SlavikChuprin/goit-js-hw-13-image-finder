import './sass/main.scss';
import fetchPicture from './js/apiService';
import picCardsTpl from './templates/picCards.hbs';
import { alert, defaults } from '@pnotify/core';
const _ = require('lodash');
const notFound = "We did not find a picture for this request. Try to change your request:) "
const refs={
    input: document.querySelector('input'),
    picsGallaryMarkUp: document.querySelector('.search-result'),
};
const element = document.getElementById('.my-element-selector');
element.scrollIntoView({
  behavior: 'smooth',
  block: 'end',
});

refs.input.addEventListener('input',_.debounce(onSearch,500));

function onSearch(e) {
    const searchQuery= e.target.value;
    if(searchQuery && searchQuery !== " " ){
    fetchPicture(searchQuery)
    .then((pics)=> renderPicsGalleryList(pics))
    .catch((error)=> console.log( error))
   }
   return 
};

function renderPicsGalleryList(pics){ 
if (pics.total === 0){
    myAlert(notFound, alert)
}
 const list = picCardsTpl(pics.hits);
 refs. picsGallaryMarkUp.innerHTML = list;
};

function myAlert(text, type) {
     refs.picsGallaryMarkUp.innerHTML='';
alert({
  text,
  type,
});};
defaults.mode = 'dark';
defaults.hide= true;
defaults.delay= 3000;

