import { useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "@remix-run/react";

export const SideBar = () => {
    const [hide, setHide] = useState(false)
    return (
        <div className="sidebar-wrapper">
            <button
                type="button"
                className={`${hide ? 'open' : 'close'} sidebar-button`}
                onClick={() => { setHide(!hide) }}
            >
                {
                    hide
                        ? <FaArrowAltCircleRight
                            className='open sidebar-button'
                            onClick={() => { setHide(!hide) }}
                        />
                        : <FaArrowAltCircleLeft
                            className='close sidebar-button'
                            onClick={() => { setHide(!hide) }}
                        />}
            </button>
            {
                hide ?
                    undefined
                    :
                    <nav className="sidebar-container">
                        <div className="">
                            <h3 className="">Go to:</h3>
                        </div>
                        <div>
                            <Link className="sidebar-link" to="/projects/restaurant">Lading Page</Link>
                            <Link className="sidebar-link" to="/projects/restaurant/catalog">Catalog</Link>
                            <Link className="sidebar-link" to="/projects/restaurant/billing/sell">Sell</Link>
                        </div>
                    </nav>
            }
        </div>
    )
}
