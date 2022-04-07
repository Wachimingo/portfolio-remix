// import { Form } from "remix";
import { InfoTable } from "../billingComponents";
import Modal from "../Modal";

const TransactionModal = (props: any) => {
    return (
        <Modal
            modalId='TransactionModal'
            title="Checkout"
            body={

                props.agreed
                    ?
                    <>
                        Waiting for stripe to update package to work with React 18
                    </>
                    :
                    <>
                        <InfoTable
                            selectedDishes={props.selectedDishes}
                            totalDishes={props.totalDishes}
                            totalPrice={props.totalPrice}
                            dishCounters={props.dishCounters}
                            dishes={props.dishes}
                        />
                        <button
                            className="btn btn-info my-4 mx-2"
                            onClick={() => props.setAgreed(true)}
                        >
                            Checkout
                        </button>
                    </>
            }
        />
    )
}

export default TransactionModal;