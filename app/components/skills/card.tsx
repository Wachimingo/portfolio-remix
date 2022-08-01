/* eslint-disable react/display-name */
import { Card } from "../common/Card";
import { FaCog, FaTrash } from "react-icons/fa";
import type { Skill } from "~/types/skillsAndCerts";

type Props = {
    skills: Skill[],
    admin?: Boolean
}

export default ({ skills, admin }: Props) => {
    const controls = (skill: Skill) => {
        if (!admin) return <></>;
        return (
            <>
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
            </>
        )
    }
    return <>
        {
            skills.map((skill: Skill, i: number) => {
                return (
                    //@ts-ignore
                    <Card key={i} index={i}>
                        <img
                            loading="lazy"
                            src={skill.icon ? skill.icon : '/assets/skills/default.webp'}
                            alt={skill.name}
                            width="150px"
                            height="150px"
                        />
                        <div>
                            <h1>{skill.name}</h1>
                            <p>
                                {skill.description}
                            </p>
                            <progress value={skill.level} max="100"> {skill.level}%</progress>
                        </div>
                        {controls(skill)}
                    </Card>
                )
            })
        }
    </>
}