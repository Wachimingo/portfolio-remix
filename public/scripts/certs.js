const modifyBtns = document.querySelectorAll('[class*="card-modify-btn"]');
const removeBtns = document.querySelectorAll('[class*="card-remove-btn"]');
const addBtn = document.getElementById('addNewCertBtn');
const modal = document.getElementById('certs-modal');
const form = document.getElementById('certsForm');
const formTitle = document.getElementById('formTitle');
const formCancelBtn = document.getElementById('formCancelBtn');
const formSubmitBtn = document.getElementById('formSubmitBtn');
const certIdInput = document.getElementById('certIdInput');
const certNameInput = document.getElementById('certNameInput');
const certDescriptionInput = document.getElementById('certDescriptionInput');
const certIconInput = document.getElementById('certIconInput');

function openModal(type) {
    form.action = '/admin/certs?method=post';
    formSubmitBtn.value = 'Add';
    formTitle.innerText = 'Add new cert';
    certNameInput.value = '';
    certDescriptionInput.value = '';
    certIconInput.value = '';
    certIconInput.value = '';
    certIdInput.value = '';

    if (type === 'update') {
        form.action = '/admin/certs?method=patch';
        formSubmitBtn.value = 'Update';
        formTitle.innerText = 'Update cert';
        certIdInput.value = this.getAttribute('data-cert-id');
        certNameInput.value = this.getAttribute('data-cert-name');
        certDescriptionInput.value = this.getAttribute('data-cert-description');
        certIconInput.value = this.getAttribute('data-cert-icon');
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

function deletecert() {
    fetch('/admin/certs?method=delete&_id=' + this.getAttribute('data-cert-id'), {
        method: 'post',
    })
        .then(() => document.location.reload());
}

modifyBtns.forEach(btn => {
    btn.onclick = openModal.bind(btn, 'update');
});

removeBtns.forEach(btn => {
    btn.onclick = deletecert.bind(btn);
});

addBtn.onclick = openModal.bind(this, 'add');

modal.firstChild.firstChild.addEventListener('click', closeModal);

formCancelBtn.addEventListener('click', closeModal);