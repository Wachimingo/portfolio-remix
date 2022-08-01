import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCerts } from "~/controllers/certs";
import Card from "~/components/certs/card";
import type { MetaFunction, LinksFunction, LoaderFunction } from '@remix-run/node';
import type { FC } from "react";
import type { Certification } from "~/types/skillsAndCerts";
import rootStyles from '~/styles/min/root.css';
import cardStyle from '~/styles/min/card.css';

export const meta: MetaFunction = () => {
    return {
        title: "Certifications",
        description:
            "Learning path",
    };
};

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: rootStyles, media: process.env.MEDIA_CSS },
        { rel: "stylesheet", href: cardStyle, media: process.env.MEDIA_CSS },
    ]
}

export const loader: LoaderFunction = async () => {
    const [skills] = await Promise.all([
        getCerts({
            locale: "en"
        }),
    ])
    return json(skills);
};

const Certs: FC = () => {
    const certs = useLoaderData<any>();
    const List = certs.map((cert: Certification) => {
        return <Card key={cert.name} cert={cert} />
    });
    return (
        <>
            <main>
                <div>
                    <h1>Certifications</h1>
                    <p>Keeping up with the ever changing technologies and knowledge.</p>
                </div>

            </main>
            <div className="items-container2">
                {List}
            </div>
        </>
    );
}
export default Certs;