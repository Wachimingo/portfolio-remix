import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from '@remix-run/react'
import { OrderCard } from "~/components";
import { getOrders, actions } from "~/controllers/orders";

export const meta = () => {
    return {
        title: "Restaurant | Orders",
        description:
            "Check order status",
    };
};

export const loader: LoaderFunction = async ({ params }) => {
    const orders = await getOrders({ status: params.status, limit: 5 });
    return json({ orders, status: params.status })
}

export async function action({ request }: any) {
    let result = {};
    const body = await request.formData();
    //If there is a nested action inside a HTTP method, then the object will have a type property
    if (body._fields.type[0]) {
        const handler = actions[request.method][body._fields.type[0]]
        if (!handler) return json({ status: "error", message: "No method or action found" })
        //first propery or [] is the HTTP method (POST,PUT,DELETE), the second property or [] is for the nested action
        result = await actions[request.method ?? 'default'][body._fields.type[0] ?? 'default']({ ...body._fields })
    }
    else {
        const handler = actions[request.method]
        if (!handler) return json({ status: "error", message: "No method or action found" })
        //Properties for the object are HTTP methods (POST,PUT,DELETE)
        result = await actions[request.method ?? 'default']({ ...body._fields })
    }
    return json(result);
}

const Orders = () => {
    const { orders, status } = useLoaderData();
    return (
        <div className="d-inline-block">
            <h2>Orders</h2>
            <section id='StatusControls'>
                <Link to={'/projects/restaurant/orders/isPending'} className='btn btn-outline-danger ms-2 mb-4'>
                    Pending
                </Link>
                <Link to={'/projects/restaurant/orders/isReady'} className='btn btn-outline-success ms-2 mb-4'>
                    Ready
                </Link>
                <Link to={'/projects/restaurant/orders/completed'} className='btn btn-outline-secondary ms-2 mb-4'>
                    Completed
                </Link>
                <Link to={'/projects/restaurant/orders/cancelled'} className='btn btn-outline-secondary ms-2 mb-4'>
                    Cancelled
                </Link>
            </section>
            <section>
                <OrderCard orders={orders} status={status} />
            </section>
        </div>
    )
}
export default Orders;