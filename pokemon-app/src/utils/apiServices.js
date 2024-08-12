import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchPokemonList = (limit, offset) => {
  const dataResp = axios.get(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
  return dataResp;
};

const fetchPokemonDetailsByUrl = (url) => {
  const dataResp = axios.get(url);
  return dataResp;
};

const fetchPokemonDetailsById = (id) => {
  const dataResp = axios.get(`${BASE_URL}pokemon/${id}`);
  return dataResp;
};

export {
    fetchPokemonList,
    fetchPokemonDetailsByUrl,
    fetchPokemonDetailsById
};
