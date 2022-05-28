import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_KEY } from "../../contants";
import Content from "../../components/Content";
import { Grid } from "@mui/material";
import PageTitle from "../../components/PageTitle/PageTitle";
import CustomPagination from "../../components/Pagination";

const Trending = () => {
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    let isMount = true;

    axios
      .get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
      )
      .then(({ data }) => {
        if (!totalPage) {
          const { total_pages } = data;
          if (isMount) setTotalPage(total_pages);
        }

        if (isMount) setContents(data.results);
      })
      .catch((err) => {
        console.log("err", err);
      });

    return () => (isMount = false);
  }, [page, totalPage]);

  return (
    <>
      <PageTitle content="TRENDING" />
      <Grid container spacing={2} mt={2}>
        {contents.map((content) => (
          <Content
            media_type={content.media_type}
            key={content.id}
            content={content}
          />
        ))}
      </Grid>
      <CustomPagination totalPage={totalPage} page={page} setPage={setPage} />
    </>
  );
};

export default Trending;
