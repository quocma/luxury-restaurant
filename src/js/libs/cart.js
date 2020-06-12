
var cart = (function() {
    var cartItem = [];
    function Init (){
        if(localStorage.getItem('cart')) {
            cartItem = JSON.parse(localStorage.getItem('cart'));
        } else {
            localStorage.setItem('cart', []);
        }
    }
    function getCartNum() {
        return cartItem.length;
    }
    function addItem (product) {
        cartItem.push(product);
        localStorage.setItem('cart') = JSON.stringify(cartItem);
    }
    function removeItem(product) {
        for(let i = 0; i < cartItem.length ; i++) {
            if(cartItem[i].name == product.name) {
                cartItem.splice(i, 1);
            }
        }
    }
    return {
        Init,
        getCartNum,
        addItem,
        removeItem
    }
}());
//  init cart
cart.Init();