import { React, useEffect, useState } from "react";
import {
  TextField,
  ImageListItem,
  ListSubheader,
  ImageList,
} from "@mui/material";
import * as apiServices from "../utils/apiServices";
import Card from "../components/PokemonCard";

const Pokedex = () => {
  const [pokedexList, setPokedexList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPokemonList = async (newOffset) => {
    try {
      setLoading(true);
      const response = await apiServices.fetchPokemonList(20, newOffset);
      const newPokemon = response.data.results;

      setPokedexList((prevList) => [...prevList, ...newPokemon]);
      setOffset(newOffset + 20);

      // Check if there are more Pokémon to load
      if (newPokemon.length < 20) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonList(offset);
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500 &&
      !loading &&
      hasMore
    ) {
      fetchPokemonList(offset);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, loading, hasMore]);

  return (
    <ImageList sx={{ width: "80%", height: "80%", backgroundColor: "#0f0f0f" }}>
      <ImageListItem
        key="Subheader"
        cols={4}
        sx={{ backgroundColor: "#0f0f0f" }}
      >
        <ListSubheader sx={{ backgroundColor: "#0f0f0f" }} component="div">
          <TextField
            sx={{ width: "50%", backgroundColor: "#1e1e1e" }}
            id="outlined-basic"
            label="Search your pokemon here"
            variant="outlined"
          />
        </ListSubheader>
      </ImageListItem>
      {pokedexList.map((item, index) => (
        <Card key={index} item={item} />
        // <ImageListItem key={item.img}>
        //   <img
        //     srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        //     src={`${item.img}?w=248&fit=crop&auto=format`}
        //     alt={item.title}
        //     loading="lazy"
        //   />
        //   <ImageListItemBar
        //     title={item.title}
        //     subtitle={item.author}
        //     actionIcon={
        //       <IconButton
        //         sx={{ color: "rgba(255, 255, 255, 0.54)" }}
        //         aria-label={`info about ${item.title}`}
        //       >
        //         <InfoIcon />
        //       </IconButton>
        //     }
        //   />
        // </ImageListItem>
      ))}
      {loading && <div>Loading more Pokémon...</div>}
      {!hasMore && <div>No more Pokémon to load.</div>}
    </ImageList>
  );
};

export default Pokedex;
