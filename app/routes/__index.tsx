import { Outlet } from "@remix-run/react";
import Footer from "~/components/Footer";
import { NavBar } from "~/components/NavBar";

const Portfolio = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
            {
                process.env.NODE_ENV === 'development'
                    ? <script defer={true} src='/scripts/index.js' />
                    : <script defer={true} src='/scripts/min/index-min.js' />
            }
        </>
    )
}

export default Portfolio;