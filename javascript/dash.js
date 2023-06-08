 let tempTotalincome = 0;
 let tempTotalexpense = 0;
loadtop_payments();
load_all_pending();
 get_total_customers();
 get_total_income();
get_total_employe();
get_total_expense();




function get_total_income() {

    let sendingData = {
        "action": "get_total_income"

    }

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "Api/income.php",
        data: sendingData,
        async: false,
        success: function (data) {
            let status = data.status;
            let response = data.data;


            if (status) {


                document.querySelector("#totalincome").innerText = response['total'];

                tempTotalincome = response['total'];

            } else {

            }

        },
        error: function (data) {

        }

    })
}


function get_total_expense() {

    let sendingData = {
        "action": "get_total_expense"
  
    }
  
    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "Api/income.php",
        data: sendingData,
        async: false,
        success: function (data) {
            let status = data.status;
            let response = data.data;
  
  
            if (status) {
  
  
                document.querySelector("#total_expenses").innerText = response['total'];
  
                tempTotalexpense = response['total'];
  
            } else {
  
            }
  
        },
        error: function (data) {
  
        }
  
    })
  }



function get_total_employe() {

    let sendingData = {
        "action": "get_total_employe"

    }

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "Api/income.php",
        data: sendingData,

        success: function (data) {
            let status = data.status;
            let response = data.data;


            if (status) {


                document.querySelector("#total_employe").innerText = response['employee']


            } else {

            }

        },
        error: function (data) {

        }

    })
}

function get_total_customers() {

    let sendingData = {
        "action": "get_total_customers"

    }

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "Api/income.php",
        data: sendingData,

        success: function (data) {
            let status = data.status;
            let response = data.data;


            if (status) {


                document.querySelector("#total_customers").innerText = response['customers']


            } else {

            }

        },
        error: function (data) {

        }

    })
}


function loadtop_payments() {
    $("#Top_payments tbody").html('');
    $("#Top_payments thead").html('');

    let sendingData = {
        "action": "read_top_payments"
    }

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "Api/payment.php",
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


                    th += "<td>latest</td></tr>";




                    tr += "<tr>";
                    for (let r in res) {


                        if(r=="Amount"){
                            tr += `<td>$${res[r]}</td>`;
              
                          }else{
                            tr += `<td>${res[r]}</td>`;
                          }

                    }

                    tr += `<td <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                        <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                    <a class="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
                    <a class="dropdown-item" href="javascript:void(0);">Last Month</a>
                    <a class="dropdown-item" href="javascript:void(0);">Last Year</a>
                    </div>
                </div></td>`
                    tr += "</tr>"

                })
                $("#Top_payments thead").append(th);
                $("#Top_payments tbody").append(tr);
            }




        },
        error: function (data) {

        }

    })
}

function load_all_pending() {
    $("#Top_pending tbody").html('');
    $("#Top_pending thead").html('');

    let sendingData = {
        "action": "read_all_pending"
    }

    $.ajax({
        method: "POST",
        dataType: "JSON",
        url: "Api/payment.php",
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


                    th += "<td>latest</td></tr>";




                    tr += "<tr>";
                    for (let r in res) {


                        if(r=="price"){
                            tr += `<td>$${res[r]}</td>`;
              
                          }
                         else if(r == "status"){
                            if(res[r] == "paid"){
                                tr += `<td><span class="btn btn-success btn-sm">${res[r]}</span></td>`;
                            }else{
                                tr += `<td><span class="btn btn-danger btn-sm">${res[r]}</span></td>`;
                            }
                        }
                          
                          else{
                            tr += `<td>${res[r]}</td>`;
                          }

                    }

                    tr += `<td <div class="dropdown">
                    <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                        <i class="bx bx-dots-vertical-rounded"></i>
                    </button>
                    <div class="dropdown-menu">
                    <a class="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
                    <a class="dropdown-item" href="javascript:void(0);">Last Month</a>
                    <a class="dropdown-item" href="javascript:void(0);">Last Year</a>
                    </div>
                </div></td>`
                    tr += "</tr>"

                })
                $("#Top_pending thead").append(th);
                $("#Top_pending tbody").append(tr);
            }




        },
        error: function (data) {

        }

    })
}