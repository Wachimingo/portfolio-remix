import { Outlet } from "remix";
import Footer from "~/components/Footer";
import Navbar from "~/components/navbar";
import SideBar from "~/components/Sidebar";
import sidebarStyles from "~/styles/sidebar.css";

export function links() {
    return [
        { rel: "stylesheet", href: sidebarStyles }
    ]
}

const Restaurant = () => {
    return (
        <>
            <Navbar />
            <SideBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Restaurant;