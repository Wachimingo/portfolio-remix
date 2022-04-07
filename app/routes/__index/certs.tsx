import { json, useLoaderData } from "remix";
import { CertCard } from "~/components/Card";
import rootStyles from '~/styles/root.css'
import { getCerts } from "~/controllers/certs";

export function links() {
    return [
        { rel: "stylesheet", href: rootStyles },
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
            <main className="main">
                <div className=''>
                    <h1 className="">Certifications</h1>
                    <p>Keeping up with the ever changing technologies and knowledge.</p>
                </div>
                <div className="grid">
                    {
                        certs.map((item: any, i: number) => {
                            return (
                                <CertCard key={i} index={i} item={item} />
                            )
                        })
                    }
                </div>
            </main>
        </>
    );
}
