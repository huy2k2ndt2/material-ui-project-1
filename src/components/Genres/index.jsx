import { Chip, Stack } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY } from "../../contants";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Genres = ({ type, selectedGenres, setSelectedGenres }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    let isMount = true;
    const fetchGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
      );
      if (isMount) setGenres(data.genres);
    };

    fetchGenres();

    return () => {
      isMount = false;
    };
    // eslint-disable-next-line
  }, []);

  const handleCheckExit = (genre) => {
    return Boolean(selectedGenres.includes(genre.id));
  };

  const handleSelect = (genre) => {
    if (handleCheckExit(genre)) {
      setSelectedGenres((prev) => prev.filter((el) => el !== genre.id));
    } else {
      setSelectedGenres((prev) => [...prev, genre.id]);
    }
  };

  return (
    <Stack
      alignItems={"center"}
      justifyContent="flex-start"
      spacing={0}
      direction="row"
      sx={{
        flexWrap: "wrap",
      }}
    >
      {genres.map((genre) => {
        const isSelected = handleCheckExit(genre);

        return (
          <Chip
            onClick={() => handleSelect(genre)}
            sx={{
              marginLeft: "5px",
              marginBottom: "5px",
            }}
            key={genre.id}
            clickable
            label={genre.name}
            icon={isSelected ? <HighlightOffIcon /> : <AddCircleIcon />}
            color={isSelected ? "error" : "primary"}
          />
        );
      })}
    </Stack>
  );
};

export default Genres;
