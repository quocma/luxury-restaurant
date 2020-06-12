// reserve form
var formReserve = document.getElementById('form-checkout');
var reserveBtn = document.querySelector('.js-btn-checkout');
reserveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let warning = document.querySelector('.form-warning');
    validator.resetErrMessage();
    validator.checkInput(formReserve);
    if(validator.getErrMessage().length == 0 ) {
        warning.textContent = '';
        // submit form checkout to server;


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

// chooses payment method 
var checkBoxs = document.querySelectorAll('[type=checkbox]');
for( let i = 0 ; i < checkBoxs.length; i++) {
    checkBoxs[i].addEventListener('click',function() {
            checkBoxs[i].checked = true;
        for(let j = 0 ; j < checkBoxs.length; j++) {
           if(checkBoxs[j] != this) {
            checkBoxs[j].checked = false;
           }
        }
    });
}

