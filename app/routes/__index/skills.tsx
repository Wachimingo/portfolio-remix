import { json, useLoaderData } from "remix";
import { SkillCard } from "~/components/Card";
import { getSkills } from '~/controllers/skills'
import rootStyles from '~/styles/root.css'

export function links() {
    return [
        { rel: "stylesheet", href: rootStyles },
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
            <main className="main">
                <div className=''>
                    <h1 className="">Skillset</h1>
                    <p>This is a evergrowing collection of current skillsets I handle.</p>
                </div>
                <div className="grid">
                    {
                        skills.map((item: any, i: number) => {
                            return (
                                <SkillCard key={i} index={i} item={item} />
                            )
                        })

                    }
                </div>
            </main>
        </>
    );
}