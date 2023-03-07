import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Div } from "~/components/common/containers/Div";
import { Main } from "~/components/common/containers/Main";
import { Section } from "~/components/common/containers/Section";
import DatabaseServer from "~/utils/db/mongodb/dbConfig";
import projectStyles from "~/styles/projectCards.css";
import { LinksFunction } from "@remix-run/react/dist/routeModules";
import { ProjectsCard } from "~/components/projects/";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: projectStyles }];
};

export const loader: LoaderFunction = async () => {
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
            <ProjectsCard key={project.name} project={project} />
          ))}
        </Div>
      </Section>
    </>
  );
}
