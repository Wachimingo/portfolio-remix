import { Outlet } from "remix";
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
            <SideBar />
            <Outlet />
        </>
    )
}

export default Restaurant;