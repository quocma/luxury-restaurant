// ==============================
var $ = document.querySelector.bind(document);
var $all = document.querySelectorAll.bind(document);
var $id = document.getElementById.bind(document);
var log = console.log.bind(console);
// ==============================

var list = $('.js-dish-list');
var paginationItem = $all('.pagination__list .pagination__item');
var pagination = $('.pagination__list');
var menuSelect = $('.dish__select');
var menuOption = $all('.dish__option');
var tag = 'all';
var page = 1;  
var npp = 9;  // number of item per page
var numpage = 0;
var menuItems = [];

// numperpage of mobile screen 
if(screen.width < 576) {
    npp = 5
}

function getMenuItems() {
    let html = '';
    fetch(`${PROTOCOL}://${HOST}/dish/menu/${tag}?page=${page}&npp=${npp}`)
    .then( res => {
        if(res.status == 200 || res.statusText == 'OK') return res.json()
        else throw new Error('Get Items Fail')
        })
    .then(result => {
        numpage = Math.floor(result.totalOftag / npp) + 1;
        menuItems = result.result;
        // log(menuItems)
        menuItems.forEach(item => {
           html += `<li class="dish__item" item-id="${item._id}">
                        <img class="dish__thumbnail" src="${item.img}" alt="370x233">
                        <div class="dish__detail">
                            <h6 class="dish__name">${item.name}</h6>
                            <p class="dish__desc">${item.short_desc}</p>
                            <div class="dish__bottom">
                                <div class="dish__bar"></div>
                                <div class="dish__price">${vndFormat(item.price)}</div>
                                <a href="#" class="dish__btn js-add-to-cart"><i class="far fa-cart-plus"></i></a>
                            </div>
                        </div>
                    </li>
                    `
        })
        list.innerHTML = html;
        paginate();
        // handle click on add to cart icon
        handleAddToCart();
        // handle click on item
        handleViewDetails();
    })
    .catch(err => {
        log(err);
    })
}
getMenuItems();

function paginate () {
    resetPagination();
    for(let i = 0; i < numpage; i++) {
        let html = `
                        <a href="#" class="pagination__link pagination__link btn btn--rounded">${i +  1}</a>
                `
        let li  = document.createElement('li');
        li.classList.add('pagination__item');
        li.innerHTML = html;
        if(i == 0) {
            li.querySelector('a').classList.add('active');
        }
        pagination.insertBefore(li, paginationItem[1]);
        // handle click on page item
        li.querySelector('a').addEventListener('click', function(e){
            e.preventDefault();
            let paginationChildLink = $all('.pagination__item a');
            if (!this.classList.contains('active')) {
                this.classList.add('active');
                page = parseInt(this.innerHTML);
                getitemsWithPageAndTag(page , tag);
                // let self = this;
                paginationChildLink.forEach(el => {
                if(el != this) {
                        el.classList.remove('active');
                }
            })
            }
        })
    }
  
}
function resetPagination() {
    pagination.querySelectorAll('.pagination__item').forEach(el => {
        
        if(!el.querySelector('a').classList.contains('pagination__link--prev') && !el.querySelector('a').classList.contains('pagination__link--next')) {
            pagination.removeChild(el);
        }
      
    })
  
}
// hanlde click on menu list (lunch, snack, ...)
menuOption.forEach(el => {
    el.addEventListener('click', function(e) {
        e.preventDefault();
        tag = this.getAttribute('menu-name');
        this.classList.add('selected');
        menuOption.forEach(sel => {
            if(sel != this) {
                sel.classList.remove('selected');
            }
        })
        page = 1;
        getMenuItems();
    } )
})
// handle click pre page
paginationItem[0].addEventListener('click', function(e){
    e.preventDefault();
    let linkActive = $('.pagination__item a.active');
    let prevItem = linkActive.parentNode.previousElementSibling;
    if(prevItem != this ) {
        prevItem.querySelector('a').classList.add('active');
        page = parseInt(prevItem.querySelector('a').innerHTML);
        getitemsWithPageAndTag(page, tag);
        linkActive.classList.remove('active');
    } 
})
// handle click next page
paginationItem[1].addEventListener('click', function(e){
    e.preventDefault();
    let linkActive = $('.pagination__item a.active');
    let nextItem = linkActive.parentNode.nextElementSibling;
    if(nextItem != this ) {
        nextItem.querySelector('a').classList.add('active');
        page = parseInt(nextItem.querySelector('a').innerHTML);
        getitemsWithPageAndTag(page, tag);
        linkActive.classList.remove('active');
    } 
})


function getitemsWithPageAndTag (pageNum, tagName) {
    log('get page' + pageNum + 'and tag : ' + tagName)
    let html = '';
    fetch(`${PROTOCOL}://${HOST}/dish/menu/${tagName}?page=${pageNum}&npp=${npp}`)
    .then( res => {
        if(res.status == 200 || res.statusText == 'OK') return res.json()
        else throw new Error('Get Items Fail')
        })
    .then(result => {
        numpage = Math.floor(result.totalOftag / npp) + 1;
        menuItems = result.result;
        log(menuItems)
        menuItems.forEach(item => {
           html += `<li class="dish__item" item-id="${item._id}">
                        <img class="dish__thumbnail" src="${item.img}" alt="370x233">
                        <div class="dish__detail">
                            <h6 class="dish__name">${item.name}</h6>
                            <p class="dish__desc">${item.desc}</p>
                            <div class="dish__bar"></div>
                            <div class="dish__price">${vndFormat(item.price)}</div>
                            <a href="#" class="dish__btn js-add-to-cart"><i class="far fa-cart-plus"></i></a>
                        </div>
                    </li>
                    `
        })
        list.innerHTML = html;
         // handle click on add to cart icon
         handleAddToCart();
         // handle click on item
         handleViewDetails();
    })
    .catch(err => {
        log(err);
    })
}



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

// ========================================================
// add to cart icon
function handleAddToCart() {
    var dishOnpage = $all('.dish__item');
    dishOnpage.forEach(dish => {
        let addBtn = dish.querySelector('.js-add-to-cart');
        addBtn.addEventListener('click', function(e) {
            e.preventDefault();
           getInfo(dish.getAttribute('item-id'), menuItems)
            .then(addCartItem => {
                cart.addItem(addCartItem, addCartItem.quantity)
                updateCart();
            })
        })
    })
}

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
        rej(new Error('Item Not Exist'));
    })
}


// ========================================================
// view product detail 
function handleViewDetails () {
    let dishOnpage = $all('.dish__item');
    dishOnpage.forEach(dish => {
        dish.querySelector('.dish__thumbnail').addEventListener('click', () => {
            localStorage.setItem('active_item', dish.getAttribute('item-id'));
            location.assign('./product.html');

        });
        dish.querySelector('.dish__name').addEventListener('click', () => {
            localStorage.setItem('active_item', dish.getAttribute('item-id'));
            location.assign('./product.html');

        });
    })
      
}

