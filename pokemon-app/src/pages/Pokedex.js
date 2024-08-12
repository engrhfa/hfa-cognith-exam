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

  //#region function and hooks
  const fetchPokemonList = async (
    search,
    newOffset = 0,
    initialLoad = false
  ) => {
    try {
      setLoading(true);
      console.log('search', search);
      const response = await apiServices.fetchPokemonList(
        20,
        newOffset,
        search
      ); 
      const newPokemon = response.data.results;
      console.log('newPokemon', newPokemon)
      if (initialLoad) {
        setPokedexList(newPokemon);
      } else {
        setPokedexList((prevList) => [...prevList, ...newPokemon]);
      }

      setOffset(newOffset + 20);

      if (newPokemon?.length < 20) {
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
      console.log('query', query)
      setOffset(0); // Reset offset for new search
      setHasMore(true); // Reset hasMore for new search
      fetchPokemonList(query, 0, true);
    }, 200),
    []
  );

  useEffect(() => {
    if (searchTerm) {
      debouncedFetch(searchTerm);
    } else {
      // If searchTerm is empty, load initial data
      if (initialLoad) {
        fetchPokemonList("", 0, true);
        setInitialLoad(false);
      }
    }
  }, [searchTerm, initialLoad, debouncedFetch]);

  // Infinite scroll handler
  const handleScroll = useCallback(
    debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 500 &&
        !loading &&
        hasMore
      ) {
        fetchPokemonList(searchTerm, offset);
      }
    }, 200),
    [offset, loading, hasMore, searchTerm]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // const fetchPokemonList = async (search = "", newOffset, initialLoad = false) => {
  //   try {
  //     setLoading(true);
  //     const response = await apiServices.fetchPokemonList(20, newOffset, search);
  //     const newPokemon = response.data.results;

  //     if (initialLoad) {
  //       setPokedexList(newPokemon);
  //     } else {
  //       setPokedexList((prevList) => [...prevList, ...newPokemon]);
  //     }

  //     setOffset(newOffset + 20);

  //     if (newPokemon.length < 20) {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching Pokémon:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // Debounced search function
  // const debouncedFetch = useCallback(
  //   debounce((query) => {
  //     setOffset(0); // Reset offset for new search
  //     setHasMore(true); // Reset hasMore for new search
  //     fetchPokemonList(query, 0, true);
  //   }, 300),
  //   []
  // );

  // useEffect(() => {
  //   if (initialLoad) {
  //     fetchPokemonList(0, true);
  //     setInitialLoad(false);
  //   } else if (searchTerm) {
  //     debouncedFetch(searchTerm);
  //   }
  // }, [searchTerm, initialLoad, debouncedFetch]);

  // const handleScroll = debounce(() => {
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop >=
  //       document.documentElement.offsetHeight - 500 &&
  //     !loading &&
  //     hasMore
  //   ) {
  //     fetchPokemonList(offset);
  //   }
  // }, 200);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [offset, loading, hasMore]);

  // const handleSearchChange = (event) => {
  //   setSearchTerm(event.target.value);
  //   if (event.target.value === "") {
  //     setPokedexList([]);
  //     setHasMore(true);
  //   }
  // };

  //#endregion

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "#0f0f0f", padding: 2 }}
    >
      <Grid
        item
        xs={12}
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          mb: 2,
          textAlign: "center",
        }}
      >
        <ListSubheader
          sx={{ backgroundColor: "#0f0f0f", width: "100%" }}
          component="div"
        >
          <TextField
            sx={{
              width: "80%",
              backgroundColor: "#1e1e1e",
              borderRadius: 10,
              "& .MuiInputLabel-root": { color: "#fff", fontWeight: "bold" },
              "& .MuiInputBase-input": { color: "#fff" },
            }}
            id="outlined-basic"
            label="Search your Pokémon here"
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
        {pokedexList?.length > 0 ? pokedexList?.map((item, index) => (
          <Grid
            item
            xs={6} // 2 columns on mobile
            sm={4} // 3 columns on small screens
            md={3} // 4 columns on medium screens
            lg={2} // 5 columns on large screens
            key={index}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <PokemonCard key={index} item={item} />
          </Grid>
        )) : 
        <div style={{ color: "#fff", textAlign: "center", width: "100%" }}>
          <br/>
          No Pokémon found.
        </div>
        }
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
