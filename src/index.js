import './sass/main.scss';
import NewsApiService from './js/apiService';
import picCardsTpl from './templates/picCards.hbs';
import { alert, defaults, Stack } from '@pnotify/core';
const _ = require('lodash');
import LoadMoreBtn from './js/components/load-more-btn';
defaults.mode = 'dark';
defaults.hide= true;
defaults.delay= 3000;
const notFound = "We did not find a picture for this request. Try to change your request:) "
const refs={
    input: document.querySelector('input'),
    picsGallaryMarkUp: document.querySelector('.search-result'),
};
const newsApiService = new NewsApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});



refs.input.addEventListener('input',_.debounce(onSearch,500));
loadMoreBtn.refs.button.addEventListener('click', fetchPictures);

function onSearch(e) {
     newsApiService.searchQuery= e.target.value;
    if(!newsApiService.searchQuery || newsApiService.searchQuery === ' ') {
        clearArticlesContainer();
        loadMoreBtn.hide();
        return ;
    }
    loadMoreBtn.show();
    newsApiService.resetPage();
    clearArticlesContainer();
    fetchPictures(); 
    scrollAfterRender();
    
};

function fetchPictures() {
  loadMoreBtn.disable();
  newsApiService.fetchPictures()
  .then((pics)=> {  
    if (pics.total === 0) {
    myAlert(notFound, 'info')
  }
  else if (pics.total <= 12 ){

     loadMoreBtn.hide();
     
  } 

   appendPicsGalleryMarkup(pics);
    loadMoreBtn.enable();
    scrollAfterRender ();
  })
}

function appendPicsGalleryMarkup(pics) {
  refs.picsGallaryMarkUp.insertAdjacentHTML('beforeend', picCardsTpl(pics.hits));
};

function clearArticlesContainer() {
  refs.picsGallaryMarkUp.innerHTML = '';
};

function scrollAfterRender () {
    const element = document.getElementById('button');
    element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
});
} 

function myAlert(text, type) {
     refs.picsGallaryMarkUp.innerHTML='';
alert({
  text,
  type,
});};