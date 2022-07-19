import { FaFacebookF, FaGithubAlt, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <div className="footer-container">
                <section className="social-media">
                    <a className="" href="https://www.facebook.com/halex007/" target="_blank" rel='noreferrer' role="button">
                        <FaFacebookF />
                    </a>
                    <a className="" href="https://www.linkedin.com/in/joshua-guillen-755143a7/" target="_blank" rel='noreferrer' role="button">
                        <FaLinkedinIn />
                    </a>
                    <a className="" href="https://github.com/Wachimingo" target="_blank" rel='noreferrer' role="button">
                        <FaGithubAlt />
                    </a>
                </section>
                <a href="mailto: joshua.herrera2@outlook.com">
                    <FaRegEnvelope className='' /> joshua.herrera2@outlook.com
                </a>
            </div>
        </footer>
    )
}

export default Footer;