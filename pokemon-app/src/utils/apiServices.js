import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2/";

const fetchPokemonList = async (limit = 20, offset = 0, search = "") => {
  try {
    let url = `${BASE_URL}pokemon?limit=${limit}&offset=${offset}`;

    // If there's a search term, adjust the URL to search for a specific Pokémon
    if (search) {
      url = `${BASE_URL}pokemon/${search.toLowerCase()}`;
    }

    const response = await axios.get(url);

    if (search) {
      // If searching by name or number, wrap the result in an array to match the expected format
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
