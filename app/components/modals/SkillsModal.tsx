import { Form } from "@remix-run/react";
import { Modal } from "~/components/Modal";

export const SkillsModal = (props) => {
    return <Modal id='skills'>
        <h1>Modify</h1>
        <Form id='skillsForm' method={props.dishToModify ? 'patch' : 'post'} action="/admin/skills" className="gray">
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
                    //@ts-ignore
                    />
                </div>
                <div>
                    <label htmlFor="skillLevelInput" className="form-label">Price</label>
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
                </div>
                {/* {
                    props.dishToModify
                        ?
                        <>
                            <input type="text" name="_id" value={props.dishToModify?.id} style={{ display: "none" }} />
                            <input type="text" name="type" value='update' style={{ display: "none" }} />
                        </>
                        :
                        undefined
                } */}
            </section>
            <div className="form-controls">
                <button
                    id='formCancelBtn'
                    type="button"
                    className="form-cancel-button"
                    onClick={() => props.setIsModalOpen(false)}
                >
                    Cancel
                </button>
                <input type="submit" />
            </div>
        </Form>
    </Modal>
};