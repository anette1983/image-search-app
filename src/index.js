import {
  fetchImages,
  page,
  incrementPage,
  resetPage,
} from './services/fetchImages';
import {renderMarkup, clearMarkup} from './services/renderMarkup';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';



const searchForm = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let searchQuery = '';

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

loadMoreBtn.style.display = 'none';

async function onSearchSubmit(evt) {
  evt.preventDefault();
  clearMarkup();
  const form = evt.currentTarget;
  searchQuery = form.elements.searchQuery.value.trim();
  

  if (!searchQuery) {
    clearMarkup();
    return Notify.failure('Please, fill the search field');
  }
  try {
    resetPage();
    const res = await fetchImages(searchQuery);
    const totalPage = res.data.totalHits;
    if (totalPage === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      clearMarkup();
      return;
    }
    
    renderMarkup(res.data.hits);
    Notify.success(`Hooray! We found ${totalPage} images.`);
    refreshSimpleLightBox();
    loadMoreBtn.style.display = 'inline-block';
    if (res.data.hits.length < 40) {
      onCollectionEnd();
    }
    
  } catch (error) {
    console.log(error);
    Notify.failure('Something went wrong!');
  }
  searchForm.reset();
}

async function onLoadMoreClick() {
  incrementPage();
  console.log(page);

  try {

    const res = await fetchImages(searchQuery);
    renderMarkup(res.data.hits);
    refreshSimpleLightBox();
    loadMoreBtn.style.display = 'inline-block';
    onScroll();

    if (res.data.hits.length < 40) {
      onCollectionEnd();
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.status);
    if (error.response.status = 400) {
      onCollectionEnd();
    } else {
      console.log(error);
      Notify.failure('Something went wrong!');
    }
  }
}


function refreshSimpleLightBox() {
  new SimpleLightbox('.gallery a', {
    // captions: 'true',
    // captionsData: 'alt',
    captionDelay: 250,
    // nav: true,
    // navText: ['←','→'],
  }).refresh();
}

function onCollectionEnd() {
  Notify.info("We're sorry, but you've reached the end of search results.", {
    showOnlyTheLastOne: true,
    cssAnimationDuration: 1000,
  });
  loadMoreBtn.style.display = 'none';
}

function onScroll() {
  const { height: cardHeight} = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}



// async function onSuccessfulFetch() {
// const res = await fetchImages(searchQuery);
// renderMarkup(res.data.hits);
// refreshSimpleLightBox();
// loadMoreBtn.style.display = 'inline-block';
// onScroll();
// return res;
// }
