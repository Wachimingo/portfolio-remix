import Bill from '../models/bill';
import dbConnect from '../utils/dbConnection';

//For dataLoader
export const getOrders = async (props: any) => {
    await dbConnect();
    const orders = await Bill.find({ status: props.status }).limit(props.limit)
    return orders;
}

//For actions loader
export const actions: any = {
    "PATCH": {
        "status": async (body: any) => {
            await dbConnect();
            const order = await Bill.findByIdAndUpdate({ _id: body.id[0] }, { status: body.status[0] })
            return order;
        },
        "default": () => {
            return 'Action not found'
        }
    },
    "default": () => {
        return 'Action not found'
    }
}