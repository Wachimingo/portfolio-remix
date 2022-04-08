import { Outlet } from "remix";
import Footer from "~/components/Footer";
import Navbar from "~/components/NavBar";
import sidebarStyles from "~/styles/sidebar.css";
//@ts-ignore
import Cookies from 'js-cookie'
export function links() {
    return [
        { rel: "stylesheet", href: sidebarStyles }
    ]
}

const Portfolio = () => {
    return (
        <>
            <Navbar {...Cookies.get()} />
            <Outlet />
            <Footer />
        </>
    )
}

export default Portfolio;