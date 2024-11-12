import axios from 'axios';

const movieDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '56cd014ebfeb7c912d6cbc248a0775de',
    language: 'es-ES',
  },
});
export default movieDB;
