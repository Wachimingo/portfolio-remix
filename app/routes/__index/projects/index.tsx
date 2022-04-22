import { json, Link, useLoaderData } from "remix";
import { getProjects } from "~/controllers/projects";
import projectStyles from "~/styles/projects.css"

export const meta = () => {
    return {
        title: "Projects",
        description:
            "Catalog of projects",
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
            <section className="">
                {
                    projects.map((project: any, i: number) => {
                        return (
                            <div key={i} className="card projectItem">
                                <img src={project.image} className="card-img-top" alt="..." width='250px' height='250px' />
                                <div className="card-body">
                                    <h5 className="card-title">{project.name}</h5>
                                    <p className="card-text">{project.description}</p>
                                    <Link className='btn btn-outline-primary' to={project.link}>Checkout</Link>
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