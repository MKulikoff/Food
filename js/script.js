
document.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabParent = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabContent = document.querySelectorAll('.tabcontent');


    tabParent.addEventListener('click', (event) => {
        target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (item == target) {
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
        if (num > 0 && num < 10) {
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

            if (t.total <= 0) {
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

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() { 
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(); 
            window.removeEventListener('scroll', showModalByScroll); 
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //Cards 

    class Card {
         constructor(src, alt, subtitle, description, price, parent, ...classes) {
            this.src = src; 
            this.alt = alt; 
            this.subtitle = subtitle; 
            this.description = description; 
            this.price = price; 
            this.classes = classes; 
            this.rubPrice = 72; 
            this.parent = document.querySelector(parent); 
            this.changeToRub(); 
         }

         changeToRub() {
             this.price *= this.rubPrice; 
         }

         createMenuItem() {

            
             const menuItem = document.createElement('div'); 
             
             if (this.classes.length === 0) {
                menuItem.classList.add('menu__item'); 
             } else {
                 this.classes.forEach(element => {
                    menuItem.classList.add('element'); 
                 });
             }
             
             menuItem.innerHTML = `
             <img src=${this.src} alt=${this.alt}>
             <h3 class="menu__item-subtitle">${this.subtitle}</h3>
             <div class="menu__item-descr">${this.description}</div>
             <div class="menu__item-divider"></div>
             <div class="menu__item-price">
                 <div class="menu__item-cost">Цена:</div>
                 <div class="menu__item-total"><span>${this.price}</span> рублей/день</div>
             </div>`;

         this.parent.append(menuItem); 
         }
    }

    const fitnessMenu = new Card('img/tabs/vegy.jpg', 'vegy', 'Меню Фитнес', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229, '[data-menu]');

    fitnessMenu.createMenuItem(); 

    //Forms 

    const forms = document.querySelectorAll('form'); 

    forms.forEach( (item) => {
        postData(item);
    })

    const msg = {
        loading: 'Загрузка...',
        success: 'Данные отправлены',
        fail: 'Произошла ошибка'
    };

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const status = document.createElement('div'); 
            status.textContent = msg.loading; 
            form.append(status);  

            const request = new XMLHttpRequest(); 
            request.open('POST', 'server.php'); 

            request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form); 

            const obj = {}; 

            formData.forEach((item, key) => {
                obj[key] = item; 
            });

            request.send(JSON.stringify(obj)); 

            request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log(request.response);
                    status.textContent = msg.success;
                    form.reset(); 
                    setTimeout(() => {
                        status.remove();
                    }, 2000); 
                } else {
                    status.textContent = msg.fail; 
                }
            });
        });
    }
});
