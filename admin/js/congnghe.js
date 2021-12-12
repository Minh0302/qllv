const CongNgheApi = 'http://127.0.0.1:8121/api/congnghe';

function start(){
    getCongNghe(function(DSCongNghe){
        renderCongNghe(DSCongNghe);
    });

    handleCreateCongNghe();
}

start();

function getCongNghe(callback){
    fetch(CongNgheApi)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function renderCongNghe(DSCongNghe){
    var listCongNghe = document.querySelector('#list-congnghe');
    var i = 1;
    var htmls = DSCongNghe.map(function(CongNghe){
        return `<tr>
                    <td>${i++}</td>
                    <td>${CongNghe.ten}</td>
                    <td>${CongNghe.percent}</td>
                    <td>${CongNghe.modifiedDate}</td>
                    <td>${CongNghe.createdDate}</td>
                    
                    <td>
                    <a href="" class="active" ui-toggle-class=""><i class="fa fa-eye text-success text-active"></i></a>
                    <button class="btn" onclick="handleDeleteCongNghe(${CongNghe.id})"><i class="fa fa-times text-danger text"></i></button>
                </td>`;
    });
    listCongNghe.innerHTML = htmls.join('');
}
function createCongNghe(data, callback){
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    };
    fetch(CongNgheApi, options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleCreateCongNghe(){
    var createBtnCongNghe = document.querySelector('#create-congnghe');
    createBtnCongNghe.onclick = function(){
        var ten = document.querySelector('input[name="ten"]').value;
        var percent = document.querySelector('input[name="percent"]').value;
        var createdDate = document.querySelector('input[name="createdDate"]').value;
        var modifiedDate = document.querySelector('input[name="modifiedDate"]').value;
        
        var formData = {
            ten: ten,
            percent: percent,
            createdDate: createdDate,
            modifiedDate: modifiedDate
        }
        createCongNghe(formData);

    }   
}
function handleDeleteCongNghe(id){
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(CongNgheApi + '/' +id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            getCongNghe(function(DSCongNghe){
                renderCongNghe(DSCongNghe);
            });
        })
}