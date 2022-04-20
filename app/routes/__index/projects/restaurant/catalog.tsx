import { useEffect, useState, Suspense, lazy } from "react";
import { toast } from "react-toastify";
import toastStyle from 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from "react-toastify";
import { json, useActionData, useFetcher, useLoaderData } from "remix";
import { Card } from "~/components/Card";
import { getAllDishes, actions } from "~/controllers/dishes";
import catalogStyles from "~/styles/catalog.css";
const CatalogModal = lazy(() => import("~/components/modals/CatalogModal"));

export const links = () => {
    return [
        { rel: 'stylesheet', href: catalogStyles },
        { rel: "stylesheet", href: toastStyle }
    ]
}

export const loader = async () => {
    const dishes = await getAllDishes({});
    return json(dishes)
}

export const action = async ({ request }: any) => {
    const body = await request.formData();
    // If there is a nested action inside a HTTP method, then the object will have a type property
    if (body._fields.type) {
        const handler = actions[request.method][body._fields.type[0]]
        if (!handler) return json({ status: "error", message: "No method or action found" })
        //first property or [] is the HTTP method (POST,PUT,DELETE), the second property or [] is for the nested action
        return await actions[request.method][body._fields.type[0]]({ ...body._fields })
    }
    else {
        const handler = actions[request.method]
        if (!handler) return json({ status: "error", message: "No method or action found" }, { status: 404 })
        //Properties for the object are HTTP methods (POST,PUT,DELETE)
        return await actions[request.method]({ ...body._fields })
    }
    // return json({})
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

const Catalog = () => {
    const dishes = useLoaderData();
    const fetcher = useFetcher();
    const results = useActionData();
    const [dishToModify, setDishToModify] = useState<any>(undefined)
    const { data } = fetcher;
    useEffect(() => {
        if (data) {
            //@ts-ignore
            toast[data.status](data.message)
            document.getElementById('CatalogModalClose')?.click()
        } else if (results) {
            //@ts-ignore
            toast[results.status](results.message);
            document.getElementById('CatalogModalClose')?.click()
        }
    }, [data, results])
    return (
        <>
            <h3>Catalog</h3>
            <div className="d-inline-block">
                <Card
                    dishes={dishes ?? []}
                    fetcher={fetcher}
                    setDishToModify={setDishToModify}
                />
            </div>
            <button
                type='button'
                className="btn btn-info bubbleButton"
                data-bs-toggle="modal"
                data-bs-target="#CatalogModal"
                onClick={() => setDishToModify(undefined)}
            >
                +
            </button>
            <Suspense fallback={<></>}>
                <CatalogModal dishToModify={dishToModify} />
            </Suspense>
            <ToastContainer />
        </>
    )
}

export default Catalog;