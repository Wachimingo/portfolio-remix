/* eslint-disable react/display-name */
import { Form } from "@remix-run/react";
import { Modal } from "~/components";

export default () => {
    return <Modal id='certs'>
        <h1 id='formTitle'></h1>
        <Form id='certsForm' method="post" action="/admin/certs" className="gray">
            <section>
                <div>
                    <label htmlFor="certNameInput" className="form-label">cert Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="certNameInput"
                    />
                </div>
                <div>
                    <label htmlFor="certDescriptionInput" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        id="certDescriptionInput"
                    />
                </div>
                <div>
                    <label htmlFor="certIconInput" className="form-label">Image</label>
                    <input
                        type="text"
                        className="form-control"
                        id="certIconInput"
                        name="icon"
                    />
                    <div id="imageHelp" className="form-text">Please search for images online</div>
                </div>
                <input type="text" name="_id" id='certIdInput' style={{ display: "none" }} />
            </section>
            <div className="form-controls">
                <button
                    id='formCancelBtn'
                    type="button"
                    className="form-cancel-button"
                >
                    Cancel
                </button>
                <input id='formSubmitBtn' type="submit" value='Submit' />
            </div>
        </Form>
    </Modal>
};