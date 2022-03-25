import Dishes from '../models/dishes';
import dbConnect from '../utils/dbConnection';

export const getForToday = async (props: any) => {
    await dbConnect();
    const dishes = await Dishes.find({}).where('locale').equals(props.locale).limit(props.limit)
    return dishes;
}