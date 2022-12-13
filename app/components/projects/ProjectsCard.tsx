import { LinkButton } from "../common/buttons";
import { Card } from "../common/card/Card";
export const ProjectCard = ({ project, extendedClassName }: any) => {
  return (
    <Card key={project.name} extendedClassName={extendedClassName ?? ""}>
      <img className='card-image' src={project.image} alt={project.name} width='100%' height='250px' />
      <div className='card-body'>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      {project.link.includes("http" || "https") ? (
        <LinkButton success link={project.link} target='_blank' rel='noreferrer' role='button'>
          Checkout
        </LinkButton>
      ) : (
        <LinkButton success link={project.link}>
          Checkout
        </LinkButton>
      )}
    </Card>
  );
};
