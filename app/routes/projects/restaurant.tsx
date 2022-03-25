import { Outlet } from "remix";
import Footer from "~/components/Footer";
import Navbar from "~/components/navbar";

const Restaurant = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Restaurant;