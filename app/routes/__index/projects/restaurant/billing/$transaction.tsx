import { lazy, Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { json, useActionData, useLoaderData } from "remix";
import { Card, InfoTable } from "~/components/billingComponents";
import { actions, getForToday } from "~/controllers/dishes";
import transactionStyles from "~/styles/transaction.css";
const TransactionModal = lazy(() => import("~/components/modals/TransactionModal"));


export const links = () => {
    return [
        { rel: 'stylesheet', href: transactionStyles }
    ]
}

export const loader = async () => {
    const dishes = await getForToday({});
    return json(dishes)
}

export const action = async ({ request }: any) => {
    const body = await request.formData();
    // If there is a nested action inside a HTTP method, then the object will have a type property
    if (body._fields.type) {
        const handler = actions[request.method][body._fields.type[0]]
        if (!handler) return json({ status: "error", message: "No method or action found" })
        //first propery or [] is the HTTP method (POST,PUT,DELETE), the second property or [] is for the nested action
        return await actions[request.method ?? 'default'][body._fields.type[0] ?? 'default']({ ...body._fields })
    }
    else {
        const handler = actions[request.method]
        if (!handler) return json({ status: "error", message: "No method or action found" }, { status: 404 })
        //Properties for the object are HTTP methods (POST,PUT,DELETE)
        return await actions[request.method ?? 'default']({ ...body._fields })
    }
    // return json({})
}

export function ErrorBoundary({ error }: any) {
    console.error(error);
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

const Transaction = () => {
    const dishes = useLoaderData();
    const results = useActionData();
    const [dishCounters, setDishCounters] = useState(() => dishes.map((dish: any) => 0));
    const [selectedDishes, setSelectedDishes] = useState<any>([]);
    const [totalDishes, setTotalDishes] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [agreed, setAgreed] = useState(false)
    useEffect(() => {
        if (results) {
            //@ts-ignore
            toast[results.status](results.message);
            document.getElementById('billingModalClose')?.click()
        }
    }, [results])
    return (
        <>
            <h3>Billing</h3>
            <section id="cardsSection" className="d-inline-block">
                <Card
                    dishes={dishes ?? []}
                    dishCounters={dishCounters}
                    setDishCounters={setDishCounters}
                    selectedDishes={selectedDishes}
                    setSelectedDishes={setSelectedDishes}
                    totalDishes={totalDishes}
                    setTotalDishes={setTotalDishes}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                />
            </section>
            <button
                className="btn btn-info my-4 mx-2"
                data-bs-toggle={selectedDishes.length > 0 ? "modal" : ""}
                data-bs-target="#TransactionModal"
                onClick={() => selectedDishes.length > 0 ? undefined : toast.info('No dish selected')}
            >
                Checkout
            </button>
            <section id='informationSection' className="d-inline-block">
                <InfoTable
                    selectedDishes={selectedDishes}
                    totalDishes={totalDishes}
                    totalPrice={totalPrice}
                    dishCounters={dishCounters}
                    dishes={dishes}
                />
            </section>
            <Suspense fallback={<></>}>
                <TransactionModal
                    selectedDishes={selectedDishes}
                    totalDishes={totalDishes}
                    totalPrice={totalPrice}
                    dishCounters={dishCounters}
                    dishes={dishes}
                    agreed={agreed}
                    setAgreed={setAgreed}
                />
            </Suspense>
        </>
    )
}

export default Transaction;