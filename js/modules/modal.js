function modal() {
     //Modal 

     const openModalBtns = document.querySelectorAll('[data-modal]'),
     modal = document.querySelector('.modal');

 function openModal() {
     modal.classList.remove('hide');
     modal.classList.add('show');
     document.body.style.overflow = 'hidden';
     clearInterval(modalTimerId);
 }

 function closeModal() {
     modal.classList.remove('show');
     modal.classList.add('hide');
     document.body.style.overflow = '';
 }

 openModalBtns.forEach(button => {
     button.addEventListener('click', openModal);
 });

 modal.addEventListener('click', (e) => {
     if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal();
     }
 });

 document.addEventListener('keydown', (e) => {
     if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
     }
 });

 const modalTimerId = setTimeout(openModal, 5000);

 function showModalByScroll() {
     if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
     }
 }

 window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal; 