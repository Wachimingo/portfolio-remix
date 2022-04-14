import { json } from 'remix';
import User from '~/models/user';
import dbConnect from '~/utils/dbConnection';
import mail from '~/controllers/mail';
import { requestErrorHandler } from './errors';
const bcrypt = require('bcryptjs');

export const actions: any = {
    "GET": {
        "activateUser": async (email: string) => {
            try {
                await dbConnect();
                const jwt = require('jsonwebtoken');
                const user = await User.findOneAndUpdate({ email }, { isActive: true });
                if (!user) requestErrorHandler({ message: 'Not found', statusCode: 404 })
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                });
                return json({ status: 'success', user, token }, { status: 200 });
            } catch (error) {
                requestErrorHandler(error);
            }
        }
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
                if (body.password[0] !== body.confirmPassword[0]) return json({ status: 'error', message: "Passwords don't match" }, { status: 400 })
                await dbConnect();
                const newUser = new User({
                    name: body.name[0],
                    email: body.email[0],
                    password: await bcrypt.hash(body.password[0], 2),
                    role: 'user',
                    isActive: false
                })
                await newUser.save();
                mail(body.email[0]);
                return json({ status: 'success', message: 'Success', user: {} }, { status: 201 });
            } catch (error) {
                requestErrorHandler(error);
            }
        },
    },
}