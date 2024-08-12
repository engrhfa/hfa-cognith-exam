import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

const fetchPokemonList = async (limit = 20, offset = 0, search = "") => {
  try {
    let url = `${BASE_URL}pokemon?limit=${limit}&offset=${offset}`;

    if (search) {
      url = `${BASE_URL}pokemon/${search.toLowerCase()}`;
    }

    const response = await axios.get(url);

    if (search) {
      return { data: { results: [response.data] } };
    }

    return response;
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
    return null;
  }
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
