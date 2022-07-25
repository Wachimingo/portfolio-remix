import { Outlet } from "@remix-run/react";
import Footer from "~/components/Footer";
import { NavBar } from "~/components/NavBar";

const Portfolio = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
            <script async src='/scripts/min/index-min.js' />
        </>
    )
}

export default Portfolio;