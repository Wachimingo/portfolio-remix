import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Card from '~/components/certs/card';
import Modal from '~/components/certs/modal';
import { actions, getCerts } from '~/controllers/certs';
import type { LinksFunction, LoaderFunction, ActionFunction, ErrorBoundaryComponent } from '@remix-run/node';
import type { FC } from "react";
import rootStyles from '~/styles/min/root.css';
import formStyles from '~/styles/min/form.css';
import cardStyles from '~/styles/min/card.css';

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: rootStyles, media: process.env.MEDIA_CSS },
        { rel: "stylesheet", href: cardStyles, media: process.env.MEDIA_CSS },
        { rel: "stylesheet", href: formStyles, media: process.env.MEDIA_CSS },
    ]
}

const getCookie = (cname: string | null, cookie: string | null) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(cookie ?? '');
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

export const loader: LoaderFunction = async ({ request }) => {
    const cookie = request.headers.get('cookie');
    const name = getCookie('name', cookie);
    const token = getCookie('token', cookie);

    if (name === 'Joshua Herrera' && token) {
        const certs = await getCerts({
            locale: 'en'
        });
        return json(certs)
    }
    throw new Error('No authorize user');
}

export const action: ActionFunction = async ({ request }) => {
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

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return (
        <main>
            <h1>{error.message}</h1>
        </main>
    );
}

const Certs: FC = () => {
    const certs = useLoaderData();
    return <>
        <main>
            <h1>Manage certifications</h1>
        </main>
        <section className='items-container2'>
            <Card certs={certs} admin />
            <button id='addNewCertBtn' type='button' className="bubble-btn">+</button>
        </section>
        <Modal />
        {
            process.env.NODE_ENV === 'development'
                ? <script defer={true} src='/scripts/certs.js' />
                : <script defer={true} src='/scripts/min/certs-min.js' />
        }
    </>
}

export default Certs;