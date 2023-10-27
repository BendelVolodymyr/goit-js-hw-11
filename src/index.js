
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getSearch } from './js/search-api';



const formEl = document.querySelector('#search-form');
const buttonLoadEl = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

let resultPage = 1;

async function onSearc(event) {
    event.preventDefault();
    const formValue = formEl.elements.searchQuery.value;
    if (formValue.length == 0) return alert('Форма не може бути пуста');
    
    await getSearch(formValue, resultPage).then(data => {
        const arrayData = data.data.hits;
        console.log(data)
    if (arrayData.length == 0) return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    Notiflix.Notify.success('Success: Photo found');
    createDomEl(arrayData);
}
)
    .catch(err => Notiflix.Notify.failure(err.message))
    .finally();
   
}
formEl.addEventListener('submit', onSearc);


function createDomEl(arrayData) { 
    resultPage += 1;
  galleryEl.innerHTML = arrayData.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
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
  var lightbox = new SimpleLightbox('.gallery a', {
    sourceAttr: 'href',
    overlayOpacity: 0.4, 
    animationSpeed: 500, 
    captionsData: 'alt', 
    captionPosition: 'bottom', 
    captionDelay: 250, 
});
  
    
}


