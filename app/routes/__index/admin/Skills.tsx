import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getSkills } from '~/controllers/skills';
import { Card, SkillsModal } from '~/components';
import rootStyles from '~/styles/root.css';
import formStyles from '~/styles/form.css';
import cardStyles from '~/styles/card.css'
import { FaCog, FaTrash } from 'react-icons/fa';


export const links = () => {
    return [
        { rel: "stylesheet", href: rootStyles },
        { rel: "stylesheet", href: cardStyles },
        { rel: "stylesheet", href: formStyles },

    ]
}

const getCookie = (cname, cookie) => {
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
    const name = getCookie("name", request.headers.get("cookie"));
    const token = getCookie("token", request.headers.get("cookie"));

    if (name === 'Joshua Herrera' && token) {
        const skills = await getSkills({
            locale: 'en'
        })
        return json(skills)
    }
    throw new Error('No authorize user');
}

export function ErrorBoundary({ error }) {
    return (
        <main>
            <h1>{error.message}</h1>
        </main>
    );
}

const Skills = () => {
    const skills = useLoaderData<any>();

    return <>
        <main>
            <h1>Manage skills</h1>
        </main>
        <section className='items-container2'>
            {
                skills.map(skill => <Card key={skill.name}>
                    <img src={
                        skill.icon
                            ? `https://images.weserv.nl/?url=${skill.icon}&w=250&h=250`
                            : 'https://images.weserv.nl/?url=https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/symbol_questionmark.png&w=250&h=250'
                    }
                        alt={skill.name}
                    />
                    <div>
                        <h1>{skill.name}</h1>
                        <p>
                            {skill.description}
                        </p>
                        <progress value={skill.level} max="100"> {skill.level}%</progress>
                    </div>
                    <FaCog id={`${skill.name}_modify_btn`} className='card-modify-btn'>
                        Modify
                    </FaCog>
                    <FaTrash id={`${skill.name}_remove_btn`} className='card-remove-btn'>
                        Remove
                    </FaTrash>
                </Card>)
            }
        </section>
        <SkillsModal />
        <script
            dangerouslySetInnerHTML={{
                __html: `
                    // const skills = JSON.parse(JSON.stringify(${JSON.stringify(skills)}));
                    const modifyBtns = document.querySelectorAll('[class*="card-modify-btn"]');
                    const modal = document.getElementById('skills-modal');
                    const formCancelBtn = document.getElementById('formCancelBtn');
                    const skillNameInput = document.getElementById('skillNameInput');
					console.log("TCL: Skills -> skillNameInput", skillNameInput);

                    // const getSelectedSkill = () => {
                    //     skills.forEach()
                    // }
                    getSelectedSkill();
                    
                    const openModal = () => {
                        skillNameInput.value = 'Hola'
                        modal.classList.remove('none');
                        window.addEventListener('click', closeWhenClickOutside);
                    }

                    const closeModal = () => {
                        modal.classList.add('none');
                    }

                    function closeWhenClickOutside(event) {
                        if (event.target == modal) {
                            window.removeEventListener('click', closeWhenClickOutside);
                            closeModal(false);
                        }
                    }
                    window.addEventListener('click', closeWhenClickOutside);

					modifyBtns.forEach(btn => {
                        btn.onclick = openModal;
                    });
                    modal.firstChild.firstChild.addEventListener('click', closeModal);
                    formCancelBtn.addEventListener('click', closeModal);
        `,
            }}
        />
    </>
}

export default Skills;