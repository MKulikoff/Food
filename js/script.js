
document.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');


    tabParent.addEventListener('click', (event) => {
        target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if(item == target) {
                    hideTabsContent();
                    showTabsContent(index);
                }
            });
        }
    });

    function showTabsContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    function hideTabsContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    hideTabsContent();
    showTabsContent();

    //Timer 

    const deadline = '2021-10-07'; 

    function getRemainingTime(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor(t / (1000 * 60 * 60) % 24),
            minutes = Math.floor(t / (1000 * 60) % 60),
            seconds = Math.floor((t / 1000) % 60); 
        
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes, 
                'seconds': seconds
            };
    }

    function getZero(num) {
        if(num > 0 && num < 10) {
            return `0${num}`;
        } else {
            return num; 
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector), 
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'); 
            timeInterval = setInterval(updateClock, 1000); 

            updateClock(); 

        function updateClock() {
            const t = (getRemainingTime(deadline));

            days.innerHTML = getZero(t.days); 
            hours.innerHTML = getZero(t.hours); 
            minutes.innerHTML = getZero(t.minutes); 
            seconds.innerHTML = getZero(t.seconds); 

            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal 

    const closeModalBtn = document.querySelector('[data-close]'),
    openModalBtns = document.querySelectorAll('[data-modal]'), 
            modal = document.querySelector('.modal'); 

    function openModal() {
        modal.classList.remove('hide'); 
            modal.classList.add('show'); 
            document.body.style.overflow = 'hidden'; 
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }

    openModalBtns.forEach( button => {
        button.addEventListener('click', openModal);
    });

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(); 
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

});