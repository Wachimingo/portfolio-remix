
import { Link } from "@remix-run/react";

export const NavBar = (props: any) => {
    return (
        <nav className="menu">
            <div
                id="hamburger-menu"
                className="hamburger-menu"
            >
                <div className="ham-divs" />
                <div className="ham-divs" />
                <div className="ham-divs" />
            </div>
            <div
                id="menu-child-div"
                className='menu-child-div navbar-item-none'
            >
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/projects">Projects</Link>
                <Link className="link" to="/skills">Skills</Link>
                <Link className="link" to="/certs">Certifications</Link>
            </div>
            <div
                id="menu-child-div"
                className='menu-child-div navbar-item-none'
            >
                <Link id='signup' className="link" to="/auth/signup">Sign Up</Link>
                <Link id='login_logout' className="link" to="/auth/signin">Sign In</Link>
            </div>
        </nav>
    )
}


