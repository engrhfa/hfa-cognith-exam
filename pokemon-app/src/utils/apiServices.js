import axios from 'axios';

const BASE_URL = 'https://pokeapi.co/api/v2/';

const fetchPokemonList = (limit, offset) => {
  const dataResp = axios.get(`${BASE_URL}pokemon?limit=${limit}&offset=${offset}`);
  return dataResp;
};

const fetchPokemonDetails = (url) => {
  const dataResp = axios.get(url);
  return dataResp;
};

export {
    fetchPokemonList,
    fetchPokemonDetails
};
