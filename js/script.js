
import tabs from './modules/tabs';
import modal from './modules/modal';
import calculator from './modules/calculator';
import forms from './modules/forms';
import slider from './modules/slider';
import timer from './modules/timer';
import cards from './modules/cards';

document.addEventListener('DOMContentLoaded', () => {

    tabs();
    calculator();
    modal('[data-modal]', '.modal');
    forms();
    slider();
    timer();
    cards();

});

