import Skills from '../models/skills';
import dbConnect from '../utils/dbConnection';

export const getSkills = async (props: any) => {
    await dbConnect();
    const skills = await Skills.find({}).where('locale').equals(props.locale)
    return skills;
}