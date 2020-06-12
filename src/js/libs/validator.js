/**
 * @param form      is a form html element.
 * @description     module  check value  &  get an error message.
 */
var validator = (function() {
    var errMessage = []; 
    function check (form) {
        inputItems = form.querySelectorAll(`.form-r__input`);
        for(let i = 0 ; i < inputItems.length; i++) {
            let inpVal = inputItems[i].value;
            if(inputItems[i].getAttribute('name') === 'customer-email') {
                let mailRegx = /^[a-z][a-z0-9_\.]*@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/g;
                //    console.log(mailRegx.test(inpVal));
                if(mailRegx.test(inpVal) == false) {
                    errMessage.push('Địa chỉ email không hợp lệ ! (đầu bằng chữ thường, vd: abc@gmail.com)');
                }
                continue;
            }
            if(inputItems[i].getAttribute('name') === 'customer-phone') {
                let phoneRegx = /^[\+0-9]{10,13}$/g;
                //    console.log(phoneRegx.test(inpVal));
                if(phoneRegx.test(inpVal) == false) {
                    errMessage.push('Số điện thoại không hợp lệ !');
                }
                continue;
            }
            if(inputItems[i].getAttribute('name') === 'customer-friends') {
                let numberRegx = /^[0-9]{1,3}$/g;
                if(numberRegx.test(inpVal) == false) {
                    errMessage.push('Nhập số lượng người bằng số, dưới 1000 !');
                }
                continue;
            }
            if(inputItems[i].getAttribute('name') === 'time') {
                // time regrex match format 00:00 | 12:10 | 20:10
                let timeRegx = /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/g;
                if(timeRegx.test(inpVal) == false) {
                    errMessage.push('Thời gian có định dạng: giờ:phút !');
                }
                continue;
            }
            if(inputItems[i].getAttribute('name') === 'customer-calendar') {
                // date format dd-mm-yyyy => regrex match dd-mm-20yy
                let dateRegx = /^((20[2-9][0-9])-([0][0-9]|1[0-2])-[0-2][0-9]|[3][0-1])$/g;
                if(dateRegx.test(inpVal) == false) {
                    errMessage.push('Ngày không hợp lệ');
                } else {
                    let dateCurr = new Date();
                    let datePicked = new Date(`${inpVal}`);
                    if( +datePicked < +dateCurr && (datePicked.getFullYear() != dateCurr.getFullYear() || datePicked.getMonth() != dateCurr.getMonth() || datePicked.getDate() != dateCurr.getDate()) ) {
                        errMessage.push('Ngày hôm nay hoặc trong tương lai !');
                    }
                }
            
                continue;
            }
            if(inpVal === '') {
                if(inputItems[i].getAttribute('name') !== 'message')
                {
                    errMessage.push('Các trường đánh dấu * là bắt buộc !');
                }
                
            }
        }
    };
    function getErrHtml(){
        let html = '';
        //remove duplicate from errMessage;
        let errorArr = [... new Set(errMessage)];
        errorArr.forEach (e => {
            html += e + '</br>'
        });
        return html;
    };
    function resetFunc() {
        errMessage.length = 0;
    }
    function geter () {  
        return errMessage;
    };
    return {
        checkInput : check,
        warningText: getErrHtml,
        resetErrMessage : resetFunc,
        getErrMessage   : geter
    };
}());
