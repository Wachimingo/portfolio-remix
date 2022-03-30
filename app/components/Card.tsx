import { Dish } from "../interfaces/Dish";
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


export const OrderCard = ({ orders }: any) => {
    return (
        <>
            {
                orders.map((order: any, i: number) => {
                    return (
                        <div key={order.id + i} className="card d-inline-block mb-2 ms-2" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">{order.user.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{order.status}</h6>
                                <p className="card-text">Dishes: {order.totalDishes} Payment: {order.totalPrice}</p>
                                <p className="card-text">Payment status: {order.isPaid ? 'Success' : 'Pending'}</p>
                                <button className="btn btn-success m-2">{order.status === 'isPending' ? 'Ready' : 'Complete'}</button>
                                <button className="btn btn-danger">Cancel</button>
                            </div>
                        </div>
                    )
                })
            }
        </>

    )
}

export const SkillCard = ({ item, index }: any) => {
    return (
        <div
            className="card ms-3 mb-3 d-inline-block skills"
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
                className="card ms-3 mb-3 d-inline-block skills"
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