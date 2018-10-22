function DanhSachKhoaHoc (){
    this.MangKH = [];
    this.ThemKhoaHoc = function (kh){
        this.MangKH.push(kh);
    }
    this.LayThongTinKhoaHoc = function(maKH){
        for(var i = 0 ; i<this.MangKH.length ; i++){
            var khoaHoc = this.MangKH[i];
            if(khoaHoc.MaKhoaHoc == maKH){
                return khoaHoc;
            }
        }
    }
    this.TimKhoaHoc = function(tuKhoa){
        var cmSevice = new commonService();
        tuKhoa = cmSevice.getSEOtitle(tuKhoa);
        var DSTK = new DanhSachKhoaHoc();
        for (var i=0;i<this.MangKH.length;i++){
            var khoaHoc = this.MangKH[i];
            var tenKhoaHoc = cmSevice.getSEOtitle(khoaHoc.TenKhoaHoc);
            if(tenKhoaHoc.search(tuKhoa) != -1 ){
                DSTK.ThemKhoaHoc(khoaHoc);
            }
        }
        return DSTK;
    }
}