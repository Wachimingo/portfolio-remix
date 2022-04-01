import { useState } from "react";
import { FaTrash, FaCog, FaAngleUp, FaRegFolderOpen, FaStar, FaAngleDown } from "react-icons/fa";
import { Link, useFetcher } from "remix";

export const Card = ({ dishes, fetcher }: any) => {
    return (
        <>
            {
                dishes.map((dish: any) => {
                    return (
                        <div key={dish.name} className="card ms-2 d-inline-block cardStyle">
                            {CatalogControls(dish, fetcher)}
                            <div className="imgContainer">
                                <img src={dish.image} className="card-img-top" alt={dish.name} height='150px' />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{dish.name}</h5>
                                <div className="innerBody">
                                    <p className="card-text">{dish.description}</p>
                                </div>
                                <p className="card-text">${dish.price}</p>
                            </div>
                        </div>
                    );
                })
            }
        </>
    )
}

const CatalogRowButtons = (props: any) => {
    return (
        <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title={props.title}
            className={`d-inline-block border ms-1 topButtons ${props.styleButton}`}
            onClick={() => props.fetcher ? props.fetcher.submit({ ...props }, { method: props.method }) : undefined}
        >
            {props.icon}
        </span>
    )
}

export const CatalogControls = (item: any, fetcher: any) => {
    const [state] = useState(!item!.forToday)
    return (
        <div className="mt-3 mb-3">
            <CatalogRowButtons
                title="Delete"
                icon={<FaTrash />}
                styleButton='red'
                fetcher={fetcher}
                dishId={item.id}
                method={'DELETE'}
            />
            <CatalogRowButtons
                title="Modify"
                icon={<FaCog data-bs-toggle="modal" data-bs-target="#CatalogModal" />}
            />
            <CatalogRowButtons
                title={item?.forToday ? "Desactivar" : "Activar"}
                icon={item?.forToday ? <FaAngleDown /> : <FaAngleUp />}
                styleButton={item?.forToday ? "red" : "green"}
                fetcher={fetcher}
                dishId={item.id}
                state={state}
                method={'PATCH'}
                type={'forToday'}
            />
            <CatalogRowButtons
                title='Review'
                icon={
                    <Link to={`/projects/restaurant/review/${item?._id}`} >
                        <FaRegFolderOpen />
                    </Link>
                }
                fetcher={fetcher}
            />
            <CatalogRowButtons
                title="Mark as favorite"
                icon={<FaStar />}
                fetcher={fetcher}
            />
        </div>
    )
}

export const OrderCard = ({ orders, status }: any) => {
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
                                {CardControls(order._id, order.status)}
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

const CardControls = (id: string, status: string) => {
    const fetcher = useFetcher();
    const renderButtons: any = {
        "isPending": (id: string) => {
            return (
                <>
                    <button
                        className="btn btn-success m-2"
                        onClick={() => fetcher.submit({ id, type: 'status', status: 'isReady' }, { method: "patch" })}
                    >
                        Ready
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => fetcher.submit({ id, type: 'status', status: 'cancelled' }, { method: "patch" })}
                    >
                        Cancel
                    </button>
                </>
            )
        },
        "isReady": (id: string) => {
            return (
                <>
                    <button
                        className="btn btn-success m-2"
                        onClick={() => fetcher.submit({ id, type: 'status', status: 'completed' }, { method: "patch" })}
                    >
                        Complete
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => fetcher.submit({ id, type: 'status', status: 'cancelled' }, { method: "patch" })}
                    >
                        Cancel
                    </button>
                </>
            )
        },
        "completed": () => undefined,
        "cancelled": () => undefined,
        "default": () => undefined
    }
    return renderButtons[status ?? 'default'](id);
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