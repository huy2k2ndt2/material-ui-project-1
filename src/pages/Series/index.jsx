import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../../contants";
import Content from "../../components/Content";
import { Grid } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomPagination from "../../components/Pagination";
import Genres from "../../components/Genres";
import useDebounce from "../../hooks/useDebounce";

const Series = () => {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const apiGenres = useDebounce(selectedGenres, 1000, true, () => setPage(1));

  useEffect(() => {
    let isMount = true;

    const genreforURL = apiGenres.join(",");

    axios
      .get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
      )
      .then(({ data }) => {
        const { total_pages } = data;
        console.log("data", data);
        if (isMount) {
          setTotalPage(total_pages);
          setContents(data.results);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });

    return () => (isMount = false);
  }, [page, totalPage, apiGenres]);

  return (
    <>
      <PageTitle content="TV SERIES" />
      <Genres
        type={"tv"}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <Grid container spacing={2} mt={2}>
        {contents.map((content) => (
          <Content key={content.id} content={content} media_type="tv" />
        ))}
      </Grid>
      <CustomPagination totalPage={totalPage} page={page} setPage={setPage} />
    </>
  );
};

export default Series;
