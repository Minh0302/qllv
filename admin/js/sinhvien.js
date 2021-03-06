const SinhVienApi = 'http://localhost:8120/api/sinhvien';

function start() {
    getSinhVien(function(DSSinhVien){
        renderSinhVien(DSSinhVien);
    });
    handleCreateSinhVien();

    handleSinhVien(id);
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
                    <td class="mssv">${SinhVien.mssv}</td>
                    <td class="username">${SinhVien.username}</td>
                    <td class="hoTen">${SinhVien.hoTen}</td>
                    <td class="gioitinh">${SinhVien.gioitinh}</td>
                    <td class="email">${SinhVien.email}</td>
                    <td class="ngaysinh">${SinhVien.ngaysinh}</td>
                    <td class="sdt">${SinhVien.sdt}</td>
                    <td class="chuyenNganh">${SinhVien.chuyenNganh}</td>
                    <td class="nienKhoa">${SinhVien.nienKhoa}</td>
                    <td>
                    <button class="btn" onclick="handleSinhVien(${SinhVien.id})" data-toggle="modal" data-target="#updateSinhVien"><i class="fa fa-eye text-success text-active"></i></button>
                    <button class="btn" onclick="handleDeleteSinhVien(${SinhVien.id})"><i class="fa fa-times text-danger text"></i></button></td>
                    </td>
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
        if(mssv != "" && username !="" && hoTen !="" && gioitinh !="" && email !="" && ngaysinh !="" && sdt !="" && chuyenNganh !="" && nienKhoa !="" ){
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
            alert("Th??m th??nh c??ng!!!");
            window.location.reload();
        }else{
            alert("B???n h??y nh???p ?????y ????? th??ng tin");
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
    if(confirm('B???n mu???n x??a sinh vi??n n??y?')){
        fetch(SinhVienApi + '/' +id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var sinhVienItem = document.querySelector('.sinhvien-'+id);
            if(sinhVienItem){
                sinhVienItem.remove();
                alert('???? xo?? th??nh c??ng!!!');
            }
        })
    }
    window.location.reload();
}
function UpdateSinhVien(id,data,callback){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(SinhVienApi + "/"+id,options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleSinhVien(id){
    var sinhvienItem = document.querySelector('.sinhvien-'+id);
    var getmssv=sinhvienItem.querySelector(".mssv").innerText;
    var getusername=sinhvienItem.querySelector(".username").innerText;
    var gethoTen=sinhvienItem.querySelector(".hoTen").innerText;
    var getgioitinh=sinhvienItem.querySelector(".gioitinh").innerText;
    var getemail=sinhvienItem.querySelector(".email").innerText;
    var getngaysinh=sinhvienItem.querySelector(".ngaysinh").innerText;
    var getsdt=sinhvienItem.querySelector(".sdt").innerText;
    var getchuyenNganh=sinhvienItem.querySelector(".chuyenNganh").innerText;
    var getnienKhoa=sinhvienItem.querySelector(".nienKhoa").innerText;


    var mssv = document.querySelector('input[name="mssv"]');
    var username = document.querySelector('input[name="username"]');
    var hoTen = document.querySelector('input[name="hoTen"]');
    var gioitinh = document.querySelector('input[name="gioitinh"]');
    var email = document.querySelector('input[name="email"]');
    var ngaysinh = document.querySelector('input[name="ngaysinh"]');
    var sdt = document.querySelector('input[name="sdt"]');
    var chuyenNganh = document.querySelector('input[name="chuyenNganh"]');
    var nienKhoa = document.querySelector('input[name="nienKhoa"]');
   
   

    mssv.value=getmssv;
    username.value=getusername;
    hoTen.value=gethoTen;
    gioitinh.value=getgioitinh;
    email.value=getemail;
    ngaysinh.value=getngaysinh;
    sdt.value=getsdt;
    chuyenNganh.value=getchuyenNganh;
    nienKhoa.value=getnienKhoa;

    console.log(getmssv);
    console.log(getusername);
    console.log(gethoTen);
    console.log(getemail);
    console.log(getngaysinh);
    console.log(getsdt);
    console.log(getchuyenNganh);
    console.log(getnienKhoa);
    
    var btnUpdate=document.querySelector("#update-sinhvien")
    btnUpdate.onclick=function(){
        var formData={
            mssv:mssv.value,
            username: username.value,
            hoTen:hoTen.value,
            gioitinh:gioitinh.value,
            email:email.value,
            ngaysinh:ngaysinh.value,
            sdt:sdt.value,
            chuyenNganh:chuyenNganh.value,
            nienKhoa:nienKhoa.value,
        
        };
        // if(ten.value != "" && percent.value !="" && createdDate.value !="" && modifiedDate.value !=""){
            UpdateSinhVien(id,formData,function(){
                getSinhVien(renderSinhVien);
                alert("C???p nh???t th??nh c??ng");
            })
    
    } 
}


