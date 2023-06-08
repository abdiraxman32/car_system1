load_expense();
btnAction = "Insert";
fillaccoun();
filluser();
function filluser() {

    let sendingData = {
        "action": "get_user_list"
    }

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "Api/user.php",
        data: sendingData,

        success: function (data) {
            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if (status) {
                response.forEach(res => {
                    html += `<option value="${res['user_id']}">${res['username']}</option>`;

                })

                $("#user_id").append(html);


            } else {
                displaymessage("error", response);
            }

        },
        error: function (data) {

        }

    })
}
function fillaccoun() {

    let sendingData = {
        "action": "read_all_account"
    }

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "Api/account.php",
        data: sendingData,

        success: function (data) {
            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if (status) {
                response.forEach(res => {
                    html += `<option value="${res['Account_id']}">${res['bank_name']}</option>`;

                })

                $("#Account_id").append(html);


            } else {
                displaymessage("error", response);
            }

        },
        error: function (data) {

        }

    })
}


$("#expenseForm").on("submit",function(event) {

    event.preventDefault();

    let amount = $("#amount").val();
    let type = $("#type").val();
    let description = $("#description").val();
    let user_id = $("#user_id").val();
    let Account_id = $("#Account_id").val();
    let id = $("#update_id").val();

    let sendingData = {}

    if(btnAction == "Insert"){
        sendingData = {
            "amount" : amount,
            "type" : type,
            "description" : description,
            "user_id" : user_id,
            "Account_id" : Account_id,
            "action" : "register_expense"
            
        }
    
    }else{
          sendingData = {
            "id" : id,
            "amount" : amount,
            "type" : type,
            "description" : description,
            "user_id" : user_id,
            "Account_id" : Account_id,
            "action" : "update_expense"
            
        }
    
    }

    
  
    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "Api/expense.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;

            if(status){

                swal("Good job!", response, "success");
                btnAction = "Insert";
                load_expense();
            }else{
                swal("NOW!", response, "error");
            }
           

        },
        error: function(data){

        }
    })

})

function load_expense(){

    $("#expenseTable tbody").html('');

    let sendingData = {
        "action" : "get_user_transaction"
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "Api/expense.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if(status){

                response.forEach( res => {

                    tr += "<tr>";
                    for(let r in res){

                        if(r == "type"){
                            if(res[r] == "Income"){
                                tr += `<td><span class="btn btn-success btn-sm">${res[r]}</span></td>`;
                            }else{
                                tr += `<td><span class="btn btn-danger btn-sm">${res[r]}</span></td>`;
                            }
                        }else{
                            tr += `<td>${res[r]}</td>`;
                        }

                    }

                //     tr += `<td <div class="dropdown">
                //     <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                //         <i class="bx bx-dots-vertical-rounded"></i>
                //     </button>
                //     <div class="dropdown-menu">
                //         <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
                //     </div>
                // </div></td>`
                    tr += "</tr>"

                })

                $("#expenseTable tbody").append(tr);

            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })

}

function fethUserInfo(id){

    let sendingData = {
        "action" : "get_expense_info",
        "id": id
    }

    $.ajax( {
        method: "POST",
        dataType: "JSON",
        url : "Api/expense.php",
        data : sendingData,
        success: function(data){

            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';

            if(status){

                    btnAction = "Update";
                   $("#update_id").val(response['id']);
                   $("#amount").val(response['amount']);
                   $("#type").val(response['type']);
                   $("#description").val(response['description']);
                   $("#user_id").val(response['user_id']);
                   $("#Account_id").val(response['Account_id']);

                   $("#expenseModal").modal('show');

            }else{
                displayMessage("error",response);
            }
           

        },
        error: function(data){

        }
    })



}

$("#expenseTable").on("click", "a.update_info" ,function(){
    let id = $(this).attr("update_id");

    fethUserInfo(id)
})

