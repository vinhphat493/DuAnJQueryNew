//Định nghĩa 1 plugin trong jquery
window.jQuery.prototype.NhapNhay = function (object) {
    var selector = $(this);
    for (var i = 0; i < object.soLan; i++) {
        selector.fadeOut(300);
        selector.fadeIn(300);
    }
    //Dùng thư viện animation
    selector.animate({
        fontSize:object.size
    },1000);
    //Dùng selector thay đổi css
    selector.css({"color":object.color})
}
