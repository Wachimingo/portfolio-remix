import { Form } from "remix";
import Modal from "../Modal";

const CatalogModal = (props: any) => {
    return (
        <Modal
            modalId={'CatalogModal'}
            title={props.dishToModify ? 'Modify dish' : 'Add dish'}
            body={
                <Form method={props.dishToModify ? 'patch' : 'post'} action="/projects/restaurant/catalog" >
                    <div className="mb-3">
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
                    <div className="mb-3">
                        <label htmlFor="dishDescrption" className="form-label">Description</label>
                        <input
                            type="string"
                            className="form-control"
                            name="description"
                            id="dishDescrption"
                            //@ts-ignore
                            defaultValue={props.dishToModify ? props.dishToModify.description : undefined}
                        />
                    </div>
                    <div className="mb-3">
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
                    <div className="mb-3">
                        <label htmlFor="dishImage" className="form-label">Image</label>
                        <input
                            type="string"
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
                    <button type="button" className="btn btn-danger ms-2" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                    <button type="submit" className="btn btn-primary ms-2">Submit</button>
                </Form>
            }
        />
    )
}

export default CatalogModal;