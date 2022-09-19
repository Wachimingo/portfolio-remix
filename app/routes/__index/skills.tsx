import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSkills } from '~/controllers/skills';
import Card from "~/components/skills/card";
import type { MetaFunction, LinksFunction, LoaderFunction } from '@remix-run/node';
import type { FC } from "react";
import type { Skill } from "~/types/skillsAndCerts";
import rootStyles from '~/styles/min/root.css';
import cardStyle from '~/styles/min/card.css';

export const meta: MetaFunction = () => {
    return {
        title: "Skills",
        description:
            "Skillset",
    };
};

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: rootStyles, media: process.env.MEDIA_CSS },
        { rel: "stylesheet", href: cardStyle, media: process.env.MEDIA_CSS },
    ]
}

export const loader: LoaderFunction = async () => {
    const skills = await getSkills({
        locale: "en"
    });
    return json(skills);
};

const Skills: FC = () => {
    const skills = useLoaderData<Skill[]>();
    const List = skills.map((skill: Skill) => {
        return <Card key={skill.name} skill={skill} />
    })
    return (
        <>
            <main>
                <div>
                    <h1>Skillset</h1>
                    <p>This is a evergrowing collection of current skillsets I handle.</p>
                </div>
                <div className="items-container2">
                    {List}
                </div>
            </main>
        </>
    );
}

export default Skills;
