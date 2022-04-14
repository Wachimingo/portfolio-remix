import { json } from "remix";
import { actions } from "~/controllers/auth"

export async function loader({ params }: any) {
    const user = await actions['GET']['activateUser'](params.email)
    return json(user);
}

export function ErrorBoundary({ error }: any) {
    console.log(error);
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