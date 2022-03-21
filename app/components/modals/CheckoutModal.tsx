import React, { useState, useEffect, memo } from "react";
const classes = require('../../styles/modal.module.css');
import { closeXButton, h3Title, modalBox } from '../../styles/modalsAndFormsInlineJS';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/checkouts/CheckoutForm";
import { bitcoin, creditCard } from "../../controllers/checkout";
import { Dish, SelectedDishes } from "../../interfaces/Dish";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

type CheckoutModalProps = {
    showModal: string,
    setShowModal: Function,
    items: Dish[],
    selectedDishes: any,
    dishCounters: Array<number>,
    totalDishes: number,
    totalPrice: number,
    token: string,
    userId: string,
    role: string,
    customer: string,
    locale?: string,
}

export const CheckoutModal = memo(({
    showModal,
    setShowModal,
    items,
    selectedDishes,
    dishCounters,
    totalDishes,
    totalPrice,
    token,
    userId,
    role,
    customer,
    locale,
}: CheckoutModalProps) => {
    const [clientSecret, setClientSecret] = useState(undefined);
    const [type, setType] = useState('details');

    useEffect(() => {
        if (showModal === 'hidden') setType('details')
    }, [showModal])

    const closeModal = () => {
        setShowModal('hidden');
    }
    const appearance: any = {
        theme: 'night',
        labels: 'floating'
    };

    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div id="review-modal" className={`${showModal} ${modalBox} ${classes.aligment}`}>
            <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
                <div className="bg-white rounded-lg shadow relative dark:bg-gray-700">
                    <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className={h3Title}>
                            {locale === 'en' ? 'Total Dishes' : 'Total de platos'}
                        </h3>
                        <button type="button"
                            className={closeXButton}
                            onClick={closeModal}>
                            X
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        {
                            type === 'details'
                                ? transactionDetails(
                                    items,
                                    selectedDishes,
                                    dishCounters,
                                    totalDishes,
                                    totalPrice,
                                    token,
                                    userId,
                                    customer,
                                    setClientSecret,
                                    setType,
                                    locale
                                )
                                : undefined
                        }
                        {
                            type === 'credit'
                                ? clientSecret
                                    ?
                                    <Elements options={options} stripe={stripePromise}>
                                        <CheckoutForm />
                                    </Elements>
                                    : undefined
                                : undefined
                        }
                        {
                            type === 'bitcoin'
                                ? <iframe src={`https://dev-checkout.opennode.com/${clientSecret}`} style={{ height: "70vh", width: "100%", border: "none" }}></iframe>
                                : undefined
                        }
                    </div>
                </div>
            </div>
        </div>
    )
});

const transactionDetails = (
    items: Dish[],
    selectedDishes: SelectedDishes[],
    dishCounters: number[],
    totalDishes: number,
    totalPrice: number,
    token: string,
    userId: string,
    customer: string,
    setClientSecret: Function,
    setType: Function,
    locale?: string
) => {
    return (
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2>{locale === 'en' ? 'Info' : 'Informacion'}</h2>
            <table className="table-fixed border-2">
                <thead>
                    <tr className="border-2 bg-slate-400">
                        <th className="border-2 w-10">#</th>
                        <th className="border-2">{locale === 'en' ? 'Dish' : 'Platillo'}</th>
                        <th className="border-2">{locale === 'en' ? 'Quantity' : 'Cantidad'}</th>
                        <th className="border-2">{locale === 'en' ? 'Price' : 'Precio'}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedDishes?.map((item: any, i: number) => {
                            // const index = items.indexOf(item); // as the counter state position of the items is based in the items array, we need to get the position in that variable, else the render won't find what to render
                            const indexArray = items.map((OldItem: any, i: number) => {
                                if (OldItem.name === item.name) {
                                    return i;
                                }
                            })
                            const index: any = indexArray.filter((x: any) => { return x !== undefined })
                            return (
                                dishCounters[index] > 0
                                    ?
                                    <>
                                        <tr className="border-2">
                                            <td className="border-2 w-10">{i + 1}</td>
                                            <td className="border-2 w-96">{item!.name}</td>
                                            <td className="border-2 w-20">{dishCounters[index]}</td>
                                            <td className="border-2 w-20">${dishCounters[index] * item!.price}</td>
                                        </tr>
                                    </>
                                    : undefined
                            )
                        })
                    }
                </tbody>
            </table>
            <br />
            <br />
            <table className="table-auto border-2 xl:ml-28 ">
                <thead>
                    <tr className="border-2 bg-slate-400">
                        <th className="border-2">{locale === 'en' ? 'Total Dishes' : 'Total de platos'}</th>
                        <th className="border-2">{locale === 'en' ? 'Total Payment' : 'Total a pagar'}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-2">
                        <td className="border-2 w-40">
                            {totalDishes}
                        </td>
                        <td className="border-2 w-40">
                            ${totalPrice}
                        </td>
                    </tr>
                </tbody>
            </table>
            <br />
            <h3>{locale === 'en' ? 'Payment method' : 'Metodo de pago'}</h3>
            <br />
            <button
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
            >
                {locale === 'en' ? 'Cancel' : 'Canelar'}
            </button>
            <button
                // onClick={() => processTransaction(props.totalPrice, props.totalDishes, props.token, props.userId, props.customer, props.selectedDishes, props.dishCounters, props.items)}
                onClick={
                    () => creditCard(
                        items,
                        selectedDishes,
                        dishCounters,
                        totalDishes,
                        totalPrice,
                        token,
                        userId,
                        customer,
                        setClientSecret,
                        setType
                    )
                }
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                style={{ marginLeft: "2vw" }}
            >
                {locale === 'en' ? 'Card' : 'Tarjeta'}
            </button>
            <button
                onClick={
                    () => bitcoin(
                        items,
                        selectedDishes,
                        dishCounters,
                        totalDishes,
                        totalPrice,
                        token,
                        userId,
                        customer,
                        setClientSecret,
                        setType
                    )
                }
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                style={{ marginLeft: "2px" }}
            >
                Bitcoin
            </button>
        </div>
    )
}