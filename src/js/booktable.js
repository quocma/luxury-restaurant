// ==============================
var $ = document.querySelector.bind(document);
var $id = document.getElementById.bind(document);
var log = console.log.bind(console);
// ==============================

var cname = $id('customer-name');
var email = $id('customer-email');
var time = $id('time');
var date = $id('calendar');
var guest = $id('friends');
var note = $id('note');


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
        let bookingInfo = {
            name : cname.value,
            email:  email.value,
            time:  time.value ,
            date:  date.value,
            guest:  guest.value,
            phone:  phone.value,
            note:  note.value
        }
        fetch(`http://${HOST}:3003/booking` , {
            // fetch option
            method: "POST",
            body: JSON.stringify(bookingInfo),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then( res => res.json())
        .then(result => {
            alert('Đặt bàn thành công, xin cảm ơn !!!');

        })
        .catch(err => {
            // log(err);
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
        fetch(`http://${HOST}:3003/subcribe` , {
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


