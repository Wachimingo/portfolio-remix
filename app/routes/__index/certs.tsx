import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { CertCard } from "~/components/certs/CertCard";
import { Div } from "~/components/common/containers/Div";
import { Main } from "~/components/common/containers/Main";
import { Section } from "~/components/common/containers/Section";
import DatabaseServer from "~/utils/db/mongodb/dbConfig";
import certStyles from "~/styles/certCards.css";
import { LinksFunction } from "@remix-run/react/dist/routeModules";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: certStyles }];
};

export const loader: LoaderFunction = async () => {
  DatabaseServer.getInstance();
  const certs = await DatabaseServer.getDocuments("certifications", { locale: "en" }, undefined, 0);
  return json(certs);
};

export default function Certs() {
  const certs = useLoaderData();
  return (
    <>
      <Main>
        <h1>Certifications</h1>
      </Main>
      <Section row>
        <Div row>
          {certs.map((cert: any) => (
            <CertCard key={cert.name} cert={cert} />
          ))}
        </Div>
      </Section>
      <br />
    </>
  );
}
