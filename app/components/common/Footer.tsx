import { FaFacebookF, FaGithubAlt, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="footer-wrapper">
            <div className="footer-container">
                <section className="social-media">
                    <a href="https://www.facebook.com/halex007/" target="_blank" rel='noreferrer' role="button">
                        <FaFacebookF />
                    </a>
                    <a href="https://www.linkedin.com/in/joshua-guillen-755143a7/" target="_blank" rel='noreferrer' role="button">
                        <FaLinkedinIn />
                    </a>
                    <a href="https://github.com/Wachimingo" target="_blank" rel='noreferrer' role="button">
                        <FaGithubAlt />
                    </a>
                </section>
                <a href="mailto: joshua.herrera2@outlook.com">
                    <FaRegEnvelope /> joshua.herrera2@outlook.com
                </a>
            </div>
        </footer>
    )
}