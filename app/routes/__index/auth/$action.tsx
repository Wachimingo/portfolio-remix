import { useEffect } from "react";
import { toast } from "react-toastify";
import { Form, json, useActionData, useLoaderData } from "remix";
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
        const handler = actions[request.method][params.action]
        if (!handler) return json({ status: "error", message: "No method or action found" })
        //first property or [] is the HTTP method (POST,PUT,DELETE), the second property or [] is for the nested action
        return await actions[request.method][params.action]({ ...body._fields })
    }
    else {
        const handler = actions[request.method]
        if (!handler) return json({ status: "error", message: "No method or action found" }, { status: 404 })
        //Properties for the object are HTTP methods (POST,PUT,DELETE)
        return await actions[request.method]({ ...body._fields })
    }
    // return json({})
}

const Auth = () => {
    const data = useLoaderData();
    const result = useActionData();
    useEffect(() => {
        if (data.action === 'signout') {
            Cookies.remove('name');
            Cookies.remove('email');
            Cookies.remove('token');
            Cookies.remove('role');
        }
        if (result) {
            if (result.status === 'success') {
                Cookies.set('name', result.user.name);
                Cookies.set('email', result.user.email);
                Cookies.set('token', result.token);
                Cookies.set('role', result.user.role);
                //@ts-ignore
                toast[result.status](`Succes! Welcome ${result.user.name}!`);
            } else {
                //@ts-ignore
                toast[result.status](result.message)
            }
        }
    }, [result, data.action])

    return (
        <section className="gradient-custom">
            <h1>{data.action}</h1>
            <div className="container mb-4">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5 text-center">
                                <Form method="post" action='/auth/signin' className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50">Please enter your login and password!</p>
                                    <div className="form-outline form-white">
                                        <input
                                            type="email"
                                            name='email'
                                            id="typeEmailX"
                                            className="form-control form-control-lg"
                                        // value='joshuaguillen.adoc@live.com'
                                        />
                                        <label className="form-label" htmlFor="typeEmailX">Email</label>
                                    </div>
                                    <div className="form-outline form-white">
                                        <input
                                            type="password"
                                            name="password"
                                            id="typePasswordX"
                                            className="form-control form-control-lg"
                                        // value='123456'
                                        />
                                        <label className="form-label" htmlFor="typePasswordX">Password</label>
                                    </div>
                                    {/* <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p> */}
                                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                </Form>
                                <div className="d-flex justify-content-center text-center pt-1">

                                </div>
                                <div>
                                    <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Auth;
