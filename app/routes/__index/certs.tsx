import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import rootStyles from '~/styles/root.css'
import cardStyle from '~/styles/card.css';
import { getCerts } from "~/controllers/certs";
import { CertCardList } from "~/components/certs";

export const meta = () => {
    return {
        title: "Certifications",
        description:
            "Learning path",
    };
};

export function links() {
    return [
        { rel: "stylesheet", href: rootStyles, media: "none" },
        { rel: "stylesheet", href: cardStyle, media: "none" },
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
                    <CertCardList certs={certs} />
                </div>
            </main>
        </>
    );
}
