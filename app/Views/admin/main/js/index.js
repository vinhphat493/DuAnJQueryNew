$(document).ready(function(){
    //Lấy local người dùng để gán vào tên admin
    loadTenAdmin();
    function loadTenAdmin(){
        var userAd = JSON.parse(localStorage.getItem("NguoiDungAdmin"));
        if(userAd!=null){
            $("#tenUserLogin").html(userAd.HoTen+"&nbsp;");
        }
    }

    $("#logout").click(()=>{
        localStorage.clear();
        window.location.href="../../index.html";
    })
})