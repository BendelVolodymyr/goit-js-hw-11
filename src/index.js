
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getSearch } from './js/search-api';

const formEl = document.querySelector('#search-form');
const buttonLoadEl = document.querySelector('.load-more');
console.log(buttonLoadEl)


getSearch();

