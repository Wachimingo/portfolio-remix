export const SkillBubble = ({ skill }: any) => {
  return (
    <>
      <div
        role='progressbar'
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        // style={{`--value:${skill.level}`}}
      >
        <img
          className='skill-icon'
          loading='lazy'
          src={skill.icon ? skill.icon : "/assets/skills/default.webp"}
          alt={skill.name}
          width='150px'
          height='150px'
        />
        <h3>{skill.name}</h3>
      </div>
    </>
  );
};

export default SkillBubble;
