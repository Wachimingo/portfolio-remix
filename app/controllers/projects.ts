import Projects from '../models/projects';
import dbConnect from '../utils/dbConnection';

export const getProjects = async (props: any) => {
    await dbConnect();
    const projects = await Projects.find({}).where('locale').equals(props.locale).limit(props.limit)
    return projects;
}