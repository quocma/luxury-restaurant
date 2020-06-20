class Dep {
    constructor (){
        this.subcribers = [];
    }
    depend() {
        if(target && !this.subcribers.includes(target)) {
            this.subcribers.push(target);
        }
    }
    notify() {
        this.subcribers.forEach(sub => sub());
    }
}

function vndFormat (number) {
   if(number) {
    currency = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1.') + ' đ'
    return currency;
   }
   return '';
}
