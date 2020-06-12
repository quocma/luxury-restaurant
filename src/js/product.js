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

// increase / decrease quantity of product
function adjustQuantity() {
    var increaseButton = document.querySelector('.js-qty-up');
    var decreaseButton = document.querySelector('.js-qty-down');
    var qtyBox =  document.querySelector('.product__choose-count input');
   
    increaseButton.addEventListener('click', function() {
        let count = parseInt(qtyBox.value) + 1;
        if(count < 10) {
            qtyBox.value = '0' + count;
        }else {
            qtyBox.value = count;
        }
    });

    decreaseButton.addEventListener('click', function() {
        if( parseInt(qtyBox.value) >= 2){
            qtyBox.value = parseInt(qtyBox.value) - 1;
        }
    });
  
}
adjustQuantity();

// handle buy now button 
var buyButton = document.querySelector('.js-buy');
buyButton.addEventListener('click', function() {
    location.assign('./shopping-cart.html');
});

// handle click on related product name or thumb
var relatedList = document.querySelector('.js-related-list');
var relatedItems = relatedList.querySelectorAll('.js-related-item');
for (let index = 0; index < relatedItems.length; index++) {
    
    relatedItems[index].querySelector('.related__name').addEventListener('click', function(){
        // get product & foward to product details
        location.assign('./product.html')
    });
    relatedItems[index].querySelector('.related__image').addEventListener('click', function(){
        location.assign('./product.html')
    });
 
}
// hanlde click add to cart at product info & related product