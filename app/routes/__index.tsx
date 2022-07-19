import { Outlet } from "@remix-run/react";
import Footer from "~/components/Footer";
import { NavBar } from "~/components/NavBar";
import { useEffect, useState } from "react";
//@ts-ignore
import Cookies from 'js-cookie'

const Portfolio = () => {
    const [logged, setLogged] = useState(false);
    const [isOpen, setIsOpen] = useState<any>();

    useEffect(() => {
        if (Cookies.get('token')) {
            setLogged(true)
        } else {
            setLogged(false)
        }
        const x = window.matchMedia("(min-width: 768px)");
        setIsOpen(x.matches);

        const resizedWindow = (x: any) => {
            setIsOpen(x.matches)
        }

        x.addEventListener('change', resizedWindow);
    }, []);

    return (
        <>
            <NavBar
                {...Cookies.get()}
                logged={logged}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
            <Outlet />
            <Footer />
        </>
    )
}

export default Portfolio;