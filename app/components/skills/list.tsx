import Card from "./card";
import type { Category, Skill } from "~/types/skillsAndCerts"

type Props = {
    skills: Skill[],
    categories: Category[]
}

export const SkillListByCategory = ({ skills, categories }: Props) => {
    return <>
        {
            categories.map((cat: Category) => {
                if (cat.relatedTo === 'skills') {
                    return (
                        <section key={cat.name}>
                            <h2>{cat.name}</h2>
                            <Card skills={skills.filter((skill: Skill) => skill.category === cat._id)} />
                        </section>
                    )
                } else return undefined
            })
        }
    </>
}