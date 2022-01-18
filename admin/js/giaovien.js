const GiaoVienApi = 'http://127.0.0.1:8120/api/giaovien';
const BoMonApi = 'http://127.0.0.1:8120/api/bomon';


function start(){
    getGiaoVien(function (DSGiaoVien){
        renderGiaoVien(DSGiaoVien);
    });
    getMaBoMon(function (DSMaBoMon){
        renderMaBoMon(DSMaBoMon);
    });
    getTenBoMon(function(DSTenBoMon){
        renderTenBoMon(DSTenBoMon);
    });
    handleCreateGiaoVien();
    handleGiaoVien(id);
}
start();

function getGiaoVien(callback){
    fetch(GiaoVienApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderGiaoVien(DSGiaoVien){
    var listGiaoVien = document.querySelector('#list-giaovien');
    var i = 1;
    var htmls = DSGiaoVien.map(function (GiaoVien) {
        return `<tr class="giaovien-${GiaoVien.id}">
                    <td>${i++}</td>
                    <td class="msgv">${GiaoVien.msgv}</td>
                    <td class="username">${GiaoVien.username}</td>
                    <td class="hoTen">${GiaoVien.hoTen}</td>
                    <td class="gioitinh">${GiaoVien.gioitinh}</td>
                    <td class="email">${GiaoVien.email}</td>
                    <td class="ngaysinh">${GiaoVien.ngaysinh}</td>
                    <td class="sdt">${GiaoVien.sdt}</td>
                    <td class="bomonCode">${GiaoVien.bomonCode}</td>
                    <td class="tenBoMon">${GiaoVien.tenBoMon}</td>
                    <td>
                    <button class="btn" onclick="handleGiaoVien(${GiaoVien.id})" data-toggle="modal" data-target="#updateGiaoVien"><i class="fa fa-eye text-success text-active"></i></button>
                    <button class="btn" onclick="handleDeleteGiaoVien(${GiaoVien.id})"><i class="fa fa-times text-danger text"></i></button>
                </td>`;
    });
    listGiaoVien.innerHTML = htmls.join('');
}

function getMaBoMon(callback){
    fetch(BoMonApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderMaBoMon(DSMaBoMon){
    var listMaBoMon = document.querySelector('#list-mabomon');
    var htmls = DSMaBoMon.map(function (MaBoMon) {
        return `<option selected value="${MaBoMon.code}">${MaBoMon.code}</option>`;
    });
    listMaBoMon.innerHTML = htmls.join('');
}
function getTenBoMon(callback){
    fetch(BoMonApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderTenBoMon(DSTenBoMon){
    var listTenBoMon = document.querySelector('#list-tenbomon');
    var htmls = DSTenBoMon.map(function (TenBoMon) {
        return `<option selected value="${TenBoMon.code}">${TenBoMon.tenBoMon}</option>`;
    });
    listTenBoMon.innerHTML = htmls.join('');
}

function createGiaoVien(data,callback){
    var options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    };
    fetch(GiaoVienApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleCreateGiaoVien(){
    var createBtnGiaoVien = document.querySelector('#create-giaovien');
    createBtnGiaoVien.onclick = function(){
        var msgv = document.querySelector('input[name="msgv"]').value;
        var username = document.querySelector('input[name="username"]').value;
        var hoTen = document.querySelector('input[name="hoTen"]').value;
        var gioitinh = document.querySelector('input[name="gioitinh"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var ngaysinh = document.querySelector('input[name="ngaysinh"]').value;
        var sdt = document.querySelector('input[name="sdt"]').value;
        var bomonCode = document.querySelector('input[name="bomonCode"]').value;
        var tenBoMon = document.querySelector('input[name="tenBoMon"]').value;

        var formData = {
            msgv: msgv,
            username: username,
            hoTen: hoTen,
            gioitinh: gioitinh,
            email: email,
            ngaysinh: ngaysinh,
            sdt: sdt,
            bomonCode: bomonCode,
            tenBoMon: tenBoMon
        }
        createGiaoVien(formData);
    }
}
function handleDeleteGiaoVien(id){
    var options = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    }
    if(confirm('Bạn có muốn xóa giáo viên này?')){
    fetch(GiaoVienApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var giaovienItem = document.querySelector('.giaovien-'+id);
            if(giaovienItem){
                giaovienItem.remove();
            }
        })
    }
    window.location.reload();
}
function UpdateGiaoVien(id,data,callback){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(GiaoVienApi + "/"+id,options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleGiaoVien(id){
    var giaovienItem = document.querySelector('.giaovien-'+id);
    var getmsgv=giaovienItem.querySelector(".msgv").innerText;
    var getusername=giaovienItem.querySelector(".username").innerText;
    var gethoTen=giaovienItem.querySelector(".hoTen").innerText;
    var getgioitinh=giaovienItem.querySelector(".gioitinh").innerText;
    var getemail=giaovienItem.querySelector(".email").innerText;
    var getngaysinh=giaovienItem.querySelector(".ngaysinh").innerText;
    var getsdt=giaovienItem.querySelector(".sdt").innerText;
    var getbomoncode=giaovienItem.querySelector(".bomonCode").innerText;


    var msgv = document.querySelector('input[name="msgv"]');
    var username = document.querySelector('input[name="username"]');
    var hoTen = document.querySelector('input[name="hoTen"]');
    var gioitinh = document.querySelector('input[name="gioitinh"]');
    var email = document.querySelector('input[name="email"]');
    var ngaysinh = document.querySelector('input[name="ngaysinh"]');
    var sdt = document.querySelector('input[name="sdt"]');
    var bomonCode = document.querySelector('select[name="bomonCode"]');


    msgv.value=getmsgv;
    username.value=getusername;
    hoTen.value=gethoTen;
    gioitinh.value=getgioitinh;
    email.value=getemail;
    ngaysinh.value=getngaysinh;
    sdt.value=getsdt;
    bomonCode.value=getbomoncode;
    
    var btnUpdate=document.querySelector("#update-giaovien")
    btnUpdate.onclick=function(){
        var formData={
            msgv:msgv.value,
            username: username.value,
            hoTen: hoTen.value,
            gioitinh: gioitinh.value,
            email: email.value,
            ngaysinh: ngaysinh.value,
            sdt: sdt.value,
            bomonCode: bomonCode.value
        
        };
        // if(ten.value != "" && percent.value !="" && createdDate.value !="" && modifiedDate.value !=""){
            UpdateGiaoVien(id,formData,function(){
                getGiaoVien(renderGiaoVien);
                alert("Cập nhật thành công");
            })
    
    } 
}
