import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSkills } from '~/controllers/skills';
import Card from "~/components/skills/card";
import type { Skill } from "~/types/skillsAndCerts";
import rootStyles from '~/styles/root.css';
import cardStyle from '~/styles/card.css';

export const meta = () => {
    return {
        title: "Skills",
        description:
            "Skillset",
    };
};

export function links() {
    return [
        { rel: "stylesheet", href: rootStyles, media: process.env.MEDIA_CSS },
        { rel: "stylesheet", href: cardStyle, media: process.env.MEDIA_CSS },
    ]
}

export const loader = async () => {
    const [skills] = await Promise.all([
        getSkills({
            locale: "en"
        }),
    ])
    return json(skills);
};

const Skills = () => {
    const skills = useLoaderData<Skill[]>();
    return (
        <>
            <main>
                <div>
                    <h1>Skillset</h1>
                    <p>This is a evergrowing collection of current skillsets I handle.</p>
                </div>
                <div className="items-container2">
                    <Card skills={skills} />
                </div>
            </main>
        </>
    );
}

export default Skills;
