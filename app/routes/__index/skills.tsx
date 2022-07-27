import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/Card";
import { getSkills } from '~/controllers/skills';
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
        { rel: "stylesheet", href: rootStyles },
        { rel: "stylesheet", href: cardStyle },
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

export default function Index() {
    const skills = useLoaderData<Skill[]>();
    return (
        <>
            <main>
                <div>
                    <h1>Skillset</h1>
                    <p>This is a evergrowing collection of current skillsets I handle.</p>
                </div>
                <div className="items-container2">
                    {
                        skills.map((skill: Skill, i: number) => {
                            return (
                                <Card key={i} index={i}>
                                    <img
                                        loading="lazy"
                                        src={skill.icon ? skill.icon : './assets/skills/default.webp'}
                                        alt={skill.name}
                                    />
                                    <div>
                                        <h1>{skill.name}</h1>
                                        <p>
                                            {skill.description}
                                        </p>
                                        <progress value={skill.level} max="100"> {skill.level}%</progress>
                                    </div>
                                </Card>
                            )
                        })

                    }
                </div>
            </main>
        </>
    );
}
