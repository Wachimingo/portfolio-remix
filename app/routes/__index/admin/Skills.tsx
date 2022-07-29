import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { actions, getSkills } from '~/controllers/skills';
import Card from '~/components/skills/card';
import Modal from '~/components/skills/modal';
import { getCategories } from '~/controllers/categories';
import type { Category, Skill } from '~/types/skillsAndCerts';
import rootStyles from '~/styles/root.css';
import formStyles from '~/styles/form.css';
import cardStyles from '~/styles/card.css';

export const links = () => {
    return [
        { rel: "stylesheet", href: rootStyles, media: process.env.MEDIA_CSS },
        { rel: "stylesheet", href: cardStyles, media: process.env.MEDIA_CSS },
        { rel: "stylesheet", href: formStyles, media: process.env.MEDIA_CSS },
    ]
}

const getCookie = (cname: string, cookie: string) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}

export const loader = async ({ request }) => {
    const cookie = request.headers.get("cookie");
    const name = getCookie("name", cookie);
    const token = getCookie("token", cookie);

    if (name === 'Joshua Herrera' && token) {
        const skills = await getSkills({
            locale: 'en'
        });
        const categories = await getCategories({
            locale: "en",
            relatedTo: 'skills',
        });
        return json({ skills, categories })
    }
    throw new Error('No authorize user');
}

export const action = async ({ request }) => {
    const url = new URL(request.url);

    const method: string = url.searchParams.get("method")?.toUpperCase() ?? 'none';

    if (!actions[method]) return json({});
    let formData: any;
    let data: any = {
        _id: url.searchParams.get("_id"),
        locale: 'en'
    };

    try {
        formData = await request?.formData();
        for (const pair of formData.entries()) {
            data[pair[0]] = pair[1]
        }
    } catch (error) {

    }

    return await actions[method](data);
}

export function ErrorBoundary({ error }) {
    return (
        <main>
            <h1>{error.message}</h1>
        </main>
    );
}

type Loader = {
    skills: Skill[],
    categories: Category[],
}

const Skills = () => {
    const { skills, categories } = useLoaderData<Loader>();

    const renderScript = () => {
        if (process.env.NODE_ENV === 'development') return <script defer={true} src='/scripts/skills.js' />;

        return <script defer={true} src='/scripts/min/skills-min.js' />
    }

    return <>
        <main>
            <h1>Manage skills</h1>
        </main>
        <section className='items-container2'>
            <Card skills={skills} admin />
            <button id='addNewSkillBtn' type='button' className="bubble-btn">+</button>
        </section>
        {renderScript()}
        <Modal categories={categories} />
    </>
}

export default Skills;