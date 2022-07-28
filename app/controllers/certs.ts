import { json } from '@remix-run/node';
import Certifications from '../models/certifications';
import dbConnect from '../utils/dbConnection';
import { requestErrorHandler } from './errors';

export const getCerts = async (props: any) => {
    await dbConnect();
    const certs = await Certifications.find({}).where('locale').equals(props.locale).limit(props.limit)
    return certs;
}

export const actions: any = {
    "POST": async (data) => {
        try {
            data._id = undefined;
            await dbConnect();
            const newCert = await Certifications.create(data);
            return json({ status: 'success', message: 'Posted succesfully', cert: newCert }, { status: 201 });
        } catch (error) {
            requestErrorHandler(error);
        }
    },
    "PATCH": async ({ _id, ...props }) => {
        try {
            await dbConnect();
            const updatedCert = await Certifications.findByIdAndUpdate(_id, props);
            if (!updatedCert) throw new Error('Not found');
            return json({ status: 'success', message: 'Posted succesfully', cert: updatedCert }, { status: 201 });
        } catch (error) {
            requestErrorHandler(error);
        }
    },
    "DELETE": async ({ _id }) => {
        try {
            await dbConnect();
            await Certifications.findByIdAndDelete(_id)
            return json({ message: 'success' }, { status: 204 });
        } catch (error) {
            requestErrorHandler(error);
        }
    }
}