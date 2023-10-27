
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getSearch } from './js/search-api';



const formEl = document.querySelector('#search-form');
const buttonLoadEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

let resultPage = 0;

function onSearc(event) {
    event.preventDefault();
    
    console.log(event)
    const formValue = formEl.elements.searchQuery.value;
    if (formValue.length == 0) return alert('Форма не може бути пуста');
    resultPage += 1;
    getSearch(formValue, resultPage).then(data => {
    const arrayData = data.data.hits;
    if (arrayData.length == 0) return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    Notiflix.Notify.success('true');
    return createDomEl(arrayData);
}
)
    .catch(err => Notiflix.Notify.failure(err.message))
    .finally();
   
}
formEl.addEventListener('submit', onSearc);


function createDomEl(arrayData) { 
    
    return galleryEl.innerHTML = arrayData.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
    `<div class="photo-card">
 <a href="${largeImageURL}" class="gallery__link"  ><img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
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

var lightbox = new SimpleLightbox('.gallery.photo-card a', {
    sourceAttr: 'href', // завантаження файла з ...
    overlayOpacity: 0.4, // прозорість фону
    animationSpeed: 500, // Анімація перемикання слайдів (швидкість)
    captionsData: 'alt', // додаємо з опису
    captionPosition: 'bottom', // позиція
    captionDelay: 250, // затримка опису '250 ms'
});


