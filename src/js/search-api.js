import axios, { Axios } from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40252530-8571e952a05bfbe082a85c49d';

export async function getSearch(searchValue, pageNew,) {
const params = new URLSearchParams({
    key: API_KEY,
    q: 'cat',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: pageNew,
    per_page: 40,
})
    
    try {
        await axios.get(`${BASE_URL}?${params}`)
        .then(response => {
            console.log(response);
        })
    } catch (err) {
        console.log(err);
    }
     
}