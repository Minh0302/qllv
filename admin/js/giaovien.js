const GiaoVienApi = 'http://127.0.0.1:8122/api/giaovien';
const BoMonApi = 'http://127.0.0.1:8122/api/bomon';

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
                    <td>${GiaoVien.msgv}</td>
                    <td>${GiaoVien.username}</td>
                    <td>${GiaoVien.hoTen}</td>
                    <td>${GiaoVien.gioitinh}</td>
                    <td>${GiaoVien.email}</td>
                    <td>${GiaoVien.ngaysinh}</td>
                    <td>${GiaoVien.sdt}</td>
                    <td>${GiaoVien.bomonCode}</td>
                    <td>${GiaoVien.tenBoMon}</td>
                    <td>
                    <a href="" class="active" ui-toggle-class=""><i class="fa fa-eye text-success text-active"></i></a>
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
        return `<option value="${MaBoMon.code}">${MaBoMon.code}</option>`;
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
        return `<option value="${TenBoMon.code}">${TenBoMon.tenBoMon}</option>`;
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
    fetch(GiaoVienApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var bomonItem = document.querySelector('.giaovien-'+id);
            if(bomonItem){
                bomonItem.remove();
            }
        })
}