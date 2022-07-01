import { json } from "@remix-run/node";
import Projects from '~/models/projects';
import dbConnect from '~/utils/dbConnection';
import { requestErrorHandler } from './errors';

export const getProjects = async (props: any) => {
    await dbConnect();
    const projects = await Projects.find({}).where('locale').equals(props.locale).limit(props.limit)
    return projects;
}

export const actions: any = {
    "GET": async () => {
        try {
            await dbConnect();
            return await Projects.find().where('locale').equals('en');
        } catch (error) {
            requestErrorHandler(error);
        }
    },
    "POST": async (body: any) => {
        try {
            await dbConnect();
            const newProject = new Projects({
                name: body.name[0],
                description: body.description[0],
                category: body.category[0],
                status: body.status[0],
                link: body.link[0],
                locale: body.locale[0],
                image: body.image[0],
            });
            await newProject.save();
            return json({ status: 'success', message: 'Posted succesfuly', newProject }, { status: 201 });
        } catch (error) {
            requestErrorHandler(error);
        }
    },
}