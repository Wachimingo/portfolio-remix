
import { Link } from "remix";

export const NavBar = (props: any) => {
    return (
        // renderNavBar[props.token ? 'out' : 'in']
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Wachimingo</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/projects">Projects</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/skills">Skills</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/certs">Certifications</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav position-relative right-0">
                        {
                            !props.logged
                                ?
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/signup">Sign Up</Link>
                                </li>
                                : undefined
                        }
                        {
                            props.logged
                                ?
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/signout">Sign Out</Link>
                                </li>
                                :
                                <li className="nav-item">
                                    <Link className="nav-link" to="/auth/signin">Sign In</Link>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}


