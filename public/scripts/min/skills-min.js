const modifyBtns = document.querySelectorAll('[class*="card-modify-btn"]'), removeBtns = document.querySelectorAll('[class*="card-remove-btn"]'), addBtn = document.getElementById("addNewSkillBtn"), modal = document.getElementById("skills-modal"), form = document.getElementById("skillsForm"), formTitle = document.getElementById("formTitle"), formCancelBtn = document.getElementById("formCancelBtn"), formSubmitBtn = document.getElementById("formSubmitBtn"), skillIdInput = document.getElementById("skillIdInput"), skillNameInput = document.getElementById("skillNameInput"), skillDescriptionInput = document.getElementById("skillDescriptionInput"), skillCategoriesInput = document.getElementById("skillCategoriesInput"), skillLevelInput = document.getElementById("skillLevelInput"), skillIconInput = document.getElementById("skillIconInput"); function openModal(a) { form.action = "/admin/skills?method=post", formSubmitBtn.value = "Add", formTitle.innerText = "Add new skill", skillNameInput.value = "", skillDescriptionInput.value = "", skillLevelInput.value = "", skillIconInput.value = "", skillIconInput.value = "", skillCategoriesInput.value = "", skillIdInput.value = "", "update" === a && (form.action = "/admin/skills?method=patch", formSubmitBtn.value = "Update", formTitle.innerText = "Update skill", skillIdInput.value = this.getAttribute("data-skill-id"), skillNameInput.value = this.getAttribute("data-skill-name"), skillDescriptionInput.value = this.getAttribute("data-skill-description"), skillLevelInput.value = this.getAttribute("data-skill-level"), skillIconInput.value = this.getAttribute("data-skill-icon"), skillCategoriesInput.value = this.getAttribute("data-skill-category")), modal.classList.remove("none"), window.addEventListener("click", closeWhenClickOutside) } const closeModal = () => { modal.classList.add("none") }; function closeWhenClickOutside(a) { a.target == modal && (window.removeEventListener("click", closeWhenClickOutside), closeModal(!1)) } function deleteSkill() { fetch("/admin/skills?method=delete&_id=" + this.getAttribute("data-skill-id"), { method: "post" }).then(() => document.location.reload()) } window.addEventListener("click", closeWhenClickOutside), modifyBtns.forEach(a => { a.onclick = openModal.bind(a, "update") }), removeBtns.forEach(a => { a.onclick = deleteSkill.bind(a) }), addBtn.onclick = openModal.bind(this, "add"), modal.firstChild.firstChild.addEventListener("click", closeModal), formCancelBtn.addEventListener("click", closeModal)