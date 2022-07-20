import { json } from "@remix-run/node";
import Dishes from '../models/dishes';
import dbConnect from '../utils/dbConnection';
import { requestErrorHandler } from './errors';

export const getForToday = async (props: any) => {
    await dbConnect();
    return await Dishes.find({ forToday: true }).limit(props.limit)
}

export const getAllDishes = async (props: any) => {
    await dbConnect();
    const dishes = await Dishes.find()
    return dishes;
}

export const actions: any = {
    "GET": async () => {
        try {
            await dbConnect();
            return await Dishes.find().where('locale').equals('en');
        } catch (error) {
            requestErrorHandler(error);
        }
    },
    "POST": async (data: any) => {
        try {
            await dbConnect();
            // const price = await stripe.prices.create({
            //     product: product.id,
            //     unit_amount: body.price[0],
            //     currency: 'usd',
            // });
            const newDish = new Dishes(data);
            await newDish.save();
            return json({ status: 'success', message: 'Posted succesfuly', newDish }, { status: 201 });
        } catch (error) {
            requestErrorHandler(error);
        }
    },
    "PATCH": async ({ dishId, type, ...props }) => {
        try {
            // if (props.price && type === 'update') {
            //     await stripe.prices.update(
            //         props.externalId,
            //         { unit_amount: props.price }
            //     );
            // }
            await dbConnect();
            const res = await Dishes.findByIdAndUpdate({ _id: dishId }, props)
            if (!res) throw 'No ID provided';
            return json({ status: 'success', message: 'Updated succesfuly' }, { status: 201 });
        } catch (error) {
            requestErrorHandler(error);
        }
    },
    "DELETE": async ({ dishId }: any) => {
        try {
            await dbConnect();
            const res = await Dishes.findByIdAndDelete({ _id: dishId })
            if (!res) throw 'No ID provided';
            return json({ status: 'success', message: 'Deleted succesfuly' }, { status: 201 });
        } catch (error) {
            requestErrorHandler(error);
        }
    },
}
