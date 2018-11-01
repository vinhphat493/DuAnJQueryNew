
// back to top JS
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

$('#myBtn').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
});
// back to top JS

//Hàm Click Đăng Nhập trigger Modal
$("#btnLogin").click(function () {
    $("#modalDangNhap").trigger('click');
    $("#formQuenMK").hide();
    $("#loginUser").hide();
    $("#formSignUP").hide();
    $("#formLogin").show();
    $("#signUpUser").show();
    $("#login").show();
})

//Hàm xử lý khi click Quên mật khẩu
$("#right-QuenMK").on("click", () => {
    $("#formLogin").hide();
    $("#formQuenMK").show();
})

//Hàm xử lý khi click nút signUpUser
$("#signUpUser").on("click", () => {
    $("#signUpUser").hide();
    $("#loginUser").show();
    $("#formLogin").hide();
    $("#formSignUP").show();
    $("#formQuenMK").hide();
    $("#title-left").html("Bạn đã có tài khoản CyberSoft")
})
//------------------------//

//Hàm xử lý khi click nut loginUser
$("#loginUser").on("click", () => {
    $("#formQuenMK").hide();
    $("#formSignUP").hide();
    $("#signUpUser").show();
    $("#loginUser").hide();
    $("#formLogin").show();
})

//Hàm xử lý khi click nut signUpRespon
$("#signUpRespon").on("click", () => {
    $("#formLogin").hide();
    $("#formQuenMK").hide();
    $("#formSignUP").show();
    $("#modalFooter").hide();
})

//Hàm xử lý khi click nut LoginRespon
$("#loginRespon").on("click", () => {
    $("#formLogin").show();
    $("#formQuenMK").hide();
    $("#formSignUP").hide();
})

//Hàm hide tenUserLogin
$("#doneLogin").hide();
$("#divError").fadeOut();
$(document).ready(function () {
    //Owl-carousel
    $('.owl-carousel').owlCarousel({
        loop: true,
        nav: true,
        items: 3
    })
});
// Input Effect
(function () {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
        (function () {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function () {
                return this.replace(rtrim, '');
            };
        })();
    }

    [].slice.call(document.querySelectorAll('input.input__field')).forEach(function (inputEl) {
        // in case the input is already filled..
        if (inputEl.value.trim() !== '') {
            classie.add(inputEl.parentNode, 'input--filled');
        }

        // events:
        inputEl.addEventListener('focus', onInputFocus);
        inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
        classie.add(ev.target.parentNode, 'input--filled');
    }

    function onInputBlur(ev) {
        if (ev.target.value.trim() === '') {
            classie.remove(ev.target.parentNode, 'input--filled');
        }
    }
})();

$("#fountainG").hide();
$("#divItemSearch").hide();
$("#ghidanhLoader").hide();


