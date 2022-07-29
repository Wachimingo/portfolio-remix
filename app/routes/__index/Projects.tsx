import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Card } from "~/components";
import { getProjects } from "~/controllers/projects";
import type { MetaFunction, LinksFunction, LoaderFunction } from '@remix-run/node';
import type { FC } from "react";
import projectsStyle from '~/styles/min/projects.css';
import buttonsStyle from '~/styles/min/buttons.css';

export const meta: MetaFunction = () => {
    return {
        title: "Projects",
        description: "Catalog of projects", "og:title": "Projects",
    };
};

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: projectsStyle, media: process.env.MEDIA_CSS },
        { rel: "stylesheet", href: buttonsStyle, media: process.env.MEDIA_CSS },
    ]
}

export const loader: LoaderFunction = async () => {
    const projects = await getProjects({ locale: 'en' })
    return json(projects)
}

const Projects: FC = () => {
    const projects = useLoaderData();
    return (
        <>
            <main>
                <h1>Projects</h1>
            </main>
            <section className="items-container">
                {
                    projects.map((project: any, i: number) => {
                        return (
                            <Card key={project.name}>
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    width="auto"
                                    height="auto"
                                />
                                <div>
                                    <h1>{project.name}</h1>
                                    <p>{project.description}</p>
                                </div>
                                {
                                    project.link.includes('http' || 'https') ?
                                        <a href={project.link} className="button success" target="_blank" rel='noreferrer' role="button">Checkout</a>
                                        :
                                        <Link to={project.link} className="button success">Checkout</Link>
                                }
                            </Card>
                        )
                    })
                }
            </section>
        </>
    )
}

export default Projects;