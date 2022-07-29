import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getSkills } from '~/controllers/skills';
import { getCategories } from '~/controllers/categories';
import { getCerts } from "~/controllers/certs";
import Certs from "~/components/certs/card";
import { SeeMoreLinks } from "~/components/landingPage/seeMoreLink";
import { SkillListByCategory as Skills } from "~/components/skills/list";
import type { Category, Certification, Skill } from "~/types/skillsAndCerts";
import type { MetaFunction, LinksFunction, LoaderFunction, ErrorBoundaryComponent } from '@remix-run/node';
import type { FC } from "react";
import rootStyles from '~/styles/min/root.css';
import cardStyle from '~/styles/min/card.css';

export const meta: MetaFunction = () => {
  return {
    title: "Welcome",
    description:
      "Welcome to my portfolio",
  };
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: rootStyles, media: process.env.MEDIA_CSS },
    { rel: "stylesheet", href: cardStyle, media: process.env.MEDIA_CSS },
  ]
}

export const loader: LoaderFunction = async () => {
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

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
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

export const Index: FC = () => {
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

export default Index;
