
var foodNames = document.querySelectorAll('.food__name');
// go to product on click food name
for (let i = 0 ; i < foodNames.length ; i++) {
    foodNames[i].addEventListener('click', () => {
        location.assign('./product.html');
    })
}
// also special food
var specialImages = document.querySelectorAll('.special__thumb');
var specialNames = document.querySelectorAll('.special__name');
for (let i = 0 ; i < specialImages.length ; i++) {
    specialImages[i].addEventListener('click', () => {
        location.assign('./product.html');
    })
    specialNames[i].addEventListener('click', () => {
        location.assign('./product.html');
    })
}

// reserve form
var formReserve = document.getElementById('form-reserve');
var reserveBtn = document.querySelector('#js-btn-reserve');
reserveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let warning = document.querySelector('.form-warning');
    validator.resetErrMessage();
    validator.checkInput(formReserve);
    if(validator.getErrMessage().length == 0 ) {
        warning.textContent = '';
        // submit form reserve to server;
    }else {
       
        if(warning.textContent) {
            warning.textContent = '';
            warning.innerHTML = validator.warningText();
        } else {
            warning.innerHTML = validator.warningText();
        }
    }
});

// footer email subcriber 
var formSubcribe = document.getElementById('form-subcribe');
var subcribeBtn  = document.getElementById('btn-subcribe');
subcribeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    validator.resetErrMessage();
    validator.checkInput(formSubcribe);
    if(validator.getErrMessage().length == 0) {
        alert('Bạn đã đăng kí thành công. Xin cảm ơn !!!');
        //  submit form subcribe to server Here

    }

});

//  shopping cart 
var cartNumberElement = document.querySelector('.js-shopping-cart');
if(cart.getCartNum() == 0 ) {
    cartNumberElement.style.display = 'none';
}else {
    cartNumberElement.innerHTML = cartNumberElement.length;
}
