import { json, Link, LoaderFunction, useLoaderData } from "remix";
import { OrderCard } from "~/components/Card";
import { getOrders } from "~/controllers/orders";

export const loader: LoaderFunction = async ({ params }) => {
    const orders = await getOrders({ status: params.status, limit: 5 });
    return json(orders)
}

const Orders = () => {
    const orders = useLoaderData();
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
            </section>
            <section>
                <OrderCard orders={orders} />
            </section>
        </div>
    )
}
export default Orders;