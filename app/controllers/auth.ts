import { json } from 'remix';
import User from '~/models/user';
import dbConnect from '~/utils/dbConnection';
import mail from '~/controllers/mail';
import { requestErrorHandler } from './errors';
const bcrypt = require('bcryptjs');
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export const activateUser = async (email: string) => {
    try {
        await dbConnect();
        const jwt = require('jsonwebtoken');
        const user = await User.findOneAndUpdate({ email }, { isActive: true }).select('name email role isActive');
        if (!user) throw 'Not Found'
        if (user.isActive) throw 'Cannot re-use link'
        user.isActive = undefined;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return { user, token };
    } catch (error) {
        return { error, status: "error" }
    }
}

export const actions: any = {
    "GET": {

    },
    "POST": {
        "signin": async (body: any) => {
            try {
                await dbConnect();
                const jwt = require('jsonwebtoken');
                const user = await User.findOne({ email: body.email[0] }).select('+password');

                if (!user || user.password === undefined || !(await user.correctPassword(body.password[0], user.password))) {
                    return json({ status: 'error', message: 'Not found' }, { status: 404 });
                }
                //remove password from output
                user.password = undefined;
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
                return json({ status: 'success', user, token }, { status: 200 });
            } catch (error) {
                requestErrorHandler(error);
            }
        },
        "signup": async (body: any) => {
            try {
                if (body.password[0] !== body.confirmPassword[0]) throw "Passwords don't match";
                const [, stripeUser, pass] = await Promise.all([dbConnect(), stripe.customers.create({
                    name: body.name[0],
                    email: body.email[0],
                    description: 'Test Customer',
                }), bcrypt.hash(body.password[0], 2)])
                const newUser = new User({
                    name: body.name[0],
                    email: body.email[0],
                    password: pass,
                    role: 'user',
                    isActive: false,
                    externalId: stripeUser.id
                })
                await newUser.save();
                mail(body.email[0]).catch(console.error);
                return json({ status: 'success', message: 'Success', user: {} }, { status: 201 });
            } catch (error) {
                requestErrorHandler(error);
            }
        },
    },
}