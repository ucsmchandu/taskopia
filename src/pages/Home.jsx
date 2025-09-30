import React from "react";
import Cards from "../components/Cards";
import StartHome from "../components/StartHome";

const Home = () => {
  const user = null;

  return (
    <>
    {/* animated home content */}
      <StartHome />
      <Cards />
    </>
  );
};

export default Home;
