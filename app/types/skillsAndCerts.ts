export type Category = {
    _id: string
    name: string,
    relatedTo: string,
}

export type Certification = {
    _id: string
    name: string,
    icon?: string,
    description: string,
}

export type Skill = Certification & {
    level: number,
    category: string,
}