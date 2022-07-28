import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSkills } from '~/controllers/skills';
import { getCategories } from '~/controllers/categories';
import { getCerts } from "~/controllers/certs";
import Certs from "~/components/certs/card";
import { SeeMoreLinks } from "~/components/landingPage";
import { SkillListByCategory as Skills } from "~/components/skills/list";
import type { Category, Certification, Skill } from "~/types/skillsAndCerts";
import rootStyles from '~/styles/root.css';
import cardStyle from '~/styles/card.css';

export const meta = () => {
  return {
    title: "Welcome",
    description:
      "Welcome to my portfolio",
  };
};

export function links() {
  return [
    { rel: "stylesheet", href: rootStyles, media: process.env.MEDIA_CSS },
    { rel: "stylesheet", href: cardStyle, media: process.env.MEDIA_CSS },
  ]
}

export const loader = async () => {
  const [categories, skills, certs] = await Promise.all([
    getCategories({
      locale: "en",
      relatedTo: 'skills',
      limit: 2
    }),
    getSkills({
      locale: "en"
    }),
    getCerts({
      locale: "en",
      limit: 3
    })
  ])
  return json({ categories, skills, certs });
};

export function ErrorBoundary({ error }) {
  return (
    <main>
      <h1>{error.message}</h1>
    </main>
  );
}

type Loader = {
  categories: Category[],
  skills: Skill[],
  certs: Certification[]
}

export default function Index() {
  const { categories, skills, certs } = useLoaderData<Loader>();
  return (
    <main>
      <div className='welcome curve'>
        <h1>Wachimingo</h1>
        <img
          className="profile-pic"
          src="./assets/profile/profile-pic.webp"
          alt="profile"
          loading="lazy"
        />
      </div>
      <div className="items-container">
        <Skills categories={categories} skills={skills} />
        <SeeMoreLinks link='/skills' />

        <section>
          <div className="semicircle">
            <h2>Certifications</h2>
          </div>
          <Certs certs={certs} />
          <SeeMoreLinks link='/certs' />
        </section>
      </div>
    </main>
  );
}
