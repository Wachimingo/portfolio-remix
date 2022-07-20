import { useEffect } from "react";
import { toast } from "react-toastify";
import toastStyle from 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from "react-toastify";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from '@remix-run/react';
import { authForm } from "~/components/authComponents";
import { actions } from "~/controllers/auth";
import authStyles from "~/styles/auth.css";
import formStyles from "~/styles/form.css";
//@ts-ignore
import Cookies from 'js-cookie';

export const meta = () => {
    return {
        title: "Wachimingo | Auth",
        description:
            "User authentication to use this site features",
    };
};

export function links() {
    return [
        { rel: "stylesheet", href: authStyles },
        { rel: "stylesheet", href: formStyles },
        { rel: "stylesheet", href: toastStyle }
    ]
}

export const loader = async ({ params }: any) => {
    return json(params)
}

export const action = async ({ request, params }) => {
    /* Taking the form data from the request and putting it into an object. */
    const body = await request.formData();
    const data: any = {
        params
    };

    for (const pair of body.entries()) {
        data[pair[0]] = pair[1]
    }
    // If there is a nested action inside a HTTP method, then the object will have a type property
    // if (params) {
    //     const handler = actions[request.method][params.action];
    //     if (!handler) return json({ status: "error", message: "No method or action found" });
    //     //first property or [] is the HTTP method (POST,PUT,DELETE), the second property or [] is for the nested action
    //     return await actions[request.method][params.action]({ ...body._fields });
    // }
    // else {
    const handler = actions[request.method];
    if (!handler) return json({ status: "error", message: "No method or action found" }, { status: 404 });
    //Properties for the object are HTTP methods (POST,PUT,DELETE)
    return await actions[request.method](data);
    // }
    // return json({})
}

const Auth = () => {
    const data = useLoaderData();
    const result = useActionData();
    useEffect(() => {
        if (data.action === 'signout') {
            if (Cookies.get('token')) {
                Cookies.remove('name');
                Cookies.remove('email');
                Cookies.remove('token');
                Cookies.remove('role');
                window.location.href = "/";
            }
        }
        if (result) {
            if (result.status === 'success') {
                if (data.action === 'signup') {
                    window.location.href = "/auth/confirmationEmailSent"
                } else {
                    Cookies.set('name', result.user?.name);
                    Cookies.set('email', result.user?.email);
                    Cookies.set('token', result?.token);
                    Cookies.set('role', result.user?.role);
                    window.location.href = "/";
                    // //@ts-ignore
                    // toast[result.status](`Succes! Welcome ${result.user.name}!`);
                }
            } else {
                if (result.status) {
                    //@ts-ignore
                    toast[result.status](result.message)
                }
            }
        }
    }, [result, data.action])

    return (
        <>
            <main>
            </main>
            <div className="items-container">
                {authForm(data.action)}
            </div>
            <ToastContainer />
        </>
    )
}

export default Auth;
