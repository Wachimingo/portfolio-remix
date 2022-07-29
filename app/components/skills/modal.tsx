/* eslint-disable react/display-name */
import { Form } from "@remix-run/react";
import { Modal } from "~/components";

export default ({ categories }) => {
    return <Modal id='skills'>
        <h1 id='formTitle'></h1>
        <Form id='skillsForm' method="post" action="/admin/skills" className="gray">
            <section>
                <div>
                    <label htmlFor="skillNameInput" className="form-label">Skill Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="skillNameInput"
                    />
                </div>
                <div>
                    <label htmlFor="skillDescriptionInput" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        name="description"
                        id="skillDescriptionInput"
                    />
                </div>
                <div>
                    <label htmlFor="skillCategoriesInput" className="form-label">Category</label>
                    <select id='skillCategoriesInput' name="category">
                        {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="skillLevelInput" className="form-label">Level</label>
                    <input
                        type="number"
                        className="form-control"
                        name="level"
                        id="skillLevelInput"
                        max={100}
                    />
                </div>
                <div>
                    <label htmlFor="skillIconInput" className="form-label">Image</label>
                    <input
                        type="text"
                        className="form-control"
                        id="skillIconInput"
                        name="icon"
                    />
                    <div id="imageHelp" className="form-text">Please search for images online</div>
                    <img src='' id="imgPreview" alt="preview" width={100} height={100} />
                </div>
                <input type="text" name="_id" id='skillIdInput' style={{ display: "none" }} />
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