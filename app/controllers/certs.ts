import Certifications from '../models/certifications';
import dbConnect from '../utils/dbConnection';

export const getCerts = async (props: any) => {
    await dbConnect();
    const certs = await Certifications.find({}).where('locale').equals(props.locale).limit(props.limit)
    return certs;
}