import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import toastStyle from 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from "react-toastify";
import { json } from "@remix-run/node";
import { useActionData, useFetcher, useLoaderData } from "@remix-run/react";
import { Card, CatalogControls } from "~/components";
import { getAllDishes, actions } from "~/controllers/dishes";
import catalogStyles from "~/styles/catalog.css";
import formStyles from "~/styles/form.css";
import CatalogModal from "~/components/modals/CatalogModal";

export const meta = () => {
    return {
        title: "Restaurant | Catalog",
        description:
            "Dishes we offere",
    };
};

export const links = () => {
    return [
        { rel: 'stylesheet', href: catalogStyles, media: "none" },
        { rel: 'stylesheet', href: formStyles, media: "none" },
        { rel: "stylesheet", href: toastStyle, media: "none" }
    ]
}

export const loader = async () => {
    const dishes = await getAllDishes({});
    return json(dishes)
}

export const action = async ({ request }) => {
    /* Taking the form data from the request and putting it into an object. */
    const body = await request.formData();
    const data: any = {};

    for (const pair of body.entries()) {
        data[pair[0]] = pair[1]
    }

    /* Checking if the request method is in the actions object. If it is, it will return the data. If
    not, it will return an error. */
    const handler = actions[request.method];
    if (!handler) return json({ status: "error", message: "No method or action found" }, { status: 404 });
    return await actions[request.method](data);
    // return json({});
}

export function ErrorBoundary({ error }: any) {
    return (
        <main>
            <h1>{error.message}</h1>
        </main>
    );
}

const Catalog = () => {
    const dishes = useLoaderData();
    const fetcher = useFetcher();
    const results = useActionData();
    const [dishToModify, setDishToModify] = useState<any>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const { data } = fetcher;
    useEffect(() => {
        if (data) {
            //@ts-ignore
            toast[data.status](data.message)
            setIsOpen(isOpen => !isOpen);
        } else if (results) {
            //@ts-ignore
            toast[results.status](results.message);
            setIsOpen(isOpen => !isOpen);
        }
    }, [data, results]);
    return (
        <>
            <main>
                <h1>Catalog</h1>
            </main>
            <section className="items-container">
                {
                    dishes?.map((dish: any) => {
                        return (
                            <Card key={dish.name}>
                                {CatalogControls(dish, fetcher, dishToModify, setDishToModify, isOpen, setIsOpen)}
                                <img
                                    src={`https://images.weserv.nl/?url=${dish.image}&w=150&h=150`}
                                    alt={dish.name}
                                    loading="lazy"
                                    width="auto"
                                    height="auto"
                                />
                                <div>
                                    <h1>{dish.name}</h1>
                                    <p className="card-text">{dish.description}</p>
                                    <p className="card-text">${dish.price}</p>
                                </div>
                            </Card>
                        );
                    })
                }
            </section>
            <CatalogModal dishToModify={dishToModify} isModalOpen={isOpen} setIsModalOpen={setIsOpen} />
            <ToastContainer />
            <button
                type='button'
                className="bubble-btn"
                onClick={() => {
                    setDishToModify(dishToModify => undefined)
                    setIsOpen(isOpen => !isOpen)
                }}
            >
                +
            </button>
        </>
    )
}

export default Catalog;