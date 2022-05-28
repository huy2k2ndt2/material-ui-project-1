import { Container } from "@mui/material";
import React, { Fragment } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/Layouts/DefaultLayout";

import { publicRoutes } from "./routes";

const App = () => {
  return (
    <Router>
      <Container
        sx={{
          paddingBottom: "56px",
          background: "#39445a",
          minHeight: "100vh",
        }}
      >
        <Routes>
          {publicRoutes.map((route) => {
            const { key, path, component, layout } = route;

            const Layout = layout
              ? layout
              : layout === null
              ? Fragment
              : DefaultLayout;

            const Page = component;

            return (
              <Route
                key={key}
                path={path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
