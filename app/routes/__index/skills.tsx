import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/Card";
import { getSkills } from '~/controllers/skills';
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
    const skills = useLoaderData<any>();
    return (
        <>
            <main>
                <div>
                    <h1>Skillset</h1>
                    <p>This is a evergrowing collection of current skillsets I handle.</p>
                </div>
                <div className="items-container2">
                    {
                        skills.map((item: any, i: number) => {
                            return (
                                <Card key={i} index={i}>
                                    <img src={
                                        item.icon
                                            ? `https://images.weserv.nl/?url=${item.icon}&w=250&h=250`
                                            : 'https://images.weserv.nl/?url=https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/symbol_questionmark.png&w=250&h=250'
                                    }
                                        alt={item.name}
                                    />
                                    <div>
                                        <h1>{item.name}</h1>
                                        <p>
                                            {item.description}
                                        </p>
                                        <progress value={item.level} max="100"> {item.level}%</progress>
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
