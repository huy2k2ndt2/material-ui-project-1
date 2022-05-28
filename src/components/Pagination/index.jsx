import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { createTheme } from '@material-ui/core/styles'

const darkTheme = createTheme({
  palette: {
    type: "dark",
  },
});

export default function CustomPagination({ page, setPage, totalPage = 0 }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Stack
        spacing={2}
        sx={{
          margin: "20px 0",
        }}
        alignItems="center"
      >
        <Pagination
          value={page}
          count={totalPage}
          variant="outlined"
          shape="circular"
          onChange={(e, page) => {
            setPage(page);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
