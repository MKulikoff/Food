function slider({container, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    //Slider 

    const sliderImg = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector(container),
        prevSlideBtn = document.querySelector(prevArrow),
        nextSlideBtn = document.querySelector(nextArrow),
        currentSlide = document.querySelector(currentCounter),
        totalSlide = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

    const sliderLength = sliderImg.length;
    console.log(sliderLength); 
    let offset = 0;
    let index = 1;

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    const dots = [];

    for (let i = 0; i < sliderLength; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1)
        dot.classList.add('dot');
        dots.push(dot);
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
    }

    if (sliderLength > 10) {
        totalSlide.innerText = sliderLength;
        currentSlide.innerText = index;
    } else {
        totalSlide.innerText = `0${sliderLength}`;
        currentSlide.innerText = `0${index}`;
    }

    slidesField.style.width = 100 * sliderLength + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';
    sliderImg.forEach(slide => {
        slide.style.width = width;
    });

    function formatCounter(length) {
        if (length > 10) {
            totalSlide.innerText = length;
            currentSlide.innerText = index;
        } else {
            totalSlide.innerText = `0${length}`;
            currentSlide.innerText = `0${index}`;
        }
    }

    function setDotsOpacity() {
        dots.forEach(dot => {
            dot.style.opacity = '.5';
        })
        dots[index - 1].style.opacity = 1;
    }

    function clearNumber(number) {
        return +number.replace(/\D/g, '');
    }

    nextSlideBtn.addEventListener('click', () => {
        if (offset == clearNumber(width) * (sliderLength - 1)) {
            offset = 0;
            index = 0;
            currentSlide.innerText = `0${index}`;
            slidesField.style.transform = `translate(-${offset}px)`;
        } else {
            offset += clearNumber(width);
            slidesField.style.transform = `translate(-${offset}px)`;
        }

        if (index == sliderLength) {
            index = 1;
        } else {
            index++;
        }

        formatCounter(sliderLength);

        setDotsOpacity();
    });

    prevSlideBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = clearNumber(width) * (sliderLength - 1);

            slidesField.style.transform = `translate(-${offset}px)`;

        } else {
            offset -= clearNumber(width);
            slidesField.style.transform = `translate(-${offset}px)`;
        }

        if (index == 1) {
            index = sliderLength;
        } else {
            index--;
        }

        formatCounter(sliderLength);

        setDotsOpacity();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            index = slideTo;

            setDotsOpacity();

            offset = clearNumber(width) * (index - 1);
            slidesField.style.transform = `translate(-${offset}px)`;
            formatCounter(sliderLength);

        });
    });
}

export default slider; 