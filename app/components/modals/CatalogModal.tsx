import { Form } from "@remix-run/react";
import { Modal } from "~/components";

const CatalogModal = (props: any) => {
    return (
        <Modal isOpen={props.isModalOpen} closeModal={props.setIsModalOpen} wrapperId='catalog-modal'>
            <h1>{props.dishToModify ? 'Modify dish' : 'Add dish'}</h1>
            <Form method={props.dishToModify ? 'patch' : 'post'} action="/projects/restaurant/catalog" className="gray">
                <section>
                    <div>
                        <label htmlFor="dishName" className="form-label">Dish Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            id="dishName"
                            aria-describedby="dishName"
                            //@ts-ignore
                            defaultValue={props.dishToModify ? props.dishToModify.name : undefined}
                        />
                    </div>
                    <div>
                        <label htmlFor="dishDescrption" className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            id="dishDescrption"
                            //@ts-ignore
                            defaultValue={props.dishToModify ? props.dishToModify.description : undefined}
                        />
                    </div>
                    <div>
                        <label htmlFor="dishPrice" className="form-label">Price</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            id="dishPrice"
                            step=".01"
                            pattern="^\d*(\.\d{0,2})?$"
                            //@ts-ignore
                            defaultValue={props.dishToModify ? props.dishToModify.price : undefined}
                        />
                    </div>
                    <div>
                        <label htmlFor="dishImage" className="form-label">Image</label>
                        <input
                            type="text"
                            className="form-control"
                            id="dishImage"
                            name="image"
                            aria-describedby="imageHelp"
                            //@ts-ignore
                            defaultValue={props.dishToModify ? props.dishToModify.image : undefined}
                        />
                        <div id="imageHelp" className="form-text">Please search for images online</div>
                    </div>
                    {
                        props.dishToModify
                            ?
                            <>
                                <input type="text" name="dishId" value={props.dishToModify?.id} style={{ display: "none" }} />
                                <input type="text" name="type" value='update' style={{ display: "none" }} />
                            </>
                            :
                            undefined
                    }
                </section>
                <div className="form-controls">
                    <button
                        type="button"
                        className="form-cancel-button"
                        // data-bs-dismiss="modal" 
                        // aria-label="Close"
                        onClick={() => props.setIsModalOpen(false)}
                    >
                        Cancel
                    </button>
                    <input type="submit" />
                </div>
            </Form>
        </Modal>
    )
}

export default CatalogModal;