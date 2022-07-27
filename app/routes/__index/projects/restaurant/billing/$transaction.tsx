import { useEffect, useState } from "react";
import { json } from "@remix-run/node";
// import { toast } from "react-toastify";
// import toastStyle from 'react-toastify/dist/ReactToastify.min.css';
// import { ToastContainer } from "react-toastify";
import {
    // useSubmit, 
    useActionData, useLoaderData
} from "@remix-run/react";
import { getForToday } from "~/controllers/dishes";
import transactionStyles from "~/styles/transaction.css";
import formStyles from "~/styles/form.css";
import { Card } from "~/components";
// import TransacionModal from "~/components/modals/TransacionModal";
import { FaCartPlus, FaTrash } from "react-icons/fa";
import { increaseCount, decreaseCount } from "~/controllers/billing";

export const meta = () => {
    return {
        title: "Restaurant | Transactions",
        description:
            "Sell/Buy dishes online",
    };
};

export const links = () => {
    return [
        { rel: 'stylesheet', href: transactionStyles, media: "none" },
        { rel: 'stylesheet', href: formStyles, media: "none" },
        // { rel: "stylesheet", href: toastStyle }
    ]
}

export const loader = async () => {
    const dishes = await getForToday({});
    return json(dishes)
}

// export const action = async ({ request }: any) => {
//     if (request.method === 'POST') {
//         // Set your secret key. Remember to switch to your live secret key in production.
//         // See your keys here: https://dashboard.stripe.com/apikeys
//         const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
//         const formData = await request.formData();
//         // const session = await stripe.checkout.sessions.create({
//         //     line_items: JSON.parse(formData.get('selectedDishes')),
//         //     mode: 'payment',
//         //     success_url: `https://wachimingo.vercel.app?success=true`,
//         //     cancel_url: `https://wachimingo.vercel.app?canceled=true`,
//         // });
//         return json({ session })
//     }
// }

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
    // const submit = useSubmit();
    const [dishCounters, setDishCounters] = useState(() => dishes.map((dish: any) => 0));
    const [selectedDishes, setSelectedDishes] = useState<any>([]);
    const [totalDishes, setTotalDishes] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    // const itemsProps = {
    //     dishes,
    //     dishCounters,
    //     setDishCounters,
    //     selectedDishes,
    //     setSelectedDishes,
    //     totalDishes,
    //     setTotalDishes,
    //     totalPrice,
    //     setTotalPrice
    // }

    useEffect(() => {
        if (results) {
            window.open(results.session.url, '_blank');
        }
    }, [results]);

    return (
        <>
            <main>
                <h3>Billing</h3>
            </main>
            <section id="cardsSection" className="items-container">
                {
                    dishes.map((dish, i) => {
                        return <Card key={dish.name}>
                            <img
                                src={`https://images.weserv.nl/?url=${dish.image}&w=150&h=150`}
                                alt={dish.name}
                            />
                            <div className="content">
                                <h1>{dish.name}</h1>
                                <p>{dish.description}</p>
                                <p>${dish.price}</p>
                                <h4>Amount: {dishCounters[i]}</h4>
                            </div>
                            <div className="control">
                                <button
                                    type="button"
                                    className="increase-amount-button"
                                    onClick={() => increaseCount(
                                        i,
                                        JSON.parse(JSON.stringify(dish)),
                                        dishCounters[i],
                                        dishCounters,
                                        setDishCounters,
                                        totalDishes,
                                        setTotalDishes,
                                        selectedDishes,
                                        setSelectedDishes,
                                        totalPrice,
                                        setTotalPrice
                                    )}
                                >
                                    <FaCartPlus />
                                </button>
                                <button
                                    type="button"
                                    className="decrease-amount-button"
                                    onClick={() => decreaseCount(
                                        i,
                                        JSON.parse(JSON.stringify(dish)),
                                        dishCounters[i],
                                        dishCounters,
                                        setDishCounters,
                                        totalDishes,
                                        setTotalDishes,
                                        selectedDishes,
                                        setSelectedDishes,
                                        totalPrice,
                                        setTotalPrice
                                    )}
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </Card>
                    })
                }
            </section>
            {/* <button
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
            </section> */}
        </>
    )
}

export default Transaction;