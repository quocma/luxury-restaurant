// ==============================
var $ = document.querySelector.bind(document);
var $id = document.getElementById.bind(document);
var log = console.log.bind(console);
// ==============================
var total = $('.bill__subtotal');
var all = $('.bill__total');
var tax = $('.bill__tax');
var shippingCharge = $('.bill__shipping-charge');

var cname = $id('customer-name');
var email = $id('customer-email');
var phone = $id('phone');
var address = $id('address');
var note = $id('note');

// reserve form
var formReserve = $id('form-checkout');
var reserveBtn = $('.js-btn-checkout');
reserveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let warning = $('.form-warning');
    validator.resetErrMessage();
    validator.checkInput(formReserve);
    if(validator.getErrMessage().length == 0 ) {
        warning.textContent = '';
        // submit form checkout to server;
        let order = getOrderdetails();
        fetch(`http://${HOST}:3003/order` , {
            // fetch option
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then( res => res.json())
        .then(result => {
            alert('Đặt hàng thành công, Đơn hàng đang được xử lí. Xin Cảm Ơn !!!');
            localStorage.removeItem('cart');
            localStorage.removeItem('bill_info');

        })
        .catch(err => {
            log(err);
            location.replace('./404.html');
        })
        


    }else {
       
        if(warning.textContent) {
            warning.textContent = '';
            warning.innerHTML = validator.warningText();
        } else {
            warning.innerHTML = validator.warningText();
        }
    }
});

function filterIdAndQuantity(arr) {
    let fillted = []
    arr.forEach(item => {
        fillted.push({dish_id: item._id, quantity: item.quantity })
    })
    return fillted;
}
function getOrderdetails () {
    let bill = Bill.getBill();
        let shoppingItems = cart.getCartItems();
        let order_items = filterIdAndQuantity(shoppingItems);
        let custom_info = {
            name: cname.value,
            mail: email.value,
            phone: phone.value ,
            addr: address.value,
            note: note.value || ''
        }
        return {
            amount: bill.total,
            delivery_charge: bill.delivery_charge || 0,
            tax: bill.tax || 0,
            order_items: order_items,
            custom_info: custom_info
        }
}

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
        alert('Bạn đã đăng kí thành công. Xin cảm ơn !!!');
        //  submit form subcribe to server Here

    }

});

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
        // location.replace('./404.html');
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
        inIt,
        getBill,
        caculate,
        show,
        save
    }
}());
Bill.inIt();
Bill.show(total, all, shippingCharge, tax);

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

