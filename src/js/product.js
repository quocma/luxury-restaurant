// find product by id 
var dishId = localStorage.getItem('active_item');
var productDetails = document.querySelector('.js-product__details');
var tags = '';
var dishActiveItem = {};
var relateds = [];
if(dishId) {
    fetch(`http://${HOST}:3003/dish/${dishId}`)
        .then(res => {
            res.json().then( doc => {
                dishActiveItem = doc.result;
                document.querySelector('.product__thumb img').setAttribute('src',`${doc.result.img}`);
                document.querySelector('.product__name').innerHTML = doc.result.name;
                document.querySelector('.old-price').innerHTML = vndFormat(doc.result.oldprice);
                document.querySelector('.new-price').innerHTML = vndFormat(doc.result.price) ;
                document.querySelector('.product__summary').innerHTML = doc.result.short_desc;
                tags = doc.result.tag
                // find related product 
                fetch(`http://${HOST}:3003/dish/related/${tags}?count=4`)
                .then(res => {
                    res.json().then( result => {
                        relateds = result;
                        let relatedHtml = '';
                        for(let item of result) {
                            relatedHtml += `<li class="related__item js-related-item"  item-id="${item._id}">
                                                <img src="${item.img}" alt="226x226" class="related__image js-related__image">
                                                <h5 class="related__name js-related__name">${item.name}</h5>
                                                <div class="price">
                                                    <span class="old-price js-old-price">${vndFormat(item.oldprice)}</span>
                                                    <span class="new-price js-new-price">${vndFormat(item.price)} </span>
                                                </div>
                                                <a href="#" class="related__add-btn js-related__add-btn"><i class="far fa-plus"></i></a>
                                            </li>   
                                            `
                        }
                        var relatedList = document.querySelector('.js-related-list');
                        // dump related to html
                        relatedList.innerHTML = relatedHtml;
                        // handle click on related product name or thumb
                        var relatedItems = relatedList.querySelectorAll('.js-related-item');
                        for (let index = 0; index < relatedItems.length; index++) {
                            
                            relatedItems[index].querySelector('.js-related__name').addEventListener('click', function(){
                                // get product & foward to product details
                                localStorage.setItem('active_item',  relatedItems[index].getAttribute('item-id'));
                                location.assign('./product.html')
                            });
                            relatedItems[index].querySelector('.js-related__image').addEventListener('click', function(){
                                localStorage.setItem('active_item',  relatedItems[index].getAttribute('item-id'));
                                location.assign('./product.html')
                            });
                            // handle click on add to cart icon
                            relatedItems[index].querySelector('.js-related__add-btn').addEventListener('click', function(e){
                                e.preventDefault();
                                let id = relatedItems[index].getAttribute('item-id');
                                let item = {};
                                getInfo(id, relateds).then(res => {
                                    item = res;
                                    // console.log(item)
                                    cart.addItem(item, item.quantity);
                                    updateCart();
                                }, err =>{
                                    console.log(err);
                                })
                            
                            });
                        
                        }
                    })
                })
                .catch (err => {
                    console.log(err);
                });
            })
        })
        .catch( err => {
            // console.log(err);
            location.replace('./404.html');
        })
} else {
    location.replace('./404.html');
}
// ============================================

// ============================================
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
    var cartNumberElement = document.querySelector('.js-shopping-cart');
    if(cart.getCartNum() == 0 ) {
        cartNumberElement.style.display = 'none';
    }else {
        cartNumberElement.style.display = 'block';
        cartNumberElement.innerHTML = cart.getCartNum();
    }
}
updateCart();

// increase / decrease quantity of product
var increaseButton = document.querySelector('.js-qty-up');
var decreaseButton = document.querySelector('.js-qty-down');
var qtyBox =  document.querySelector('.product__choose-count input');
function adjustQuantity() {
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
            let count = parseInt(qtyBox.value) - 1;
            if(count < 10) {
                qtyBox.value = '0' + count;
            }
        }
        
    });
  
}
adjustQuantity();

// handle buy now button 
var buyButton = document.querySelector('.js-buy');
buyButton.addEventListener('click', function() {
    let item = JSON.parse(JSON.stringify(dishActiveItem));
    item.quantity = 1 ;
    cart.addItem(item, parseInt(qtyBox.value));
    location.assign('./shopping-cart.html');
});

// handle add to cart button 
var addToCartButton = document.querySelector('.js-add-to-cart');
addToCartButton.addEventListener('click', function(e) {
    e.preventDefault();
    let item = JSON.parse(JSON.stringify(dishActiveItem));
    item.quantity = 1 ;
    cart.addItem(item, parseInt(qtyBox.value));
    // change count of cart im cart icon
    updateCart();
});

/**
 * @param {String} id id of dish
 * @param {Array} collection list
 * @description     Get some field of dish to insert into cart 
 */
function getInfo(id, collection) {
    return new Promise((res, rej) => {
        collection.forEach(el => {
            if(el._id == id) {
                let obj =  {
                    _id : el._id,
                    name: el.name,
                    img : el.img,
                    price: el.price,
                    quantity: 1
                }
                res(obj);
            }
        });
        rej(new Error('Not Exist'));
    })
}
