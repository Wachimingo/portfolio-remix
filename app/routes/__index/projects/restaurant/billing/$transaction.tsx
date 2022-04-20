import { useEffect, useState } from "react";
import { json, useActionData, useLoaderData } from "remix";
import { useSubmit } from "@remix-run/react";
import { Card } from "~/components/billingComponents";
import { getForToday } from "~/controllers/dishes";
import transactionStyles from "~/styles/transaction.css";
// const TransactionModal = lazy(() => import("~/components/modals/TransactionModal"));
// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')("sk_test_51KPTBHCqE0Zs1JMwRNuPNrCgsj4T3WT8WQjuBJnBpwYTc41MMW8sq0mCqtwPAShoExVDjW63FbQLwP5NTkQ3Kecp003ZrsgpsI");

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
    if (request.method === 'POST') {
        const formData = await request.formData();
        const session = await stripe.checkout.sessions.create({
            line_items: JSON.parse(formData.get('selectedDishes')),
            mode: 'payment',
            success_url: `https://wachimingo.vercel.app?success=true`,
            cancel_url: `https://wachimingo.vercel.app?canceled=true`,
        });
        return json({ session })
    }
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
    const submit = useSubmit();
    const [dishCounters, setDishCounters] = useState(() => dishes.map((dish: any) => 0));
    const [selectedDishes, setSelectedDishes] = useState<any>([]);
    const [totalDishes, setTotalDishes] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        if (results) {
            window.open(results.session.url, '_blank');
        }
    }, [results]);

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
                onClick={() => {
                    const formData = new FormData();
                    let formattedList = selectedDishes.map((dish: any, i: number) => {
                        // const index = items.indexOf(item); // as the counter state position of the items is based in the items array, we need to get the position in that variable, else the render won't find what to render
                        const indexArray = dishes.map((OldItem: any, i: number) => {
                            if (OldItem!.name === dish.name) {
                                return i;
                            } return undefined;
                        })
                        const index: any = indexArray.filter((x: any) => { return x !== undefined })
                        return {
                            price: dish.externalId,
                            quantity: dishCounters[index]
                        }
                    })
                    formData.append('selectedDishes', JSON.stringify(formattedList))
                    submit(formData, { method: "post", action: "/projects/restaurant/billing/sell" })
                }}
            >
                Checkout
            </button>
            <section>
                <p>This is a test enviroment, you can test the payments using any of the test cards from the link below</p>
                <a href="https://stripe.com/docs/testing#cards">Stripe Test Cards</a>
            </section>
        </>
    )
}

export default Transaction;