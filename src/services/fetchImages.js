import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33296803-7dbc062ad7f8de8fe89eadd9d';
let page = 1;
const perPage = 40;

// const options = {
//   params: {
//     image_type: "photo",
//     orientation: "horizontal",
//     safesearch: "true",
//     per_page: 40,
//   },
// }

const options = `image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}`;

async function fetchImages(searchQuery) {
  const response = axios.get(
    `${BASE_URL}/?key=${API_KEY}&q=${searchQuery}&${options}&page=${page}`
  );
  return await response;
}

function incrementPage() {
  page += 1;
}

function resetPage() {
  page = 1;
}


export { fetchImages, page, incrementPage, resetPage};

