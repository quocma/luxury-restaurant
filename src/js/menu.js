
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

// ----------------------------------------------------------
// add to cart

// view product detail 
var productList = document.querySelector('.js-dish-list')
var productItems = document.querySelectorAll('.dish__item');
for( let i = 0 ; i < productItems.length; i++) {
   productItems[i].querySelector('.dish__thumbnail').addEventListener('click', () => {
        location.assign('./product.html');

   });
   productItems[i].querySelector('.dish__name').addEventListener('click', () => {
        location.assign('./product.html');

   });
}

