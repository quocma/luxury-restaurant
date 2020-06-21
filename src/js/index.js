
var menuList = document.querySelector('.js-food__menu-list');
var specList = document.querySelector('.js-food__menu-list');
// get list dish of homepage
fetch(`http://${HOST}:3003/dish/homepage`)
      .then(res => {
        res.json().then ( result => {
            let html = ''
            for (let item of result.menuItems) {
                // console.log(item);
                // dump data
               html += `<li class="food__menu-item" >
                            <h6 class="food__name" item-id="${item._id}">${item.name}</h6>
                            <p class="food__desc">${item.short_desc}</p>
                            <div class="food__price">${vndFormat(item.price)}</div>
                        </li>
                        `
            }
            menuList.innerHTML = html
            var foodNames = document.querySelectorAll('.food__name');
            // go to product on click food name
            for (let i = 0 ; i < foodNames.length ; i++) {
                foodNames[i].addEventListener('click', () => {
                    localStorage.setItem('active_item', foodNames[i].getAttribute('item-id'));
                    location.assign('./product.html');
                })
            }
            for( let index = 0 ; index < result.todayItems.length ; index++ ) {
                let itemhtml = `
                                <img class="special__thumb" src="${result.todayItems[index].img}" item-id="${result.todayItems[index]._id}" alt="320x210">
                                <div class="special__name">${result.todayItems[index].name} <span id="js-special-price">${vndFormat(result.todayItems[index].price)}</span></div> 
                                `;
                if(index == 0) {
                    document.querySelector('.js-special__front').innerHTML = itemhtml;
                    
                }
                if(index == 1) {
                    document.querySelector('.js-special__behind').innerHTML = itemhtml;
                    
                }
                
            }
            var specialImages = document.querySelectorAll('.special__thumb');
            var specialNames = document.querySelectorAll('.special__name');
            for (let i = 0 ; i < specialImages.length ; i++) {
                specialImages[i].addEventListener('click', () => {
                    localStorage.setItem('active_item', specialImages[i].getAttribute('item-id'));
                    location.assign('./product.html');
                })
                specialNames[i].addEventListener('click', () => {
                    localStorage.setItem('active_item', specialImages[i].getAttribute('item-id'));
                    location.assign('./product.html');
                })
            }
        })
      })

// =====================================================
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

// ====================================================
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
            email:  document.getElementById('subcribe-email').value
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


