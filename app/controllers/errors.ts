import { json } from "@remix-run/node";

export const requestErrorHandler = (error: any) => {
    console.log("TCL: error", error)
    if (process.env.NODE_ENV === 'production') {
        //@ts-ignore
        return json({
            status: 'error', message: 'Upps, something when wrong'
        }, { status: error.statusCode ?? 500 });
    } else {
        //@ts-ignore
        return json({ status: 'error', message: error?.message }, { status: error.statusCode ?? 500 });
    }
}