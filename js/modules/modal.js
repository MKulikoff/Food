function openModal(modalSelector) {
    const modal = modalSelector; 
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
}

function closeModal(modalSelector) {
    const modal = modalSelector; 
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector) {
     //Modal 

     const openModalBtns = triggerSelector,
     modal = modalSelector;


 openModalBtns.forEach(button => {
     button.addEventListener('click', () => openModal(modalSelector));
 });

 modal.addEventListener('click', (e) => {
     if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal(modalSelector);
     }
 });

 document.addEventListener('keydown', (e) => {
     if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal(modalSelector);
     }
 });

 const modalTimerId = setTimeout(openModal, 5000);

 function showModalByScroll() {
     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal(modalSelector);
         window.removeEventListener('scroll', showModalByScroll);
     }
 }

 window.addEventListener('scroll', showModalByScroll);
}

export default modal; 

export {openModal}; 

export {closeModal};