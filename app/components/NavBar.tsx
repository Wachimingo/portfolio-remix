
import { Link } from "@remix-run/react";

export const NavBar = (props: any) => {
    return (
        <nav className="menu">
            <div className="hamburger-menu" onClick={() => props.setIsOpen(!props.isOpen)}>
                <div className="ham-divs" />
                <div className="ham-divs" />
                <div className="ham-divs" />
            </div>
            <div className='menu-child-div' style={{ display: props.isOpen ? 'block' : 'none' }}>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/projects">Projects</Link>
                <Link className="link" to="/skills">Skills</Link>
                <Link className="link" to="/certs">Certifications</Link>
            </div>
            <div className='menu-child-div' style={{ display: props.isOpen ? 'block' : 'none' }}>
                {
                    !props.logged
                        ? <Link className="link" to="/auth/signup">Sign Up</Link>
                        : undefined
                }
                {
                    props.logged
                        ? <Link className="link" to="/auth/signout">Sign Out</Link>
                        : <Link className="link" to="/auth/signin">Sign In</Link>
                }
            </div>
        </nav>
    )
}


