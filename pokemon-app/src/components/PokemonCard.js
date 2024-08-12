import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import * as apiServices from "../utils/apiServices";
import {
  Card,
  Button,
  CardHeader,
  CardMedia,
  CardActions,
  Typography,
} from "@mui/material";

const PokemonCard = (props) => {
  const [pokemonData, setPokemonData] = useState(null);
  const navigate = useNavigate();

  async function fetchPokemonData() {
    try {
      const pokemonDataResp = await apiServices.fetchPokemonDetailsByUrl(
        props.item.url
      );
      setPokemonData({
        id: pokemonDataResp.data.id,
        name: pokemonDataResp.data.name,
        types: pokemonDataResp.data.types.map((item) => item),
        image: pokemonDataResp.data.sprites.front_default,
        number: pokemonDataResp.data.order,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const handleClick = () => {
    if (pokemonData) {
      navigate(`/pokemon/${pokemonData?.id}`);
    }
  };

  const formatId = (id) => id?.toString().padStart(4, "0");

  return (
    <Card
      sx={{ width: 400, backgroundColor: "#1e1e1e" }}
      onClick={handleClick}
    >
      <CardHeader title={`#${formatId(pokemonData?.id)}`} />
      <div style={{ position: "relative", paddingTop: "100%" }}>
        <CardMedia
          component="img"
          image={pokemonData?.image}
          alt="Pokemon_img"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ textAlign: "center", color: "#fff" }}
      >
        {pokemonData?.name}
      </Typography>
      <CardActions disableSpacing>
        {pokemonData?.types?.map((item, index) => (
          <Button
            variant="outlined"
            key={index}
            sx={{
              backgroundColor: "#9ba0ac",
              border: "none",
              margin: "2px",
              color: "#000",
            }}
          >
            {item?.type?.name}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
