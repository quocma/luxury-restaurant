// ==============================
var $ = document.querySelector.bind(document);
var $id = document.getElementById.bind(document);
var log = console.log.bind(console);
// ==============================

var shoppingItems = cart.getCartItems();
//==========
var tableItems = document.querySelector('.js-cart__table');
function showTableItems () {
    for(let i = 0 ; i < shoppingItems.length ; i++) {
        let itemHTML = `
                    <td class="product-cart__name">
                        <img src="${shoppingItems[i].img}" alt="" class="product-cart__mini-thumb">
                        <a href="#" class="product-cart__btn-delete js-btn-delete"><i class="far fa-times"></i></a>
                        <span> ${shoppingItems[i].name}</span>
                    </td>
                    <td class="product-cart__price">${vndFormat(shoppingItems[i].price)}</td>
                    <td class="product-cart__qty ">
                        <input type="text" value="${shoppingItems[i].quantity}">
                        <i class="fas fa-caret-up js-qty-up"></i>
                        <i class="fas fa-caret-down js-qty-down"></i>
                    </td>
                    <td class="product-cart__subtotal js-subtotal">${vndFormat(shoppingItems[i].price * shoppingItems[i].quantity) }</td> 
            `
        // table row
        var row = document.createElement("tr");
        row.classList.add('product-cart__row', 'product-cart__row--body');
        let idAttr = document.createAttribute('item-id');
        idAttr.value =  shoppingItems[i]._id;
        row.attributes.setNamedItem(idAttr);
    
     
        // row.appendChild(name);
        row.innerHTML = itemHTML;
        tableItems.querySelector('tbody').appendChild(row);
    
        // handle click remove 
        let removeBtn = row.querySelector('.js-btn-delete');
        removeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            let itemRemove = removeBtn.parentNode.parentNode
            let removeIndex = shoppingItems.findIndex(el => el._id == itemRemove.getAttribute('item-id'));
            shoppingItems.splice(removeIndex, 1);
            Bill.caculate();
            Bill.show(total, all, shippingCharge, tax);
            saveItems(shoppingItems);
            itemRemove.style.display = 'none'
        })
    
    }
}
showTableItems();
//  shopping cart 
function updateCart() {
    var cartNumberElement = document.querySelector('.js-shopping-cart');
    if(cart.getCartNum() == 0 ) {
        cartNumberElement.style.display = 'none';
    }else {
        cartNumberElement.style.display = 'block';
        cartNumberElement.innerHTML = cart.getCartNum();
    }
}
updateCart();
// bill
var Bill = (function () {
    var total = 0;
    var all = 0;
    var tax  = 0;
    var shippingCharge = 0;
    function inIt () {
        if(localStorage.getItem('bill_info')) {
            let bill = JSON.parse(localStorage.getItem('bill_info'));
            total = bill.total;
            all = bill.all;
            tax = bill.tax;
            shippingCharge = bill.shippingCharge;
        }
        location.replace('./404.html');
    }
    function caculate () {
        let amount = 0;
        shoppingItems.forEach(item => {
            amount += item.price * item.quantity;
            // console.log(item.price);
        })
        total = amount;
        all = total*tax + shippingCharge + total; 
    }
    function getBill() { 
       return {
            total,
            all,
            shippingCharge,
            tax
       }
    }
    function show(totalEl, allEl, shippingChargeEl, taxEl) {
        totalEl.innerHTML = vndFormat(total);
        allEl.innerHTML = vndFormat(all);
        shippingChargeEl.innerHTML = vndFormat(shippingCharge);
        taxEl.innerHTML = tax + '%';
    }
    function save () {
        localStorage.setItem('bill_info', JSON.stringify(getBill()));
    }
    return {
        getBill,
        caculate,
        show,
        save
    }
}());

var total = document.querySelector('.bill__subtotal');
var all = document.querySelector('.bill__total');
var tax = document.querySelector('.bill__tax');
var shippingCharge = document.querySelector('.bill__shipping-charge');
Bill.caculate();
Bill.show(total, all, shippingCharge, tax);

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

// ======================================================
function adjustQuantity() {
    var increaseButton = document.querySelectorAll ('.js-qty-up');
    var decreaseButton = document.querySelectorAll ('.js-qty-down');
    var qtyBox =  document.querySelectorAll('.product-cart__qty input');
    // console.log(qtyBox);
    for(let i = 0 ; i < qtyBox.length ; i++) {
        increaseButton[i].addEventListener('click', function() {
            let rowOfItem = qtyBox[i].parentNode.parentNode;
            let id = rowOfItem.getAttribute('item-id');
            let item = shoppingItems.find(item => item._id == id );
            let subtotal = rowOfItem.querySelector('.js-subtotal');
             // change subtotal & quantity
            qtyBox[i].value = parseInt(qtyBox[i].value) + 1;
            subtotal.innerHTML = vndFormat(qtyBox[i].value * item.price);
            updateShoppingItem(id, {quantity:  qtyBox[i].value} );
            Bill.caculate();
            Bill.show(total, all, shippingCharge, tax);
            // console.log(id);
        });
        decreaseButton[i].addEventListener('click', function() {
            if( parseInt(qtyBox[i].value) >= 2){
                let rowOfItem = qtyBox[i].parentNode.parentNode;
                let id = rowOfItem.getAttribute('item-id');
                let item = shoppingItems.find(item => item._id == id );
                let subtotal = rowOfItem.querySelector('.js-subtotal');
                // change subtotal & quantity
                qtyBox[i].value = parseInt(qtyBox[i].value) - 1;
                subtotal.innerHTML = vndFormat(qtyBox[i].value * item.price);
                updateShoppingItem(id, {quantity:  qtyBox[i].value})
                Bill.caculate();
                Bill.show(total, all, shippingCharge, tax);
            }
        });
    }
}
adjustQuantity();

/**
 * 
 * @param {String} id   id of item.
 * @param {Object} value    key:value to update.     
 * @description update cart count & total.
 */
function updateShoppingItem(id, data) {
    shoppingItems.forEach(el => {
        if(el._id == id) {
            for(let key in data) {
                el[key] = data[key];
            }
        }
    });
}
/**
 * 
 * @param {Array} items List item.
 * @description Save shopping item after modify into localstorage.
 */
function saveItems(items) {
    cart.reset();
    if(items.length == 0) {
        localStorage.setItem('cart', "[]");
    } else {
        items.forEach(item => {
            cart.addItem(item, parseInt(item.quantity));
        })
    }
}

// handle click checkout 
var checkoutBtn = document.querySelector('.js-bill__take-order');
checkoutBtn.addEventListener('click', () => {
    saveItems(shoppingItems);
    Bill.save();
})
// =====================