const getTypeColor = (type) => {
  const typeColors = {
    fire: "#fcb040",
    water: "#4a90d9",
    grass: "#7ac74c",
    electric: "#f2d94e",
    ice: "#aaf3f5",
    fighting: "#eb6c2b",
    poison: "#a040a1",
    ground: "#e1c68c",
    flying: "#a2b7e8",
    psychic: "#f86c6b",
    bug: "#a8b820",
    rock: "#b5a476",
    ghost: "#735797",
    dragon: "#6c5cdd",
    dark: "#6e6e6e",
    steel: "#9ab1b1",
    fairy: "#f4b3f4",
    normal: "#a8a878",
    unknown: "#a8a878",
  };
  return typeColors[type.toLowerCase()] || "#ccc";
};

export { getTypeColor };
