const modifyBtns = document.querySelectorAll('[class*="card-modify-btn"]');
const removeBtns = document.querySelectorAll('[class*="card-remove-btn"]');
const addBtn = document.getElementById('addNewSkillBtn');
const modal = document.getElementById('skills-modal');
const form = document.getElementById('skillsForm');
const formTitle = document.getElementById('formTitle');
const formCancelBtn = document.getElementById('formCancelBtn');
const formSubmitBtn = document.getElementById('formSubmitBtn');
const skillIdInput = document.getElementById('skillIdInput');
const skillNameInput = document.getElementById('skillNameInput');
const skillDescriptionInput = document.getElementById('skillDescriptionInput');
const skillCategoriesInput = document.getElementById('skillCategoriesInput');
const skillLevelInput = document.getElementById('skillLevelInput');
const skillIconInput = document.getElementById('skillIconInput');

function openModal(type) {
    form.action = '/admin/skills?method=post';
    formSubmitBtn.value = 'Add';
    formTitle.innerText = 'Add new skill';
    skillNameInput.value = '';
    skillDescriptionInput.value = '';
    skillLevelInput.value = '';
    skillIconInput.value = '';
    skillIconInput.value = '';
    skillCategoriesInput.value = '';
    skillIdInput.value = '';

    if (type === 'update') {
        form.action = '/admin/skills?method=patch';
        formSubmitBtn.value = 'Update';
        formTitle.innerText = 'Update skill';
        skillIdInput.value = this.getAttribute('data-skill-id');
        skillNameInput.value = this.getAttribute('data-skill-name');
        skillDescriptionInput.value = this.getAttribute('data-skill-description');
        skillLevelInput.value = this.getAttribute('data-skill-level');
        skillIconInput.value = this.getAttribute('data-skill-icon');
        skillCategoriesInput.value = this.getAttribute('data-skill-category');
    }
    modal.classList.remove('none');
    window.addEventListener('click', closeWhenClickOutside);
}

const closeModal = () => {
    modal.classList.add('none');
}

function closeWhenClickOutside(event) {
    if (event.target == modal) {
        window.removeEventListener('click', closeWhenClickOutside);
        closeModal(false);
    }
}
window.addEventListener('click', closeWhenClickOutside);

function deleteSkill() {
    fetch('/admin/skills?method=delete&_id=' + this.getAttribute('data-skill-id'), {
        method: 'post',
    })
        .then(() => document.location.reload());
}

modifyBtns.forEach(btn => {
    btn.onclick = openModal.bind(btn, 'update');
});

removeBtns.forEach(btn => {
    btn.onclick = deleteSkill.bind(btn);
});

addBtn.onclick = openModal.bind(this, 'add');

modal.firstChild.firstChild.addEventListener('click', closeModal);
formCancelBtn.addEventListener('click', closeModal);