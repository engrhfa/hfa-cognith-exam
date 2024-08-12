import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Typography,
  Chip,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import * as apiServices from "../utils/apiServices";
import * as helper from "../utils/helper";

//#region defined styles using mui system
const PokemonCard = styled(Card)({
  backgroundColor: "#0f0f0f",
  maxWidth: 300,
});

const PokemonCardMedia = styled(CardMedia)({
  height: 300,
  width: 300,
  objectFit: "cover",
});

const PokemonHeader = styled(Box)({
  position: "relative",
});

const PokemonTypeChip = styled(Chip)(({ type }) => ({
  margin: "5px",
  backgroundColor: helper.getTypeColor(type),
  fontWeight: 600,
}));

//#endregion

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

  if (!pokemonData) return <Typography>Loading...</Typography>;

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={12} md={6}>
        <PokemonHeader
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <PokemonCard>
            <PokemonCardMedia
              component="img"
              image={pokemonData?.sprites.front_default}
              alt={pokemonData?.name}
            />
            <Box
              position="absolute"
              top={8}
              left={8}
              bgcolor="rgba(0, 0, 0, 0.6)"
              color="#fff"
              backgroundColor={"#323232"}
              p={1}
              borderRadius={5}
            >
              <Typography variant="subtitle1">
                #{formatId(pokemonData?.id)}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              component="div"
              gutterBottom
              color="#fff"
              align="center"
            >
              {pokemonData?.name?.toUpperCase()}
            </Typography>
          </PokemonCard>
        </PokemonHeader>
      </Grid>

      <Grid item xs={12} md={6} sx={{ fontWeight: "400" }}>
        <Paper sx={{ borderRadius: "10px" }}>
          <Box p={2} backgroundColor="#1e1e1e" color="#fff">
            <Box mb={2}>
              <Typography variant="p" component="div">
                POKEMON TYPE
              </Typography>
              {pokemonData?.types.map((type, index) => (
                <PokemonTypeChip
                  key={index}
                  type={type.type.name.toUpperCase()}
                  label={type.type.name.toUpperCase()}
                />
              ))}
            </Box>
            {pokemonData?.stats.map((stat, index) => (
              <PokemonTypeChip
                key={index}
                type={"unknown"}
                label={`${stat.stat.name.toUpperCase()}: ${stat.base_stat}`}
              />
            ))}
            <br />
            <Typography variant="p" component="div" gutterBottom>
              ABILITIES:
            </Typography>
            {pokemonData?.abilities.map((ability, index) => (
              <Typography
                key={index}
                variant="body1"
                component="div"
                sx={{
                  border: "1px solid #fff",
                  padding: "5px 10px",
                  margin: "5px 0px",
                }}
              >
                {ability.ability.name.toUpperCase()}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Pokemon;
