import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "@remix-run/react";

export const SideBar = () => {
    const [hide, setHide] = useState(false)
    return (
        <>
            <button
                type="button"
                className={`${hide ? 'open' : 'close'} sideBarButton`}
                onClick={() => { setHide(!hide) }}
            >
                {
                    hide
                        ? <FaArrowAltCircleRight />
                        : <FaArrowAltCircleLeft />}
            </button>
            {
                hide ?
                    undefined
                    :
                    <nav className="position-fixed bg-light sideBar">
                        <div className="">
                            <h3 className="">Go to:</h3>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/projects/restaurant">Lading Page</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/projects/restaurant/catalog">Catalog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/projects/restaurant/billing/sell">Sell</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/projects/restaurant/orders/isPending">Orders</Link>
                            </li>
                        </ul>
                    </nav>
            }
        </>
    )
}
