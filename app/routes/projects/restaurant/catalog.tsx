import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { json, useFetcher, useLoaderData } from "remix";
import { Card } from "~/components/Card";
import CatalogModal from "~/components/CatalogModal";
import { getAllDishes, actions } from "~/controllers/dishes";
import catalogStyles from "~/styles/catalog.css";

export const links = () => {
    return [
        { rel: 'stylesheet', href: catalogStyles }
    ]
}

export const loader = async () => {
    const dishes = await getAllDishes({ locale: 'en' });
    return json(dishes)
}

export const action = async ({ request }: any) => {
    const body = await request.formData();
    //If there is a nested action inside a HTTP method, then the object will have a type property
    if (body._fields.type[0]) {
        const handler = actions[request.method][body._fields.type[0]]
        if (!handler) return json({ status: "error", message: "No method or action found" })
        //first propery or [] is the HTTP method (POST,PUT,DELETE), the second property or [] is for the nested action
        return json(await actions[request.method ?? 'default'][body._fields.type[0] ?? 'default']({ ...body._fields }))
    }
    else {
        const handler = actions[request.method]
        if (!handler) return json({ status: "error", message: "No method or action found" })
        //Properties for the object are HTTP methods (POST,PUT,DELETE)
        return json(await actions[request.method ?? 'default']({ ...body._fields }))
    }
}

const Catalog = () => {
    const dishes = useLoaderData();
    const fetcher = useFetcher();
    // const [loaded, setLoaded] = useState(false)
    const { data } = fetcher;
    useEffect(() => {
        if (data) {
            //@ts-ignore
            toast[data.status](data.message)
        }
    }, [data])
    return (
        <>
            <h3>Catalog</h3>
            <div className="d-inline-block">
                <Card dishes={dishes ?? []} fetcher={fetcher} />
            </div>
            <CatalogModal />
        </>
    )
}

export default Catalog;