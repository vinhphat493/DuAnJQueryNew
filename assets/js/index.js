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
$("#btnLogin").click(function(){
    $("#modalDangNhap").trigger('click');
    $("#formQuenMK").hide();
    $("#loginUser").hide();
    $("#formSignUP").hide();
    $("#formLogin").show();
    $("#signUpUser").show();
})

//Hàm xử lý khi click Quên mật khẩu
$("#right-QuenMK").on("click",()=>{
    $("#formLogin").hide();
    $("#formQuenMK").show();
})

//Hàm xử lý khi click nút signUpUser
$("#signUpUser").on("click",()=>{
    $("#signUpUser").hide();
    $("#loginUser").show();
    $("#formLogin").hide();
    $("#formSignUP").show();
    $("#formQuenMK").hide();
})
//------------------------//

//Hàm xử lý khi click nut loginUser
$("#loginUser").on("click",()=>{
    $("#formQuenMK").hide();
    $("#formSignUP").hide();
    $("#signUpUser").show();
    $("#loginUser").hide();
    $("#formLogin").show();
})

//Hàm xử lý khi click nut signUpRespon
$("#signUpRespon").on("click",()=>{
    $("#formLogin").hide();
    $("#formQuenMK").hide();
    $("#formSignUP").show();  
})

//Hàm xử lý khi click nut LoginRespon
$("#loginRespon").on("click",()=>{
    $("#formLogin").show();
    $("#formQuenMK").hide();
    $("#formSignUP").hide();  
})