// ==============================
var $ = document.querySelector.bind(document);
var $id = document.getElementById.bind(document);
var log = console.log.bind(console);
// ==============================

var cname = $id('customer-name');
var email = $id('customer-email');
var note = $id('note');

// scroll header
var header = document.querySelector('.header');
window.onscroll = function () { 
    if(document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        header.classList.add('header--ontop');
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
        log( cartNumberElement.innerHTML)
    }
}
updateCart();


// contact form
var formReserve = document.getElementById('form-contact');
var reserveBtn = document.querySelector('.js-btn-contact');
reserveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let warning = document.querySelector('.form-warning');
    validator.resetErrMessage();
    validator.checkInput(formReserve);
    if(validator.getErrMessage().length == 0 ) {
        warning.textContent = '';
        // submit form contact to server;
        let contactInfo = {
            name : cname.value,
            email:  email.value,
            note:  note.value
        }
        fetch(`http://${HOST}:3003/subcribe/contact` , {
            // fetch option
            method: "POST",
            body: JSON.stringify(contactInfo),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then( res => res.json())
        .then(result => {
            alert('Đã gửi yêu cầu, chúng tôi sẽ phản hổi sớm nhất. Xin cảm ơn!');

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

