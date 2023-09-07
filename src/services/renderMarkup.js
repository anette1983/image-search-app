const gallery = document.querySelector('.gallery');

function renderMarkup(images) {
  const markup = images
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `<a class="gallery__item" href="${largeImageURL}">
          <div class="photo-card">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes</b>${likes}</p>
            <p class="info-item"><b>Views</b>${views}</p>
            <p class="info-item"><b>Comments</b>${comments}</p>
            <p class="info-item"><b>Downloads</b>${downloads}</p>
          </div>
        </div>
      </a>`;
    })
    .join('');
  return gallery.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  document.querySelector('.gallery').innerHTML = '';
  document.querySelector('.load-more').style.display = 'none';
}

export { renderMarkup, clearMarkup };
