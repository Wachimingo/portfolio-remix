import { json } from 'remix';
import User from '~/models/user';
export const actions: any = {
    "POST": {
        "signin": async (body: any) => {
            try {
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
                return json({ status: 'error', message: 'Upps, something went wrong' }, { status: 500 });
            }
        },
        "signup": async (body: any) => {

        },
        // "external": async (req: NextApiRequest, res: NextApiResponse) => {
        //     const response = await fetch(`${process.env.managementBackend}/api/v1/users/login`, {
        //         method: 'POST',
        //         mode: 'cors',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             email: req.body.email,
        //             password: req.body.password
        //         })
        //     });
        //     const data = await response.json();
        //     // console.log("response: ", data)
        //     if (response.ok) {
        //         res.status(200).json(data)
        //     } else {
        //         res.status(400).json(data)
        //     }
        // },
    },
}