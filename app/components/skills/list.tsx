import Card from "./card";
import type { Category, Skill } from "~/types/skillsAndCerts"

export const SkillListByCategory = ({ skills, categories }) => {
    return <>
        {
            categories.map((cat: Category) => {
                if (cat.relatedTo === 'skills') {
                    return (
                        <section key={cat.name}>
                            <h2 className="">{cat.name}</h2>
                            <Card skills={skills.filter((skill: Skill) => skill.category === cat._id)} />
                        </section>
                    )
                } else return undefined
            })
        }
    </>
}