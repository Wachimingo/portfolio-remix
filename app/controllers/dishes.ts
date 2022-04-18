import { json } from 'remix';
import Dishes from '../models/dishes';
import dbConnect from '../utils/dbConnection';
import { requestErrorHandler } from './errors';

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

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
    "POST": async (body: any) => {
        try {
            await dbConnect();
            const product = await stripe.products.create({ name: body.name[0] });
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: body.price[0],
                currency: 'usd',
            });
            const newDish = new Dishes({
                name: body.name[0],
                description: body.description[0],
                price: body.price[0],
                image: body.image[0],
                externalId: price.id
            });
            await newDish.save();
            return json({ status: 'success', message: 'Posted succesfuly', newDish }, { status: 201 });
        } catch (error) {
            requestErrorHandler(error);
        }
    },
    "PATCH": {
        "forToday": async (body: any) => {
            try {
                await dbConnect();
                const res = await Dishes.findByIdAndUpdate({ _id: body.dishId[0] }, { forToday: body.state[0] })
                if (!res) return { status: 'error', message: 'No ID provided' }
                return json({ status: 'success', message: 'Updated succesfuly' }, { status: 201 });
            } catch (error) {
                requestErrorHandler(error);
            }
        },
        "update": async (body: any) => {
            try {
                await dbConnect();
                const res = await Dishes.findByIdAndUpdate({ _id: body.dishId[0] },
                    {
                        name: body.name[0],
                        description: body.description[0],
                        price: body.price[0],
                        image: body.image[0]
                    }
                )
                if (!res) return json({ status: 'error', message: 'No ID provided' }, { status: 500 })
                return json({ status: 'success', message: 'Updated succesfuly' }, { status: 201 });
            } catch (error) {
                requestErrorHandler(error);
            }
        },
    },
    "DELETE": async (body: any) => {
        try {
            await dbConnect();
            const res = await Dishes.findByIdAndDelete({ _id: body.dishId[0] })
            if (!res) return { status: 'error', message: 'No ID provided' }
            return json({ status: 'success', message: 'Deleted succesfuly' }, { status: 201 });
        } catch (error) {
            requestErrorHandler(error);
        }
    },
}
