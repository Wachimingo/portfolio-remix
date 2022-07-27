import { Card } from "../Card"
import type { Category, Skill } from "~/types/skillsAndCerts"

export const SkillCardList = ({ skills }) => {
    return <>
        {
            skills.map((skill: Skill, i: number) => {
                return (
                    <Card key={i} index={i}>
                        <img
                            loading="lazy"
                            src={skill.icon ? skill.icon : './assets/skills/default.webp'}
                            alt={skill.name}
                        />
                        <div>
                            <h1>{skill.name}</h1>
                            <p>
                                {skill.description}
                            </p>
                            <progress value={skill.level} max="100"> {skill.level}%</progress>
                        </div>
                    </Card>
                )
            })
        }
    </>
}

export const SkillCardListByCategory = ({ skills, categories }) => {
    return <>
        {
            categories.map((cat: Category) => {
                if (cat.relatedTo === 'skills') {
                    return (
                        <section key={cat.name}>
                            <h2 className="">{cat.name}</h2>
                            <SkillCardList skills={skills.filter((skill: Skill) => skill.category === cat._id)} />
                        </section>
                    )
                } else return undefined
            })
        }
    </>
}