import { FaTrash, FaCog, FaAngleUp, FaRegFolderOpen, FaStar, FaAngleDown } from "react-icons/fa";
import { Link, useFetcher } from "@remix-run/react";

export const Card = ({ children, ...props }) => {
    return (
        <div className="card-wrapper" {...props}>
            <div className="card-container">
                {children}
            </div>
        </div>
    )
}

const CatalogRowButtons = ({ fetcher, method, title, style, icon, action, ...props }: any) => {
    return (
        <span
            title={title}
            style={style}
            onClick={() => fetcher ? fetcher.submit({ ...props }, { method }) : action(props.item)}
        >
            {icon}
        </span >
    )
}

export const CatalogControls = (
    item: any,
    fetcher: any,
    dishToModify: any,
    setDishToModify: Function,
    isOpen: boolean,
    setIsOpen: Function,
) => {
    return (
        <div className='control'>
            <CatalogRowButtons
                title="Delete"
                icon={<FaTrash />}
                fetcher={fetcher}
                dishId={item.id}
                method={'DELETE'}
            />
            <CatalogRowButtons
                title="Modify"
                icon={<FaCog onClick={() => setIsOpen(isOpen => !isOpen)} />}
                action={() => {
                    setDishToModify(dishToModify => item)
                }}
                item={item}
            />
            <CatalogRowButtons
                title={item?.forToday ? "Desactivar" : "Activar"}
                icon={item?.forToday ? <FaAngleDown /> : <FaAngleUp />}
                style={{ color: item?.forToday ? 'green' : 'red' }}
                fetcher={fetcher}
                dishId={item.id}
                forToday={!item.forToday}
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