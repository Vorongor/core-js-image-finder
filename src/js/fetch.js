const axios = require('axios/dist/node/axios.cjs');
const Notiflix = require('notiflix');

const API_KEY = '37257084-385968b29bb2898cd9ae06014';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');
const subBnt = searchForm.querySelector('button');

// async function searchImages(searchQuery) {
//     const apiKey = API_KEY; 
//     try {
//       const response = await axios.get('https://pixabay.com/api/', {
//         params: {
//           key: apiKey,
//           q: searchQuery,
//           image_type: 'photo',
//           orientation: 'horizontal',
//           safesearch: true
//         }
//       });
  
//       const images = response.data.hits;
  
//       if (images.length === 0) {
//         Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//       } else {
//         for (const image of images) {
//           const {
//             webformatURL,
//             largeImageURL,
//             tags,
//             likes,
//             views,
//             comments,
//             downloads
//           } = image;
  
//           // Використовуй отримані дані зображення за своїми потребами
//           console.log('webformatURL:', webformatURL);
//           console.log('largeImageURL:', largeImageURL);
//           console.log('tags:', tags);
//           console.log('likes:', likes);
//           console.log('views:', views);
//           console.log('comments:', comments);
//           console.log('downloads:', downloads);
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
//     }
//   }
  
  // Обробник події submit для форми
  subBnt.addEventListener('submit', (event) => {
    event.preventDefault();  
    // const searchQuery = searchInput.value;
    // console.log(searchQuery);
    // if (searchQuery !== '') {
    //   searchImages(searchQuery);
    // }
  });