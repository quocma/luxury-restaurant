// show or hide sidenav menu
function toggleSideNav() {
    let hamburgerBar = document.getElementById('js-hamburger');
    let hamburgerList = document.querySelector('.header__hamburger-list');
    hamburgerBar.addEventListener('click', function (){
        hamburgerList.classList.toggle('shown');
    });
}
toggleSideNav();


