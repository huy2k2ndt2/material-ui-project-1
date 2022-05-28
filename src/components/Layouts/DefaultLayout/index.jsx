import Header from "../../Header";
import MainNav from "../../MainNav";

import React from "react";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <MainNav />
    </>
  );
};

export default DefaultLayout;
