import { Outlet } from "@remix-run/react";
import Footer from "~/components/Footer";
import { NavBar } from "~/components/NavBar";
import { useEffect, useState } from "react";
//@ts-ignore
import Cookies from 'js-cookie'

const Portfolio = () => {
    const [logged, setLogged] = useState(false)
    useEffect(() => {
        if (Cookies.get('token')) {
            setLogged(true)
        } else {
            setLogged(false)
        }
    }, [])
    return (
        <>
            <NavBar
                {...Cookies.get()}
                logged={logged}
            />
            <Outlet />
            <Footer />
        </>
    )
}

export default Portfolio;