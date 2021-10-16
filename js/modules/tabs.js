function tabs(tabParentSelector, tabsSelector, tabContentSelector, activeClass) {

    const tabParent = document.querySelector(tabParentSelector),
        tabs = document.querySelectorAll(tabsSelector),
        tabContent = document.querySelectorAll(tabContentSelector);


    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
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
        tabs[i].classList.add(activeClass);
    }

    function hideTabsContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    hideTabsContent();
    showTabsContent();
}

export default tabs; 