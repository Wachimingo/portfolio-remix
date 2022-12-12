import { Link } from "@remix-run/react";
export const NavBar = () => {
  return (
    <nav className='menu'>
      <input id='menu-toggle' type='checkbox' />
      <label className='hamburger' htmlFor='menu-toggle'>
        <div className='ham-divs' />
        <div className='ham-divs' />
        <div className='ham-divs' />
      </label>
      <div id='menu-container' className='menu-container'>
        <a className='menu-container-link' href='/'>
          Home
        </a>
        <Link className='menu-container-link' to='/projects'>
          Projects
        </Link>
        <Link className='menu-container-link' to='/skills'>
          Skills
        </Link>
        <Link className='menu-container-link' to='/certs'>
          Certifications
        </Link>
        {/* <a id='signup' className='menu-container-link' href='/auth/signup'>
          Sign Up
        </a>
        <a id='login_logout' className='menu-container-link' href='/auth/signin'>
          Sign In
        </a> */}
      </div>
    </nav>
  );
};
