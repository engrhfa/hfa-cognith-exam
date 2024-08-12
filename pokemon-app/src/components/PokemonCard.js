import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import * as apiServices from "../utils/apiServices";
import {
  Card,
  CardMedia,
  CardActions,
  Typography,
  Chip,
} from "@mui/material";
import * as helper from "../utils/helper";

const PokemonTypeChip = styled(Chip)(({ type }) => ({
  margin: "5px 0px",
  backgroundColor: helper.getTypeColor(type),
  fontWeight: 600,
  color: "#fff",
}));

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
    <Card sx={{ width: 500, backgroundColor: "#1e1e1e" }} onClick={handleClick}>
      <PokemonTypeChip
        key={pokemonData?.id}
        type="unknown"
        label={`#${formatId(pokemonData?.id)}`}
      />
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
        variant="p"
        component="div"
        sx={{ textAlign: "center", color: "#fff", fontWeight: "bold" }}
      >
        {pokemonData?.name.toUpperCase()}
      </Typography>
      <CardActions disableSpacing>
        {pokemonData?.types?.map((item, index) => (
          <PokemonTypeChip
            key={index}
            type={item.type.name.toUpperCase()}
            label={item.type.name.toUpperCase()}
          />
        ))}
      </CardActions>
    </Card>
  );
};

export default PokemonCard;
