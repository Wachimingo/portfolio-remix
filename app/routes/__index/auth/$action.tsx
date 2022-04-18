import { useEffect } from "react";
import { toast } from "react-toastify";
import { json, Link, useActionData, useLoaderData } from "remix";
import { authForm } from "~/components/authComponents";
import { actions } from "~/controllers/auth";
import authStyles from "~/styles/auth.css";
//@ts-ignore
import Cookies from 'js-cookie';
export function links() {
    return [
        { rel: "stylesheet", href: authStyles }
    ]
}

export const loader = async ({ params }: any) => {
    return json(params)
}

export const action = async ({ request, params }: any) => {
    const body = await request.formData();
    // If there is a nested action inside a HTTP method, then the object will have a type property
    if (params) {
        const handler = actions[request.method][params.action];
        if (!handler) return json({ status: "error", message: "No method or action found" });
        //first property or [] is the HTTP method (POST,PUT,DELETE), the second property or [] is for the nested action
        return await actions[request.method][params.action]({ ...body._fields });
    }
    else {
        const handler = actions[request.method];
        if (!handler) return json({ status: "error", message: "No method or action found" }, { status: 404 });
        //Properties for the object are HTTP methods (POST,PUT,DELETE)
        return await actions[request.method]({ ...body._fields });
    }
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
        <section className="container mb-4 mt-4">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                        <div className="card-body p-5 text-center">
                            {authForm(data.action)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Auth;
