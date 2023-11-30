import axios from 'axios';

const apiKey = '39198737-e441a494d9c878a4c9c462200';


const fetchImages = async (query, page, perPage) => {
  return await axios.get(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`)
  
};

export { fetchImages };
