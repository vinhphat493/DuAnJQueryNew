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
}