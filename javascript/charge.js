filluser();
fillaccoun();
loadcharge();
fillmonth();
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

                $("#user_idd").append(html);


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

                $("#Acount_id").append(html);


            } else {
                displaymessage("error", response);
            }

        },
        error: function (data) {

        }

    })
}
function fillmonth() {

    let sendingData = {
      "action": "read_all_monthes"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/charge.php",
      data: sendingData,
  
      success: function (data) {
        let status = data.status;
        let response = data.data;
        let html = '';
        let tr = '';
  
        if (status) {
          response.forEach(res => {
            html += `<option value="${res['month_id']}">${res['month_name']}</option>`;
  
          })
  
          $("#month").append(html);
  
  
        } else {
          displaymessage("error", response);
        }
  
      },
      error: function (data) {
  
      }
  
    })
  }
  

btnAction = "Insert";

$("#chargeform").on("submit", function (event) {

    event.preventDefault();


    let month = $("#month").val();
    let year = $("#year").val();
    let description = $("#description").val();
    let user_idd = $("#user_idd").val();
    let Acount_id = $("#Acount_id").val();
    let id = $("#update_id").val();

    let sendingData = {}

    if (btnAction == "Insert") {
        sendingData = {
            "month": month,
            "year": year,
            "description": description,
            "user_idd": user_idd,
            "Acount_id": Acount_id,
            "action": "register_charge"
        }

    
    }



    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "Api/charge.php",
        data: sendingData,
        success: function (data) {
            let status = data.status;
            let response = data.data;

               
                if($("#month").val()== 0){
                    console.log("0 waaye");
                
                    alert("select month");
    
             
              }
               

             else if(status){
                swal("Good job!", response, "success");
                btnAction = "Insert";
                $("#chargeform")[0].reset();
                loadcharge();   

              }else{
                swal("Good job!", response, "error");

              }

        },
        error: function (data) {
            swal("Good job!", response, "error");

        }

    })

})



function loadcharge() {
    $("#chargeTable tbody").html('');
    $("#chargeTable thead").html('');

    let sendingData = {
        "action": "read_all_charge"
    }

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "Api/charge.php",
        data: sendingData,

        success: function (data) {
            let status = data.status;
            let response = data.data;
            let html = '';
            let tr = '';
            let th = '';

            if (status) {
                response.forEach(res => {
                    th = "<tr>";
                    for (let r in res) {
                        th += `<th>${r}</th>`;
                    }





                    tr += "<tr>";
                    for (let r in res) {

                        if(r=="salary"){
                            tr += `<td>$${res[r]}</td>`;
              
                          }else{
                            tr += `<td>${res[r]}</td>`;

                          }



                    }

                    tr += "</tr>"

                })
                $("#chargeTable thead").append(th);
                $("#chargeTable tbody").append(tr);
            }




        },
        error: function (data) {

        }

    })
}