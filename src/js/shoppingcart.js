
//  shopping cart 
var cartNumberElement = document.querySelector('.js-shopping-cart');
if(cart.getCartNum() == 0 ) {
    cartNumberElement.style.display = 'none';
}else {
    cartNumberElement.innerHTML = cartNumberElement.length;
}


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

// ======================================================
function adjustQuantity() {
    var increaseButton = document.querySelectorAll ('.js-qty-up');
    var decreaseButton = document.querySelectorAll ('.js-qty-down');
    var qtyBox =  document.querySelectorAll('.product-cart__qty input');
    console.log(qtyBox);
    for(let i = 0 ; i < qtyBox.length ; i++) {
        increaseButton[i].addEventListener('click', function() {
            qtyBox[i].value = parseInt(qtyBox[i].value) + 1;
        });
        decreaseButton[i].addEventListener('click', function() {
            if( parseInt(qtyBox[i].value) >= 2){
                qtyBox[i].value = parseInt(qtyBox[i].value) - 1;
            }
        });
    }
}
adjustQuantity();