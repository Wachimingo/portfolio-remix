import { Card } from "../../common/card";
export const SkillCard = ({ children, skill }: any) => {
  return (
    <Card key={skill.name}>
      <img className='card-image' loading='lazy' src={skill.icon ? skill.icon : "/assets/skills/default.webp"} alt={skill.name} width='150px' height='150px' />
      <div className='card-body'>
        <h1 className='notranslate'>{skill.name}</h1>
        <p>{skill.description}</p>
        <progress value={skill.level} max='100' />
      </div>
      {children}
    </Card>
  );
};

export default SkillCard;
