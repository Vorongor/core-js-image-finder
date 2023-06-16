import Notiflix from 'notiflix';
import axios from 'axios';
// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
const apiKey = '37257084-385968b29bb2898cd9ae06014';

const searchForm = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
let currentPage = 1;
let currentQuery = '';
let totalHits = null;


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

function initializeLightbox() {
    const ligthbox = new SimpleLightbox('.gallery a', {
    });
  }

function scrollToNextGroup() {
  const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  
}

hideLoadMoreButton();

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const searchQuery = e.target.elements.searchQuery.value.trim();
  if (searchQuery === '') return;
  currentQuery = searchQuery;
  currentPage = 1;
  clearGallery();
  searchImages(searchQuery);
  showLoadMoreButton();
  });

loadMoreButton.addEventListener('click', function () {
  currentPage += 1;
  searchImages(currentQuery);
});

async function searchImages(query) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    if (data.hits.length > 0) {
      renderImages(data.hits);
      totalHits = data.totalHits;
    //   if (currentPage = 1) {
    //     console.log(`Hooray! We found ${totalHits} images.`)
    //   }
        if (totalHits <= currentPage * 40) {
        hideLoadMoreButton();
      } else {
        showLoadMoreButton();
      }
    } else {
      showNoResultsMessage();
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
function renderImages(images) {
  const galleryFragment = document.createDocumentFragment();
  images.forEach(image => {
    const card = createImageCard(image);
    galleryFragment.appendChild(card);
  });
  gallery.appendChild(galleryFragment);
  initializeLightbox();
  scrollToNextGroup();
}

function createImageCard(image) {
  const card = document.createElement('div');
  card.innerHTML = `
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
  return card;
}
