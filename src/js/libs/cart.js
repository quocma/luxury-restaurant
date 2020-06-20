
var cart = (function() {
    var cartItem = [];
    function Init (){
        if(localStorage.getItem('cart')) {
            cartItem = JSON.parse(localStorage.getItem('cart'));
        } else {
            localStorage.setItem('cart', []);
        }
    }
    function setCartItem(items) { 
        cartItem = items;
     }
    function getCartNum() {
        return cartItem.length;
    }
    function addItem (product , qty) {
        product.quantity = 1;
        for(let i = 0; i < qty; i++ ) {
            cartItem.push(product);
        }
       
        localStorage.setItem('cart', JSON.stringify(cartItem));
    }
    function removeItem(product) {
        for(let i = 0; i < cartItem.length ; i++) {
            if(cartItem[i].name == product.name) {
                cartItem.splice(i, 1);
            }
        }
    }
    function getCartItems (){
        let groupItems = [];
       for(let i = 0; i < cartItem.length; i++) {
             let existItem = groupItems.find(el => el._id == cartItem[i]._id);
           if(existItem) {
               existItem.quantity = parseInt(cartItem[i].quantity + existItem.quantity);

           } else {
               groupItems.push(cartItem[i]);
           }
           
       }
    //    console.log(groupItems)
       return groupItems;
    }
    function getTotal(tax) {
        tax = tax / 100 || 0;
        let total = 0;
        shoppingItems.forEach(item => {
            total += item.price * item.quantity;
            // console.log(item.price);
        })
        return total + total*tax;
    }
    function reset() {
        cartItem.length = 0;
      }
    return {
        Init,
        getCartNum,
        addItem,
        removeItem,
        getCartItems,
        getTotal,
        setCartItem,
        reset
    }
}());
//  init cart
cart.Init();