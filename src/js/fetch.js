import axios from 'axios';

const apiKey = '37257084-385968b29bb2898cd9ae06014';

async function searchImages(query, currentPage) {
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export { searchImages };
