import {openModal, closeModal} from './modal'; 
import {postData} from '../services/services'; 

function forms(formSelector, modalTimerId) {
    //Forms 

    const forms = document.querySelectorAll(formSelector);

    forms.forEach((item) => {
        postData(item);
    });

    const msg = {
        loading: 'img/form/spinner.svg',
        success: 'Данные отправлены',
        fail: 'Произошла ошибка'
    };

    function postData(form) {
        console.log(form); 
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const status = document.createElement('img');
            status.src = msg.loading;
            status.classList.add('spinner');
            form.insertAdjacentElement('afterend', status);

            const formData = new FormData(form);

            const obj = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', obj)
                .then(data => {
                    console.log(data);
                    loadingStatusModal(msg.success);
                    status.remove();
                }).catch(() => {
                    loadingStatusModal(msg.fail);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function loadingStatusModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const statusModal = document.createElement('div');
        statusModal.classList.add('modal__dialog');
        statusModal.innerHTML =
            `<div class="modal__content">
        <div data-close class="modal__close">×</div>
        <div class="modal__title">${message}</div>
             </div>`;

        document.querySelector('.modal').append(statusModal);
        setTimeout(() => {
            statusModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms; 