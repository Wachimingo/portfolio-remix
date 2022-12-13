import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DatabaseServer from "~/utils/db/mongodb/dbConfig";
import { LinkButton } from "~/components/common/buttons";
import { Div, Main, Section } from "~/components/common/containers";
import { SkillBubble } from "~/components/skills";
import { CertCard } from "~/components/certs/card";
import homeStyles from "~/styles/home.css";
import type { Certification, Skill } from "~/types/skillsAndCerts";
import type { MetaFunction, LinksFunction, LoaderFunction, ErrorBoundaryComponent } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return {
    title: "Welcome",
    description: "Welcome to my portfolio"
  };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: homeStyles }];
};

export const loader: LoaderFunction = async () => {
  DatabaseServer.getInstance();
  const getSkills = DatabaseServer.getDocuments("skills", { locale: "en" }, undefined, 5);
  const getCerts = DatabaseServer.getDocuments("certifications", { locale: "en" }, undefined, 0);

  const [skills, certs] = await Promise.all([getSkills, getCerts]);
  return json({ skills, certs });
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <main>
      <h1>{error.message}</h1>
    </main>
  );
};

type Loader = {
  skills: Skill[];
  certs: Certification[];
};

export const Index = () => {
  const { skills, certs } = useLoaderData<Loader>();
  return (
    <>
      <Main extendedClassName='hidden'>
        <Div row id='welcome' className='welcome'>
          <h1>Welcome</h1>
          <br />
          <img className='profile-pic' src='/assets/profile/profile-pic.webp' alt='profile' loading='lazy' />
        </Div>
      </Main>
      <br />
      <br />
      <br />
      <br />
      <Section id='skills_section' extendedClassName='hidden'>
        <h2>Checkout some of the skills and technologies I handle:</h2>
        <br />
        <Div row>
          {skills.map((skill: any) => {
            return <SkillBubble key={skill.name} skill={skill} />;
          })}
        </Div>
        <br />
        <br />
        <h2>And there a plenty more you can look at here:</h2>
        <LinkButton info id='see_more_skills' link='/skills'>
          Want to see more?
        </LinkButton>
      </Section>
      <br />
      <br />
      <br />
      <Section id='cert_section' extendedClassName='hidden'>
        <h2>This is my learning path for continuos development:</h2>
        <br />
        <Div row>
          {certs.map((cert: any) => (
            <CertCard key={cert.name} extendedClassName='hidden' cert={cert} />
          ))}
        </Div>
        <br />
        <h2>And there a plenty more you can look at here:</h2>
        <br />
        <LinkButton info id='see_more_skills' link='/skills'>
          Want to see more?
        </LinkButton>
      </Section>
      <br />
      <br />
      <br />
      <br />
      <script
        dangerouslySetInnerHTML={{
          __html: `
        const observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting?e.target.classList.add("show"):e.target.classList.remove("show")})}),hiddenElements=document.querySelectorAll(".hidden");hiddenElements.forEach(e=>observer.observe(e));
      `
        }}></script>
    </>
  );
};

export default Index;
