import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Div } from "~/components/common/containers/Div";
import { Main } from "~/components/common/containers/Main";
import { Section } from "~/components/common/containers/Section";
import DatabaseServer from "~/utils/db/mongodb/dbConfig";
import skillsStyles from "~/styles/skillCards.css";
import containerStyles from "~/styles/containers.css";
import buttonsStyles from "~/styles/button.css";
import { LinksFunction } from "@remix-run/react/dist/routeModules";
import { SkillCard } from "~/components/skills/index";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: skillsStyles
      //  media: process.env.MEDIA_CSS
    },
    {
      rel: "stylesheet",
      href: containerStyles
      // media: process.env.MEDIA_CSS
    },
    {
      rel: "stylesheet",
      href: buttonsStyles
      // media: process.env.MEDIA_CSS
    }
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  DatabaseServer.getInstance();
  const skills = await DatabaseServer.getDocuments("skills", { locale: "en" }, undefined, 0);
  return json(skills);
};

export default function Skills() {
  const skills = useLoaderData();
  return (
    <>
      <Main>
        <h1>Skills</h1>
      </Main>
      <Section row>
        <Div row>
          {skills.map((skill: any) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </Div>
      </Section>
      <br />
    </>
  );
}
