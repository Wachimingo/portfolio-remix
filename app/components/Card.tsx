import { Dish, Order } from "../interfaces/Dish";
import { updateStatus } from "../controllers/orders";
import { Link } from "remix";

type CardProps = {
    item: Dish,
}

export const Card = ({ item }: CardProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg samsungS8:w-32 content-center">
            <img className="w-screen" id={`img_${item?._id}`} src={`${item?.image}`} alt={item?.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2" id={`title_${item?._id}`}>{item?.name}</div>
                <p className="text-gray-700 text-base text-sm" id={`description_${item?._id}`}>
                    {item?.description}
                </p>
                <p className="text-gray-700 text-base" id={`price_${item?._id}`}>
                    ${item?.price}
                </p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{item?.category?.name}</span>
            </div>
        </div>
    )
}

type OrderCardProps = {
    order: Order,
    role: string,
    token: string,
    locale?: string,
}

export const OrderCard = ({ order, role, token, locale }: OrderCardProps) => {
    return (
        <div key={'order' + order._id} className="max-w-sm rounded overflow-hidden shadow-lg card inline-block mx-2 xsm:w-screen" >
            <div className="px-6 py-4">
                {
                    role === 'admin'
                        ?
                        <div className="font-bold text-xl mb-2" >
                            <h5>
                                {locale === 'en' ? 'Submitter:' : 'Pedido por:'} {order.user.name}
                            </h5>
                        </div>
                        : undefined
                }

                <p className="text-gray-700 text-base text-sm" >
                    {locale === 'en' ? 'Total dishes' : 'Total de platos'}: {order.totalDishes}
                </p>
                <p className="text-gray-700 text-base" >
                    {locale === 'en' ? 'Payment' : 'Total a pagar'}: ${order.totalPrice}
                </p>
                <p className="text-gray-700 text-base" >
                    {locale === 'en' ? 'Date' : 'Fecha'}: {order.createdAt}
                </p>
                {
                    order.status === 'isPending'
                        ?
                        <p className="text-red-700 text-base" >
                            <span className="text-gray-700">{locale === 'en' ? 'Status' : 'Estado'}:</span> {locale === 'en' ? 'Pending' : 'Pendiente'}
                        </p> : undefined
                }
                {
                    order.status === 'isReady'
                        ?
                        <p className="text-green-700 text-base" >
                            <span className="text-gray-700">{locale === 'en' ? 'Status' : 'Estado'}:</span> {locale === 'en' ? 'Ready' : 'Lista'}
                        </p> : undefined
                }
                {
                    order.status === 'completed'
                        ?
                        <p className="text-black text-base" >
                            <span className="text-gray-700">{locale === 'en' ? 'Status' : 'Estado'}:</span> {locale === 'en' ? 'Completed' : 'Completado'}
                        </p> : undefined
                }
                <p className={`text-base ${order.isPaid ? 'text-green-700' : 'text-red-700'}`} >
                    {order.isPaid ? locale === 'en' ? 'Payed' : 'Pagado' : locale === 'en' ? 'Payment pending' : 'Pago pendiente'}
                </p>
            </div>
            <ul className="text-left">
                {
                    order.body.map((dish: any, j: number) => {
                        return (
                            <li key={"dishName" + j}>{dish.name}</li>
                        )
                    })
                }
            </ul>
            <br />
            <OrderControls role={role} token={token} orderId={order._id} currentStatus={order.status} locale={locale} />
            <br />
        </div>
    )
}

export const OrderControls = ({ role, token, orderId, currentStatus, locale }: any) => {
    return (
        <div>
            {
                role !== 'user'
                    ?
                    currentStatus === "completed" ? undefined
                        :
                        <button
                            onClick={() => currentStatus === "isPending" ? updateStatus(token, orderId, 'isReady') : updateStatus(token, orderId, 'completed')}
                            className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded"
                        >
                            {currentStatus === "isPending" ? locale === 'en' ? 'Set Ready' : 'Lista' : locale === 'en' ? 'Complete' : 'Copmletar'}
                        </button> : undefined
            }

            <button
                // onClick={() => processTransaction(props.totalPrice, props.totalDishes, props.token, props.userId, props.customer, props.selectedDishes, props.dishCounters, props.items)}
                className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
                style={{ marginLeft: "2vw" }}
            >
                {locale === 'en' ? 'Cancel' : 'Cancelar'}
            </button>
        </div>
    )
}

export const SkillCard = ({ item, index }: any) => {
    return (
        <div
            className="card mb-3 d-inline-block skills"
            key={index}
        >
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={
                            item.icon
                                ? item.icon
                                : 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/symbol_questionmark.png'
                        }
                        className="img-fluid rounded-start"
                        alt={item.name}
                        loading="lazy"
                    />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{item.name ?? <div className="">_________</div>}</h5>
                        <div className="progress">
                            {/* @ts-ignore */}
                            <div className="progress-bar progress-bar-striped" role="progressbar" style={{ width: `${item.level}%` }} aria-valuenow={item.level} aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <p className="card-text">{item.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const CertCard = ({ item, index }: any) => {
    return (
        <Link to={item.link ?? ''} key={index}>
            <div
                className="card mb-3 d-inline-block skills"
                key={index}
            >
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            src={
                                item.icon
                                    ? item.icon
                                    : 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/symbol_questionmark.png'
                            }
                            className="img-fluid rounded-start"
                            alt={item.name}
                            loading="lazy"
                        />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{item.name ?? <div className="">_________</div>}</h5>
                            <p className="card-text">{item.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}