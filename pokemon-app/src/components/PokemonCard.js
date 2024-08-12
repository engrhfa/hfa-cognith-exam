import { React, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import * as apiServices from "../utils/apiServices";
import {
  Card,
  Button,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";

const PokemonCard = (props) => {
  console.log("props", props);
  const [pokemonData, setPokemonData] = useState(null);

  async function fectchPokemonData() {
    try {
      const pokemonDataResp = await apiServices.fetchPokemonDetails(
        props.item.url
      );
      setPokemonData({
        name: pokemonDataResp.data.name,
        types: pokemonDataResp.data.types.map((item) => item),
        image: pokemonDataResp.data.sprites.front_default,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fectchPokemonData();
  }, []);

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#1e1e1e" }}>
      <CardHeader title="pokemon_number" />
      <CardMedia
        component="img"
        height="195"
        width="195 !important"
        image={pokemonData?.image}
        alt="Pokemon_img"
      />
      <Typography gutterBottom variant="h5" component="div">
        {pokemonData?.name}
      </Typography>
      <CardActions disableSpacing>
        {pokemonData?.types?.map((item, index) => (
          <Button variant="outlined" key={index} sx={{backgroundColor: "#9ba0ac", border: "none", margin: "2"}}>
            {item?.type?.name}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
