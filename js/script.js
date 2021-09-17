
document.addEventListener('DOMContentLoaded', () => {

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
        tabContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    function hideTabsContent() {
        tabContent.forEach(item => {
            item.style.display = 'none';
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    hideTabsContent();
    showTabsContent();
});