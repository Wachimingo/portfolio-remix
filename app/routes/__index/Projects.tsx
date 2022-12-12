import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Div } from "~/components/common/containers/Div";
import { Main } from "~/components/common/containers/Main";
import { Section } from "~/components/common/containers/Section";
import DatabaseServer from "~/utils/db/mongodb/dbConfig";
import projectStyles from "~/styles/projectCards.css";
import containerStyles from "~/styles/containers.css";
import buttonsStyles from "~/styles/button.css";
import { LinksFunction } from "@remix-run/react/dist/routeModules";
import { ProjectCard } from "~/components/projects/ProjectsCard";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: projectStyles
    },
    {
      rel: "stylesheet",
      href: containerStyles
    },
    {
      rel: "stylesheet",
      href: buttonsStyles
    }
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  DatabaseServer.getInstance();
  const projects = await DatabaseServer.getDocuments("projects", { locale: "en" }, undefined, 0);
  return json(projects);
};

export default function Projects() {
  const projects = useLoaderData();
  return (
    <>
      <Main>
        <h1>Projects</h1>
      </Main>
      <Section row>
        <Div row>
          {projects.map((project: any) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </Div>
      </Section>
    </>
  );
}
