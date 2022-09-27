/* eslint-disable react/display-name */
import type { ReactChild } from "react";
import type { Skill } from "~/types/skillsAndCerts";
import { Card } from "../common/Card";
import { FaCog, FaTrash } from "react-icons/fa";

type Props = {
    children?: ReactChild | ReactChild[],
    skill: Skill,
}

const SkillCard = ({ children, skill }: Props) => {
    return <Card key={skill.name}>
        <img
            loading="lazy"
            src={skill.icon ? skill.icon : '/assets/skills/default.webp'}
            alt={skill.name}
            width="150px"
            height="150px"
        />
        <div>
            <h1 className="notranslate">{skill.name}</h1>
            <p>
                {skill.description}
            </p>
            <progress value={skill.level} max="100"> {skill.level}%</progress>
        </div>
        <>
            {children}
        </>
    </Card>
}

export const adminSkillCard = ({ skill }: Props) => {
    return <SkillCard skill={skill}>
        <FaCog
            id={`${skill.name}_modify_btn`}
            className='card-modify-btn'
            data-skill-id={skill._id}
            data-skill-name={skill.name}
            data-skill-description={skill.description}
            data-skill-category={skill.category}
            data-skill-level={skill.level}
            data-skill-icon={skill.icon}
        >
            Modify
        </FaCog>
        <FaTrash
            id={`${skill.name}_remove_btn`}
            className='card-remove-btn'
            data-skill-id={skill._id}
        >
            Remove
        </FaTrash>
    </SkillCard>
}

export default SkillCard;