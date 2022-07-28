import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCerts } from "~/controllers/certs";
import Certs from "~/components/certs/card";
import rootStyles from '~/styles/root.css';
import cardStyle from '~/styles/card.css';

export const meta = () => {
    return {
        title: "Certifications",
        description:
            "Learning path",
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

            </main>
            <div className="items-container2">
                <Certs certs={certs} />
            </div>
        </>
    );
}
