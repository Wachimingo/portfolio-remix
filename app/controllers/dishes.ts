import Dishes from '../models/dishes';
import dbConnect from '../utils/dbConnection';

export const getForToday = async (props: any) => {
    await dbConnect();
    return await Dishes.find({ forToday: true }).where('locale').equals(props.locale).limit(props.limit)
}

export const getAllDishes = async (props: any) => {
    await dbConnect();
    const dishes = await Dishes.find().where('locale').equals(props.locale)
    return dishes;
}

export const actions: any = {
    "GET": async () => {
        try {
            await dbConnect();
            return await Dishes.find().where('locale').equals('en')
        } catch (error) {
            return error;
        }
    },
    "PATCH": {
        "forToday": async (body: any) => {
            try {
                await dbConnect();
                const res = await Dishes.findByIdAndUpdate({ _id: body.dishId[0] }, { forToday: body.state[0] })
                if (!res) return { status: 'error', message: 'No ID provided' }
                return { status: 'success', message: 'Updated succesfuly' };
            } catch (error) {
                return { status: 'error', message: error };
            }
        }
    },
    "DELETE": async (body: any) => {
        try {
            await dbConnect();
            const res = await Dishes.findByIdAndDelete({ _id: body.dishId[0] })
            if (!res) return { status: 'error', message: 'No ID provided' }
            return { status: 'success', message: 'Deleted succesfuly' };
        } catch (error) {
            return { status: 'error', message: error };
        }
    },
    "default": () => undefined
}
