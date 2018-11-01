var number = "^[0-9]*$";
var phoneNum = "(09|01[2|6|8|9])+([0-9]{8})*$";
var email = "^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$";
var urlRex = "(http|https|ftp):\\/\\/(www\\.)?[\\w\\-]+\\.[\\w]+(\\.[\\w]+)*\\/?(([\\w\\-]+)\\/)*([\\w\\-_]+\\.(php|html|htm|jsp|aspx))?(\\?([\\w\\-]+=[\\w\\-]+)?(&([\\w\\-]+=[\\w\\-]+))*)?";
var chuoi = "[A-Za-z0-9_]";
function KiemTraForm() {
    this.getKTRong = function (textInput) {
        if (textInput == "") {
            return false;
        } else {
            return true;
        }
    }
    this.getKTDodai = function (textInput,min,max) {
        if (textInput.length < min || textInput.length > max || textInput.search(" ") != -1 ) {
            return false;
        } else {
            return true;
        }
    }
    this.KiemTraDinhDangSo = function(idInput,idTextError){
        return DinhDang(idInput,idTextError,number,"Vui lòng nhập vào ký tự số !");
    }
    this.KiemTraDinhDangSDT = function(idInput,idTextError){
        return DinhDang(idInput,idTextError,phoneNum,"Vui lòng nhập đúng định dạng số điện thoại !");
    }
    this.KiemTraDinhDangEmail = function (idInput,idTextError){
        return DinhDang(idInput,idTextError,email, "Vui lòng nhập đúng email !" );
    }
    this.KiemTraDinhDangChuoi = function(idInput,idTextError){
        return DinhDang(idInput,idTextError,chuoi,"Vui lòng không nhập vào kí tự đặt biệt !")
    }
    this.KiemTraDinhDangUrl = function (idInput,idTextError){
        return DinhDang(idInput,idTextError,urlRex,"Vui lòng nhập vào một đường dẫn!")
    }
}

function DinhDang(idIn,idTxt,txtPattern,content){
    var valInput = $(idIn).val();
        var patt = new RegExp(txtPattern);
        if(!patt.test(valInput)){
            $(idTxt).fadeIn();
            $(idTxt).html(content);
            return false ;
        }else{
            $(idTxt).fadeOut();
            return true ;
        }
}