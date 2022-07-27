import { Outlet } from "@remix-run/react";
import { SideBar } from "~/components";
import sidebarStyles from "~/styles/sidebar.css";

export function links() {
    return [
        { rel: "stylesheet", href: sidebarStyles, media: "none" }
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