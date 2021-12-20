const SinhVienApi = 'http://localhost:8120/api/sinhvien';

function start() {
    getSinhVien(function(DSSinhVien){
        renderSinhVien(DSSinhVien);
    });
    handleCreateSinhVien();
}
start();

function getSinhVien(callback){
    fetch(SinhVienApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderSinhVien(DSSinhVien){
    var listSinhVien = document.querySelector('#list-sinhvien');
    var i = 1;
    var htmls = DSSinhVien.map(function (SinhVien){
        return `<tr class="sinhvien-${SinhVien.id}">
                    <td>${i++}</td>
                    <td>${SinhVien.mssv}</td>
                    <td>${SinhVien.username}</td>
                    <td>${SinhVien.hoTen}</td>
                    <td>${SinhVien.gioitinh}</td>
                    <td>${SinhVien.email}</td>
                    <td>${SinhVien.ngaysinh}</td>
                    <td>${SinhVien.sdt}</td>
                    <td>${SinhVien.nienKhoa}</td>
                    <td>${SinhVien.chuyenNganh}</td>
                    <td><button class="btn"><i class="fa fa-eye text-success text-active"></i></button>
                    <button class="btn" onclick="handleDeleteSinhVien(${SinhVien.id})"><i class="fa fa-times text-danger text"></i></button></td>
                </tr>`;
    });
    listSinhVien.innerHTML = htmls.join('');
}
function createSinhVien(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(SinhVienApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleCreateSinhVien(){
    var createBtnSinhVien = document.querySelector('#create-sinhvien');
    createBtnSinhVien.onclick = function(){
        var mssv = document.querySelector('input[name="mssv"]').value;
        var username = document.querySelector('input[name="username"]').value;
        var hoTen = document.querySelector('input[name="hoTen"]').value;
        var gioitinh = document.querySelector('input[name="gioitinh"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var ngaysinh = document.querySelector('input[name="ngaysinh"]').value;
        var sdt = document.querySelector('input[name="sdt"]').value;
        var chuyenNganh = document.querySelector('input[name="chuyenNganh"]').value;
        var nienKhoa = document.querySelector('input[name="nienKhoa"]').value;
        
        var formData = {
            mssv: mssv,
            username: username,
            hoTen: hoTen,
            gioitinh: gioitinh,
            email: email,
            ngaysinh: ngaysinh,
            sdt: sdt,
            chuyenNganh: chuyenNganh,
            nienKhoa: nienKhoa
        }
        if(mssv != "" && username != "" && hoTen != "" && gioitinh != "" && email != "" && ngaysinh != "" && sdt != "" && chuyenNganh != "" && nienKhoa != ""){
            mssv = "";
            username = "";
            hoTen = "";
            gioitinh = "";
            email = "";
            ngaysinh = "";
            sdt = "";
            chuyenNganh = "";
            nienKhoa = "";
            createSinhVien(formData);
            alert("Thêm thành công!!!");
        } else {
          alert("Bạn hãy nhập đầy đủ thông tin");
        }
        

    }   
}
function handleDeleteSinhVien(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    };
    if (confirm("Are you sure you want to delete?")) {
        fetch(SinhVienApi + '/' +id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var sinhVienItem = document.querySelector('.sinhvien-'+id);
            if(sinhVienItem){
                sinhVienItem.remove();
                alert("Đã xoá thành công!!!");
            }
        })
    }
}

