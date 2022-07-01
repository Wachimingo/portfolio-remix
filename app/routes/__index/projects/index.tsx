import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getProjects } from "~/controllers/projects";
import projectStyles from "~/styles/projects.css"

export const meta = () => {
    return {
        title: "Projects",
        description:
            "Catalog of projects",
        "og:title": "Projects",
        "og:image": "https://ia.media-imdb.com/images/rock.jpg",
    };
};

export function links() {
    return [
        { rel: 'stylesheet', href: projectStyles }
    ]
}

export const loader = async () => {
    const projects = await getProjects({ locale: 'en' })
    return json(projects)
}

const Projects = () => {
    const projects = useLoaderData();
    return (
        <>
            <h1 className="">Projects</h1>
            <br />
            <section className="d-inline-block">
                {
                    projects.map((project: any, i: number) => {
                        return (
                            <div key={project.name} className="card ms-2 cardStyle">
                                <div className="imgContainer">
                                    <img
                                        src={project.image}
                                        className="card-img-top"
                                        alt={project.name} />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{project.name}</h5>
                                    <div className="innerBody">
                                        <p className="card-text">{project.description}</p>
                                    </div>
                                    <a className='btn btn-outline-primary' href={project.link}>Checkout</a>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}

export default Projects;