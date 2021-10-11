
document.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
        modal = require('./modules/modal'),
        calculator = require('./modules/calculator'),
        forms = require('./modules/forms'),
        slider = require('./modules/slider'),
        timer  = require('./modules/timer'),
        cards = require('./modules/cards'); 

        tabs(); 
        calculator(); 
        modal(); 
        forms(); 
        slider();
        timer(); 
        cards(); 


    
});

