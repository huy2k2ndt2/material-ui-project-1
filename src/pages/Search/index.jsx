import React, { useEffect, useRef, useState } from "react";
import {
  Stack,
  TextField,
  IconButton,
  Box,
  Tabs,
  Tab,
  Grid,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider } from "@mui/material";
import { createTheme } from "@material-ui/core/styles";
import { API_KEY } from "../../contants";
import axios from "axios";
import CustomPagination from "../../components/Pagination";
import PageTitle from "../../components/PageTitle/PageTitle";
import Content from "../../components/Content";

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#fff",
    },
  },
});

const Search = () => {
  const [totalPage, setTotalPage] = useState(0);
  const [contents, setContents] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = React.useState("movie");
  // const [textSearch, setTextSearch] = useState("");
  const textSearch = useRef("");
  const isMount = useRef(true);

  const handleFetchData = () => {
    console.log("textSearch.current", textSearch.current);
    if (!textSearch.current) return;
    axios
      .get(
        `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&language=en-US&query=${textSearch.current}&page=${page}&include_adult=false`
      )
      .then(({ data }) => {
        if (isMount.current) {
          setContents(data.results);
          setTotalPage(data.total_pages);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    handleFetchData();
  }, [page, type]);

  useEffect(() => {
    return () => (isMount.current = false);
  }, []);

  const handleChange = (event, newValue) => {
    setType(newValue);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <PageTitle content="SEARCH" />
      <Box mt={2}>
        <Stack direction="row" spacing={2}>
          <Box flex={1}>
            <TextField
              fullWidth
              id="filled-basic"
              label="Search"
              variant="filled"
              onChange={(e) => (textSearch.current = e.target.value)}
            />
          </Box>

          <IconButton
            aria-label="delete"
            sx={{
              background: "#fff",
              borderRadius: "5px",
            }}
            size={"large"}
            onClick={() => {
              handleFetchData();
            }}
          >
            <SearchIcon sx={{ color: "#000" }} />
          </IconButton>
        </Stack>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Tabs
          variant="fullWidth"
          value={type}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="movie" label="Search Movies" />
          <Tab value="tv" label="Search Tv Series" />
        </Tabs>
      </Box>
      <Box>
        <Grid container spacing={2} mt={2}>
          {contents.map((content) => (
            <Content key={content.id} content={content} />
          ))}
        </Grid>

        {textSearch && contents.length === 0 && (
          <Typography variant="h5" textAlign="center">
            {type === "tv" ? "NO FOUND TV SERIES" : "NO FOUND MOVIES"}
          </Typography>
        )}

        {totalPage > 1 && (
          <CustomPagination
            totalPage={totalPage}
            page={page}
            setPage={setPage}
          />
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Search;
