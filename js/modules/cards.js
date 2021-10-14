function cards() {
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

    const getData = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not get ${url}, error code is ${res.status}`);
        }

        return await res.json();

    };

    getData('http://localhost:3000/menu').then(data => {
        data.forEach(({ img, altimg, title, descr, price }) => {
            new Card(img, altimg, title, descr, price, '[data-menu]').createMenuItem();
        }); 
    });
}

export default cards; 