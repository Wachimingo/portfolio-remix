import Bill from '../models/bill';
import dbConnect from '../utils/dbConnection';

export const getOrders = async (props: any) => {
    await dbConnect();
    const orders = await Bill.find({ status: props.status }).limit(props.limit)
    return orders;
}