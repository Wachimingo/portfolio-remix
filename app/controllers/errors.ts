import { json } from "@remix-run/node";

export const requestErrorHandler = (error: any) => {
    if (process.env.NODE_ENV === 'production') {
        //@ts-ignore
        return json({
            status: 'error', message: 'Upps, something when wrong'
        }, { status: error.statusCode ?? 500 });
    } else {
        //@ts-ignore
        throw new Error(error);
    }
}