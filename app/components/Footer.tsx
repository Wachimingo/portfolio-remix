import { FaFacebookF, FaGithubAlt, FaLinkedinIn, FaRegEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-dark text-center text-white footer">
            <div className="container p-4">
                <section className="mb-4">
                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/halex007/" target="_blank" rel='noreferrer' role="button">
                        <FaFacebookF />
                    </a>
                    <a className="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/in/joshua-guillen-755143a7/" role="button">
                        <FaLinkedinIn />
                    </a>
                    <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/Wachimingo" role="button">
                        <FaGithubAlt />
                    </a>
                </section>
                <span className='text-sm'>
                    <FaRegEnvelope className='inline-block' /> joshua.herrera2@outlook.com
                </span>
                <section className="mb-4">
                    <p>

                    </p>
                </section>
            </div>
        </footer>
    )
}

export default Footer;