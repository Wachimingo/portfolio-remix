import { useEffect } from "react";
import { json, Link, useLoaderData } from "remix";
import { activateUser } from "~/controllers/auth";
import authStyles from "~/styles/auth.css";
//@ts-ignore
import Cookies from 'js-cookie';

export function links() {
    return [
        { rel: "stylesheet", href: authStyles }
    ]
}

export const loader = async ({ params }: any) => {
    const user = await activateUser(params.email);
    return json(user);
}

export function ErrorBoundary({ error }: any) {
    return (
        <html>
            <head>
                <title>Oh no!</title>
            </head>
            <body>
            </body>
        </html>
    );
}

const EmailConfirmation = () => {
    const result = useLoaderData<any>();
    useEffect(() => {
        if (result) {
            if (result.error) return undefined
            Cookies.set('name', result.user?.name);
            Cookies.set('email', result.user?.email);
            Cookies.set('token', result.user.token);
            Cookies.set('role', result.user?.role);
        }
    })
    return (
        <section className="container mb-4 mt-4">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                        <div className="card-body p-5 text-center">
                            {
                                result.error
                                    ? <>
                                        <p>{result.error}</p>
                                        <Link to="/">Go to Home</Link>
                                    </>
                                    : <>
                                        <p>Thanks for confirming your account.</p>
                                        <p>You can close this page.</p>
                                        <Link to="/">Go to Home</Link>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmailConfirmation;