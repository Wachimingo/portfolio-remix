import { LinkButton } from "../common/buttons";
import { Card } from "../common/card/Card";
export const ProjectsCard = ({ project, extendedClassName }: any) => {
  return (
    <Card key={project.name} extendedClassName={extendedClassName ?? ""}>
      <img className='card-image' src={project.image} alt={project.name} width='150px' height='150px' />
      <div className='card-body'>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>
      <LinkButton success link={project.link} target='_blank' rel='noreferrer' role='button'>
        Checkout
      </LinkButton>
    </Card>
  );
};

export default ProjectsCard;
