
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getSearch } from './js/search-api';



const formEl = document.querySelector('#search-form');
const buttonLoadEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

let resultPage = 1;
let formValue = '';
let createNewDomEl = '';
let arrayDataLength = 0;
let totalHits = 0;

 var lightbox = new SimpleLightbox('.gallery a', {
    sourceAttr: 'href',
    overlayOpacity: 0.4, 
    animationSpeed: 500, 
    captionsData: 'alt', 
    captionPosition: 'bottom', 
    captionDelay: 250, 
  });

async function onSearc(event) {
    event.preventDefault();
     formValue = formEl.elements.searchQuery.value;
    if (formValue.length == 0) return alert('Форма не може бути пуста');
  resultPage = 1;
  arrayDataLength = 0;
  totalHits = 0;
    await getSearch(formValue, resultPage).then(data => {
      const arrayData = data.data.hits;
      arrayDataLength += arrayData.length;
      totalHits = data.data.totalHits;
    if (arrayData.length == 0) return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      createDomEl(arrayData);
      if (arrayDataLength >= totalHits) {
        buttonLoadEl.classList.add('is-hidden');
         Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      } else {
      buttonLoadEl.classList.remove('is-hidden');
      }
        
}
)
    .catch(err => Notiflix.Notify.failure(err.message))
    .finally();
   
}
formEl.addEventListener('submit', onSearc);
buttonLoadEl.addEventListener('click', onLoader);



function test(arrayData) {
 return arrayData.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<div class="photo-card">
        <a class="gallery__link" href="${largeImageURL}"  ><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>likes:${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${downloads}</b>
    </p>
  </div>
</div>`).join('');
}

function createDomEl(arrayData) { 
  createNewDomEl = test(arrayData);
  galleryEl.innerHTML = test(arrayData);
  lightbox.refresh();  
}

async function onLoader() {
    resultPage += 1;
    await getSearch(formValue, resultPage).then(data => {
      const arrayData = data.data.hits;
      arrayDataLength += arrayData.length;
      createNewDomEl += test(arrayData);
      galleryEl.innerHTML = createNewDomEl;
      lightbox.refresh();
      if (arrayDataLength >= totalHits) {
        buttonLoadEl.classList.add('is-hidden');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
      } 
    })
}


