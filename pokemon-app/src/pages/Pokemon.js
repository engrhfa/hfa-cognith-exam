import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as apiServices from "../utils/apiServices";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

const Pokemon = () => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await apiServices.fetchPokemonDetailsById(id);
        setPokemonData(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
      }
    };

    fetchPokemonData();
  }, [id]);

  const formatId = (id) => id?.toString().padStart(4, "0");

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12} md={6}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          position="relative"
        >
          <Card sx={{ backgroundColor: "#0f0f0f", maxWidth: 300 }}>
            <CardMedia
              component="img"
              image={pokemonData?.sprites.front_default}
              alt={pokemonData?.name}
              sx={{ height: 300, width: 300, objectFit: "cover" }}
            />
            <Box
              position="absolute"
              top={8}
              left={8}
              bgcolor="rgba(0, 0, 0, 0.6)"
              color="#fff"
              p={1}
              borderRadius={1}
            >
              <Typography variant="subtitle1">
                #{formatId(pokemonData?.id)}
              </Typography>
            </Box>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ backgroundColor: "#1e1e1e", height: "100%" }}>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              {pokemonData?.name}
            </Typography>
            <Typography variant="h6" component="div" gutterBottom>
              Abilities:
            </Typography>
            {pokemonData?.abilities.map((ability, index) => (
              <Typography key={index} variant="body1" component="div">
                {ability.ability.name}
              </Typography>
            ))}
            <Typography variant="h6" component="div" gutterBottom>
              Types:
            </Typography>
            {pokemonData?.types.map((type, index) => (
              <Typography key={index} variant="body1" component="div">
                {type.type.name}
              </Typography>
            ))}
            <Typography variant="h6" component="div" gutterBottom>
              Stats:
            </Typography>
            {pokemonData?.stats.map((stat, index) => (
              <Typography key={index} variant="body1" component="div">
                {stat.stat.name}: {stat.base_stat}
              </Typography>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Pokemon;
