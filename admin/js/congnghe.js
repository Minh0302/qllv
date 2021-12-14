const CongNgheApi = 'http://127.0.0.1:8120/api/congnghe';

function start(){
    getCongNghe(function(DSCongNghe){
        renderCongNghe(DSCongNghe);
    });

    handleCreateCongNghe();

    handleCongNghe(id);
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
        return `<tr class="congnghe-${CongNghe.id}">
                    <td>${i++}</td>
                    <td class="ten">${CongNghe.ten}</td>
                    <td class="percent">${CongNghe.percent}</td>
                    <td class="modifiedDate">${CongNghe.modifiedDate}</td>
                    <td class="createdDate">${CongNghe.createdDate}</td>
                    <td>
                        <button class="btn" onclick="handleCongNghe(${CongNghe.id})" data-toggle="modal" data-target="#updateCongNghe"><i class="fa fa-eye text-success text-active"></i></button>
                        <button class="btn" onclick="handleDeleteCongNghe(${CongNghe.id})"><i class="fa fa-times text-danger text"></i></button>
                    </td>
                </tr>`;
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
        if(ten != "" && percent !="" && createdDate !="" && modifiedDate !=""){
            ten = "";
            percent = "";
            createdDate = "";
            modifiedDate = "";
            createCongNghe(formData);
            alert("Thêm thành công!!!");
        }else{
            alert("Bạn hãy nhập đầy đủ thông tin");
        }
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
    if(confirm('Are you sure you want to delete?')){
        fetch(CongNgheApi + '/' +id, options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            var congngheItem = document.querySelector('.congnghe-'+id);
            if(congngheItem){
                congngheItem.remove();
                alert('Đã xoá thành công!!!');
            }
        })
    }   
}
function UpdateCongNghe(id,data,callback){
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }
    fetch(CongNgheApi + "/"+id,options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}
function handleCongNghe(id){
    var congngheItem = document.querySelector('.congnghe-'+id);
    var getTen=congngheItem.querySelector(".ten").innerText;
    var getPercent=congngheItem.querySelector(".percent").innerText;
    var getCreatedDate=congngheItem.querySelector(".createdDate").innerText;
    var getModifiedDate=congngheItem.querySelector(".modifiedDate").innerText;

    var ten = document.querySelector('input[name="ten"]');
    var percent = document.querySelector('input[name="percent"]');
    var createdDate = document.querySelector('input[name="createdDate"]');
    var modifiedDate = document.querySelector('input[name="modifiedDate"]');

    ten.value=getTen;
    percent.value=getPercent;
    createdDate.value=getCreatedDate;
    modifiedDate.value=getModifiedDate;

    // console.log(getTen);
    // console.log(getPercent);
    // console.log(getCreatedDate);
    // console.log(getModifiedDate);
    
    var btnUpdate=document.querySelector("#update-congnghe")
    btnUpdate.onclick=function(){
        var formData={
            ten:ten.value,
            percent: percent.value,
            createdDate: createdDate.value,
            modifiedDate: modifiedDate.value
        };
        // if(ten.value != "" && percent.value !="" && createdDate.value !="" && modifiedDate.value !=""){
            UpdateCongNghe(id,formData,function(){
                getCongNghe(renderCongNghe);
            })
        // }
        // else{
        //     alert("Bạn hãy nhập đầy đủ thông tin");
        // }
    } 
}
// function handleUpdateCongNghe(){
//     var updateBtnCongNghe = document.querySelector('#update-congnghe');
//     updateBtnCongNghe.onclick = function(){
//         var ten = document.querySelector('input[name="ten"]').value;
//         var percent = document.querySelector('input[name="percent"]').value;
//         var createdDate = document.querySelector('input[name="createdDate"]').value;
//         var modifiedDate = document.querySelector('input[name="modifiedDate"]').value;
        
//         var formData = {
//             ten: ten,
//             percent: percent,
//             createdDate: createdDate,
//             modifiedDate: modifiedDate
//         }
//         UpdateCongNghe(formData, function(){
//             alert("Cập nhật thành công!!!");
//             getCongNghe(renderCongNghe);
//         });
//     }   
// }