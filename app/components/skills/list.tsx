import Card from "./card";
import type { Category, Skill } from "~/types/skillsAndCerts"

type Props = {
    skills: Skill[],
    categories: Category[]
}

export const SkillListByCategory = ({ skills, categories }: Props) => {
    const List = categories.map((cat: Category) => {
        if (cat.relatedTo === 'skills') {
            return (
                <section key={cat.name}>
                    <h2 className="notranslate">{cat.name}</h2>
                    {
                        skills.filter((skill: Skill) => skill.category === cat._id).map((skill: Skill) => {
                            return <Card skill={skill} key={skill.name} />
                        })
                    }
                </section>
            )
        } else return undefined;
    })
    return List;
}