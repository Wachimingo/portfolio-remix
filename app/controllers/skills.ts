import { json } from '@remix-run/node';
import Skills from '../models/skills';
import dbConnect from '../utils/dbConnection';
import { requestErrorHandler } from './errors';

export const getSkills = async (props: any) => {
    await dbConnect();
    const skills = await Skills.find({}).where('locale').equals(props.locale).limit(props.limit)
    return skills;
}

export const actions: any = {
    "POST": async (data) => {
        try {
            data._id = undefined;
            await dbConnect();
            const newSkill = await Skills.create(data);
            return json({ status: 'success', message: 'Posted succesfully', skill: newSkill }, { status: 201 });
        } catch (error) {
            requestErrorHandler(error);
        }
    },
    "PATCH": async ({ _id, ...props }) => {
        try {
            await dbConnect();
            const updatedSkill = await Skills.findByIdAndUpdate(_id, props);
            if (!updatedSkill) throw new Error('Not found');
            return json({ status: 'success', message: 'Posted succesfully', skill: updatedSkill }, { status: 201 });
        } catch (error) {
            requestErrorHandler(error);
        }
    },
    "DELETE": async ({ _id }) => {
        try {
            await dbConnect();
            await Skills.findByIdAndDelete(_id)
            return json({ message: 'success' }, { status: 204 });
        } catch (error) {
            requestErrorHandler(error);
        }
    }
}