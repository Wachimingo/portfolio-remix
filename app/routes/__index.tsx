import { Outlet } from "@remix-run/react";
import { NavBar, Footer } from "~/components";

const Portfolio = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
            {
                process.env.NODE_ENV === 'development'
                    //@ts-ignore
                    ? <script defer={true} src='/scripts/index.js' media={process.env.MEDIA_CSS} />
                    //@ts-ignore
                    : <script defer={true} src='/scripts/min/index-min.js' media={process.env.MEDIA_CSS} />
            }
        </>
    )
}

export default Portfolio;