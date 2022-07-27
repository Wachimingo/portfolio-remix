import { FaCartPlus, FaTrash } from "react-icons/fa";
import { decreaseCount, increaseCount } from "~/controllers/billing";

export const CardBilling = (props: any) => {
    return (
        <>
            {
                props.dishes.map((dish: any, i: number) => {
                    return (
                        <div key={dish.name} className="card ms-2 cardStyle">
                            <div className="imgContainer">
                                <img
                                    src={`https://images.weserv.nl/?url=${dish.image}&w=150&h=150`}
                                    className="card-img-top"
                                    alt={dish.name} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{dish.name}</h5>
                                <div className="innerBody">
                                    <p className="card-text">{dish.description}</p>
                                </div>
                                <p className="card-text">${dish.price}</p>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success transactionButton"
                                onClick={() => increaseCount(
                                    i,
                                    JSON.parse(JSON.stringify(dish)),
                                    props.dishCounters[i],
                                    props.dishCounters,
                                    props.setDishCounters,
                                    props.totalDishes,
                                    props.setTotalDishes,
                                    props.selectedDishes,
                                    props.setSelectedDishes,
                                    props.totalPrice,
                                    props.setTotalPrice
                                )}
                            >
                                <FaCartPlus />
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger ms-2 transactionButton"
                                onClick={() => decreaseCount(
                                    i,
                                    JSON.parse(JSON.stringify(dish)),
                                    props.dishCounters[i],
                                    props.dishCounters,
                                    props.setDishCounters,
                                    props.totalDishes,
                                    props.setTotalDishes,
                                    props.selectedDishes,
                                    props.setSelectedDishes,
                                    props.totalPrice,
                                    props.setTotalPrice
                                )}
                            >
                                <FaTrash />
                            </button>
                            <p>{props.dishCounters[i]}</p>
                        </div>
                    );
                })
            }
        </>
    )
}

export const InfoTable = (props: any) => {
    return (
        <table className="table">
            <thead>
                <tr className="table-primary">
                    <th scope="col">#</th>
                    <th scope="col">Dish</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.selectedDishes.map((dish: any, i: number) => {
                        // const index = items.indexOf(item); // as the counter state position of the items is based in the items array, we need to get the position in that variable, else the render won't find what to render
                        const indexArray = props.dishes.map((OldItem: any, i: number) => {
                            if (OldItem!.name === dish.name) {
                                return i;
                            } return undefined;
                        })
                        const index: any = indexArray.filter((x: any) => { return x !== undefined })
                        return (
                            <tr key={'row' + i}>
                                <th scope="row">{i + 1}</th>
                                <td>{dish.name}</td>
                                <td>{props.dishCounters[index]}</td>
                                <td>${props.dishCounters[index] * dish.price}</td>
                            </tr>
                        )
                    })
                }
                <tr>
                    <td colSpan={2} className="table-info">Total</td>
                    <td>{props.totalDishes}</td>
                    <td>${props.totalPrice}</td>
                </tr>
            </tbody>
        </table>
    )
}