import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function ButtonAppBar() {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: "#39445a",
          padding: "10px 0",
        }}
      >
        <Toolbar>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "27px",
                md: "50px",
              },
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            🎬 Entertainment Hub 🎥
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
