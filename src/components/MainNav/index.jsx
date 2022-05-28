import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import TvIcon from "@mui/icons-material/Tv";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { v4 as uuidv4 } from "uuid";
import { Box, Container } from "@mui/system";
import routesConfig from "../../config/routes";
import { useLocation, useNavigate } from "react-router-dom";

const links = [
  {
    key: uuidv4(),
    label: "Trending",
    Component: WhatshotIcon,
    path: routesConfig.trending,
  },
  {
    key: uuidv4(),
    label: "Movies",
    Component: MovieIcon,
    path: routesConfig.movies,
  },
  {
    key: uuidv4(),
    label: "TV series",
    Component: TvIcon,
    path: routesConfig.series,
  },
  {
    key: uuidv4(),
    label: "Search",
    Component: SearchIcon,
    path: routesConfig.search,
  },
];

export default function MainNav() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleCheckExitPath = (path) => {
    for (const key in routesConfig) {
      if (routesConfig[key] === path) return true;
    }

    return false;
  };

  return (
    <Box
      sx={{ position: "fixed", bottom: 0, left: 0, width: "100%", zIndex: 100 }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BottomNavigation
          showLabels
          value={pathname}
          onChange={(event, path) => {
            if (handleCheckExitPath(path)) {
              navigate(path);
            }
          }}
          sx={{
            width: "100%",
            background: "#2d313a",
            zIndex: 100,
          }}
        >
          {links.map((link) => {
            const { label, Component, key, path } = link;
            return (
              <BottomNavigationAction
                sx={{
                  color: "white",
                }}
                value={path}
                label={label}
                key={key}
                icon={<Component />}
              />
            );
          })}
        </BottomNavigation>
      </Container>
    </Box>
  );
}
