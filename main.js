const mySlides = document.querySelectorAll('.banner-container');
const sliderContainer = document.querySelector('.slider-container');
const slideTimeout = 3000;
let sliderInterval;
let currentIndex = 0;
let isRunning = true;
let tabButtons;

// let changedTime = 0 -> zastanowić się nad wdrożeniem mechanizmu, czekającego taką ilość czasu na zmienienie slide-u, jaka pozostała od momentu jego dezaktywacji

(() => {
    mySlides.forEach((slide, index) => {
        if(index != currentIndex) 
        {
            slide.style.opacity = '0';
            slide.style.visibility = 'hidden';
        }
    });
    initializeSlider();
    sliderContainer.addEventListener('mouseenter', () => disableSlider());
    sliderContainer.addEventListener('mouseleave', () => enableSlider());
    window.addEventListener('blur', () => disableSlider());
    window.addEventListener('focus', () => enableSlider());
    initializeButtons();
    changeButtonFocus(0);
})();

function initializeSlider(){
    if(!sliderInterval)
    {
        sliderInterval = setInterval(() => {
            if(isRunning)
            {
                let previousIndex = currentIndex;
                currentIndex = (currentIndex == mySlides.length - 1) ? 
                    0 :
                    currentIndex + 1;
                    changeSlide(previousIndex);
            }
        }, slideTimeout);
    }
}

function enableSlider(){
    isRunning = true;
    initializeSlider();
    // return console.log('Aktywowano slider');
}
function disableSlider(){
    isRunning = false;
    clearInterval(sliderInterval);
    sliderInterval = null;
    // return console.log('Dezaktywowano slider');
}

function changeTab(tabNumber){
    if(!Number.isInteger(tabNumber) || tabNumber < 0 || tabNumber > (mySlides.length - 1))
        throw new Error('Wprowadzono nieprawidłowy index slide-u!');
    disableSlider();
    changeSlide(currentIndex, tabNumber);
    setTimeout(() => {
        enableSlider()
    }, slideTimeout / 6);
}

function changeSlide(previousIndex, actualIndex){
    if(previousIndex != actualIndex)
    {
        currentIndex = Number.isInteger(actualIndex) ?
            actualIndex :
            currentIndex;
        mySlides[previousIndex].style.opacity = '0';
        mySlides[currentIndex].style.visibility = 'visible';
        mySlides[currentIndex].style.opacity = '1';
        setTimeout(() => {
            mySlides[previousIndex].style.visibility = 'hidden';
        }, slideTimeout / 6);
    }
}