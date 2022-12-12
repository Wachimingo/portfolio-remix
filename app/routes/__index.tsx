import { Outlet } from "@remix-run/react";
import { NavBar, Footer } from "~/components";

const Portfolio = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Portfolio;
