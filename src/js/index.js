import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { searchImages } from './fetch.js';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';
let totalHits = null;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: "alt",
  captionDelay: 250,
  disableScroll: false
});

// Основні функції
function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
}

function showNoResultsMessage() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function scrollToNextGroup() {
  const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

hideLoadMoreButton();

async function renderImages(images) {
  const imageCards = images.map(image => createImageCard(image));
  gallery. insertAdjacentHTML("beforeend", imageCards.join(""));
  lightbox.refresh();
  scrollToNextGroup();
}

function createImageCard(image) {
  return`
      <div class="photo-card">  
        <a class="gallery__link" href="${image.largeImageURL}" data-lightbox="gallery">
          <img class="picture gallery__image" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item"> <span><b>Likes:</b></span><span>${image.likes}</span></p>
          <p class="info-item"><span><b>Views:</b></span><span>${image.views}</span></p>
          <p class="info-item"><span><b>Comments:</b></span><span>${image.comments}</span></p>
          <p class="info-item"><span><b>Downloads:</b></span><span>${image.downloads}</span></p>
        </div>
      </div>
    `;
}

async function loadMoreImages() {
  currentPage += 1;
  const data = await searchImages(currentQuery, currentPage);
  if (data && data.hits.length < 0) {
    showNoResultsMessage();
    return;
  }
  renderImages(data.hits);
  totalHits = data.totalHits;
  if (totalHits <= currentPage * 40) {
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
}

searchForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value.trim();
  if (searchQuery === '') return;
  currentQuery = searchQuery;
  currentPage = 1;
  clearGallery();

  const data = await searchImages(searchQuery, currentPage);
  if (data && data.hits.length > 0) {
    renderImages(data.hits);
    totalHits = data.totalHits;
    if (totalHits <= currentPage * 40) {
      hideLoadMoreButton();
    } else {
      showLoadMoreButton();
    }
  } else {
    showNoResultsMessage();
  }
});

loadMoreButton.addEventListener('click', loadMoreImages);
