import { FaFacebookF, FaGithubAlt, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-dark text-center text-white footer" style={{ width: "100%", marginTop: "auto" }}>
            <div className="container">
                <section className="">
                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/halex007/" target="_blank" rel='noreferrer' role="button">
                        <FaFacebookF />
                    </a>
                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/joshua-guillen-755143a7/" target="_blank" rel='noreferrer' role="button">
                        <FaLinkedinIn />
                    </a>
                    <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/Wachimingo" target="_blank" rel='noreferrer' role="button">
                        <FaGithubAlt />
                    </a>
                </section>
                <span className=''>
                    <FaRegEnvelope className='d-inline-block' /> joshua.herrera2@outlook.com
                </span>
            </div>
        </footer>
    )
}

export default Footer;