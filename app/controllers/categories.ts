import Categories from '../models/categories';
import dbConnect from '../utils/dbConnection';

export const getCategories = async (props: any) => {
    await dbConnect();
    const categories = await Categories.find().where('locale').equals(props.locale).where('relatedTo').equals(props.relatedTo).limit(props.limit)
    return categories;
}