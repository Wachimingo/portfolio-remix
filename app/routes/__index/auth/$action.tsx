// import { toast } from "react-toastify";
// import toastStyle from 'react-toastify/dist/ReactToastify.min.css';
// import { ToastContainer } from "react-toastify";
import { json } from "@remix-run/node";
import { useActionData, useLoaderData } from '@remix-run/react';
import { authForm } from "~/components/authComponents";
import { actions } from "~/controllers/auth";
import authStyles from "~/styles/auth.css";
import formStyles from "~/styles/form.css";

// export const handle = { hydrate: true };

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
        // { rel: "stylesheet", href: toastStyle }
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

    const handler = actions[request.method];
    if (!handler) return json({ status: "error", message: "No method or action found" }, { status: 404 });
    //Properties for the object are HTTP methods (POST,PUT,DELETE)
    return await actions[request.method](data);
    // return json({})
}

const Auth = () => {
    const data = useLoaderData();
    const result = useActionData();

    return (
        <>
            <div className="items-container">
                {authForm(data.action)}
            </div>
            {process.env.NODE_ENV === 'development'
                ? <script
                    defer={true}
                    //@ts-ignore
                    action={data?.action}
                    status={result?.status}
                    user={JSON.stringify(result?.user)}
                    token={result?.token}
                    src='/scripts/auth.js'
                />
                : <script
                    defer={true}
                    //@ts-ignore
                    action={data?.action}
                    status={result?.status}
                    src='/scripts/min/auth-min.js'
                />
            }
            {/* <ToastContainer /> */}
        </>
    )
}

export default Auth;
