window.onload = (function(){
    const slider = document.getElementById('js-slider') ;
    const sliderImages = document.getElementsByClassName('slider__item');
    const nextBtn = document.getElementById('js-next-btn');
    const prevBtn = document.getElementById('js-prev-btn');

    let count = 1;
    const imgWidth = sliderImages[0].clientWidth;
    slider.style.transform = `translateX(${-imgWidth * count}px)`; 

    if(slider.getAttribute("autoplay") == 'true'){
        setInterval(showNextSlide, 8000);
       
    }
    window.onbeforeunload = (function () {
        clearInterval(showNextSlide);
    }())
    prevBtn.addEventListener('click', showPrevSlide);
    nextBtn.addEventListener('click', showNextSlide);

    function showPrevSlide (){
        if(count == 0 ) return 0;
        slider.style.transition = 'transform 0.4s ease-in-out';
        count--;
        slider.style.transform = `translateX(${-imgWidth * count}px)`; 
    }

    function showNextSlide (){
        if(count == sliderImages.length -1 ) return 0; 
        // translatex(-1920 * count px);
        slider.style.transition = 'transform 0.4s ease-in-out';
        count++;
        slider.style.transform = `translateX(${-imgWidth * count}px)`; 
    }

    slider.addEventListener('transitionend', () => {
        if(sliderImages[count].id == 'lastClone') {
            slider.style.transition = 'none';
            count = sliderImages.length - 2;
            slider.style.transform = `translateX(${-imgWidth * count}px)`; 
        }
        if(sliderImages[count].id == 'firstClone') {
            slider.style.transition = 'none';
            count = sliderImages.length - count;
            slider.style.transform = `translateX(${-imgWidth * count}px)`; 
        }
    });
}());
