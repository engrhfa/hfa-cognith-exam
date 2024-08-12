import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

const fetchPokemonList = async (limit, offset, search) => {
  try {
    let url = `${BASE_URL}pokemon?limit=${limit}&offset=${offset}`;
    let dataResp;
    if (search !== "") {
      url = `${BASE_URL}pokemon/${search}`;
    }
    dataResp = axios.get(url);
    return dataResp;
  } catch (error) {}
};

const fetchPokemonDetailsByUrl = async (url) => {
  try {
    const dataResp = axios.get(url);
    return dataResp;
  } catch (error) {}
};

const fetchPokemonDetailsById = async (id) => {
  try {
    const dataResp = axios.get(`${BASE_URL}pokemon/${id}`);
    return dataResp;
  } catch (error) {}
};

export { fetchPokemonList, fetchPokemonDetailsByUrl, fetchPokemonDetailsById };
