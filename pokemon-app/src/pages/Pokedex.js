import React, { useEffect, useState, useCallback } from "react";
import { TextField, Grid, ListSubheader } from "@mui/material";
import * as apiServices from "../utils/apiServices";
import PokemonCard from "../components/PokemonCard";
import debounce from "lodash.debounce";

const Pokedex = () => {
  const [pokedexList, setPokedexList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchPokemonList = async (newOffset, initialLoad = false) => {
    try {
      setLoading(true);
      const response = await apiServices.fetchPokemonList(20, newOffset);
      const newPokemon = response.data.results;

      if (initialLoad) {
        setPokedexList(newPokemon);
      } else {
        setPokedexList((prevList) => [...prevList, ...newPokemon]);
      }

      setOffset(newOffset + 20);

      if (newPokemon.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };



  // Debounced search function
  const debouncedFetch = useCallback(
    debounce((query) => {
      setInitialLoad(true);
      setOffset(0); // Reset offset for new search
      fetchPokemonList(0, true);
    }, 300),
    []
  );


  useEffect(() => {
    if(initialLoad){
      fetchPokemonList(0, true);
      setInitialLoad(false);
    }else if(searchTerm){
      debouncedFetch(searchTerm);
    }
  }, [searchTerm, initialLoad, debouncedFetch]);

  const handleScroll = debounce(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
      !loading &&
      hasMore
    ) {
      fetchPokemonList(offset);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, loading, hasMore]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setPokedexList([]);
      setHasMore(true);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "#0f0f0f", padding: 2 }}
    >
      <Grid item xs={12} sx={{ width: "100%", maxWidth: "1200px" }}>
        <ListSubheader sx={{ backgroundColor: "#0f0f0f" }} component="div">
          <TextField
            sx={{ width: "50%", backgroundColor: "#1e1e1e" }}
            id="outlined-basic"
            label="Search your pokemon here"
            variant="outlined"
            onChange={handleSearchChange}
            value={searchTerm}
          />
        </ListSubheader>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ width: "100%", maxWidth: "1200px" }}
      >
        {pokedexList.map((item, index) => (
          <Grid
            item
            xs={1.5}
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <PokemonCard item={item} />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <div style={{ color: "#fff", textAlign: "center", width: "100%" }}>
          Loading more Pokémon...
        </div>
      )}
      {!hasMore && (
        <div style={{ color: "#fff", textAlign: "center", width: "100%" }}>
          No more Pokémon to load.
        </div>
      )}
    </Grid>
  );
};

export default Pokedex;
