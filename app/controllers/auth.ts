import { json } from "@remix-run/node";
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
    "POST": async ({ params, ...props }) => {
        try {
            await dbConnect();
            const jwt = require('jsonwebtoken');
            if (params.action === 'signin') {
                const user = await User.findOne({ email: props.email }).select('+password');
                console.log("TCL: user", user)

                if (!user || user.password === undefined || !(await user.correctPassword(props.password, user.password))) {
                    return json({ status: 'error', message: 'User doesn\'t exists' }, { status: 404 });
                }
                //remove password from output
                user.password = undefined;
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
                console.log('got here')
                return json({ status: 'success', user, token }, { status: 200 });
            }
            if (params.action === 'signup') {
                if (props.password !== props.confirmPassword) throw "Passwords don't match";
                const [, stripeUser, pass] = await Promise.all([dbConnect(), stripe.customers.create({
                    name: props.name,
                    email: props.email,
                    description: 'Test Customer',
                }), bcrypt.hash(props.password, 2)])
                const newUser = new User({
                    name: props.name,
                    email: props.email,
                    password: pass,
                    role: 'user',
                    isActive: false,
                    externalId: stripeUser.id
                })
                await newUser.save();
                mail(props.email).catch(console.error);
                return json({ status: 'success', message: 'Success', user: {} }, { status: 201 });
            }
            return json({});
        } catch (error) {
            requestErrorHandler(error);
        }
    }
}