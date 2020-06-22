// ==============================
var $ = document.querySelector.bind(document);
var $id = document.getElementById.bind(document);
var log = console.log.bind(console);
// ==============================

// scroll header
var header = document.querySelector('.header');
window.onscroll = function () { 
    if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        header.classList.add('header--ontop');
        header.s
    }
    else {
        header.classList.remove('header--ontop');
    }
 }

 //  shopping cart 
function updateCart() {
    var cartNumberElement = $('.js-shopping-cart');
    if(cart.getCartNum() == 0 ) {
        cartNumberElement.style.display = 'none';
    }else {
        cartNumberElement.style.display = 'block';
        cartNumberElement.innerHTML = cart.getCartNum();
    }
}
updateCart();

// footer email subcriber 
var formSubcribe = document.getElementById('form-subcribe');
var subcribeBtn  = document.getElementById('btn-subcribe');
subcribeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    validator.resetErrMessage();
    validator.checkInput(formSubcribe);
    if(validator.getErrMessage().length == 0) {
        //  submit form subcribe to server Here
        let email = {
            email:  $id('subcribe-email').value
        }
        fetch(`${PROTOCOL}://${HOST}/subcribe` , {
            // fetch option
            method: "POST",
            body: JSON.stringify(email),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then( res => res.json())
        .then(result => {
            alert('Bạn đã đăng kí thành công. Xin cảm ơn !!!');

        })
        .catch(err => {
            // log(err);
            location.replace('./404.html');
        })

    }

});



// video control 
var video = document.querySelector('.js-video');
var btnPlay = document.querySelector('.js-play');
btnPlay.addEventListener('click', (e) => {
    e.preventDefault();
    video.play();
    ChangeButtonState('play');
});
video.addEventListener('ended' , () =>{
    ChangeButtonState('play');
});
video.addEventListener('click', () => {
    video.pause();
    ChangeButtonState('play');
});
function ChangeButtonState(type) {
    if(type == 'play') {
       if(video.ended || video.paused) {
            btnPlay.style.display = 'block';
       }else {
            btnPlay.style.display = 'none';
       }
    }
}

// gallery silde
var imageUrls = [
    'https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1555126634-323283e090fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1564671165093-20688ff1fffa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1556694795-b6423d3d5b28?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1560963805-6c64417e3413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1555403884-0b64a25daf1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1584003397078-45ef96d6174d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1579856896394-07dfa10d7c5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1551085046-09ef1353ca5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80',
    'https://images.unsplash.com/photo-1559948271-7d5c98d2e951?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1560100927-c32f29063ade?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
];
(function() {
    var gallery = document.querySelector('.js-gallery-list');
    var controlBox = document.querySelector('.js-gallery-controlbox');
    var controlButtons = controlBox.querySelectorAll('.js-control-btn');
      // position of current active tab
    var pos = 0;
    controlButtons[pos].classList.add('active');
    if(gallery.getAttribute('autoplay') === 'true') {
        assignButtonEvnt();
        galleryPlay();
        setInterval(() => {
            controlButtons[pos].classList.remove('active');
            pos++;
            if(pos == controlButtons.length) {
                pos = 0;
            }
            controlButtons[pos].classList.add('active');
            galleryPlay();
        },8000);        
    } else {
        assignButtonEvnt();
    }
    function assignButtonEvnt () {
        for(let i = 0 ; i < controlButtons.length ; i++) {
            controlButtons[i].addEventListener('click', function () {
                controlButtons[i].classList.add('active');
                for(let j = 0 ; j < controlButtons.length ; j++) {
                    if(controlButtons[j] != this) {
                        controlButtons[j].classList.remove('active');
                    }
                }
                pos = i;
                galleryPlay();

            });
        }
    };
    function galleryPlay () {
        var imageShow = [];
        function getUrls (imageUrls, tab ,  galleryNumber){
            return imageUrls.slice((tab*galleryNumber) - galleryNumber, galleryNumber*tab);
        }

        for(let i = 0 ; i < controlButtons.length ; i++) {
            if(controlButtons[i].classList.contains('active')) {
                // console.log(`get tab ${i+1} url`);
                imageShow =  getUrls(imageUrls, i + 1, 4);
                // console.log(imageShow);
            }
            
        }
        var galleryHtmlItem = '';
        imageShow.forEach(el => {
            galleryHtmlItem += `  <li class="gallery__item">
                                        <img class="gallery__image" src="${el}" alt="270x263">
                                    </li>
                                `;
        });
         // add an item to gallery list
         gallery.innerHTML = galleryHtmlItem;
    };
   
}());