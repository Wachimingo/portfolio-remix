import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/Card";
import rootStyles from '~/styles/root.css'
import cardStyle from '~/styles/card.css';
import { getCerts } from "~/controllers/certs";

export const meta = () => {
    return {
        title: "Certifications",
        description:
            "Learning path",
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
        getCerts({
            locale: "en"
        }),
    ])
    return json(skills);
};

export default function Index() {
    const certs = useLoaderData<any>();
    return (
        <>
            <main>
                <div>
                    <h1>Certifications</h1>
                    <p>Keeping up with the ever changing technologies and knowledge.</p>
                </div>
                <div className="items-container2">
                    {
                        certs.map((item: any, i: number) => {
                            return (
                                <Card key={i} index={i}>
                                    <img src={
                                        item.icon
                                            ? `https://images.weserv.nl/?url=${item.icon}&w=250&h=250`
                                            : 'https://images.weserv.nl/?url=https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/symbol_questionmark.png&w=250&h=250'
                                    }
                                        alt={item.name}
                                    />
                                    <h1>{item.name}</h1>
                                </Card>
                            )
                        })
                    }
                </div>
            </main>
        </>
    );
}
