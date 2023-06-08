fill_customer_selling();
fillaccoun();
fill_p_method();
fill_amount();
loadpayment();
subt();
function fill_customer_selling() {

  let sendingData = {
    "action": "read_customer_selling"
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

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['customer_id']}">${res['customer_name']}</option>`;

        })

        $("#customer_idd").append(html);


      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}



$("#customer_idd").on("change", function(){
  if($("#customer_idd").val()== 0){
    console.log("0 waaye");
    $("#amount").val("");

  }else{
    console.log(amount);
  }
})


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

        $("#Accountt_id").append(html);


      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

function fill_p_method() {

  let sendingData = {
    "action": "read_all_p_method"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/pe_method.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      let html = '';
      let tr = '';

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['p_method_id']}">${res['name']}</option>`;

        })

        $("#p_method_id").append(html);


      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

btnAction = "Insert";

$("#paymentform").on("submit", function (event) {

  event.preventDefault();


  let customer_idd = $("#customer_idd").val();
  let amount = $("#amount").val();
  let amount_paid = $("#amount_paid").val();
  let balance = $("#balance").val();
  let Accountt_id = $("#Accountt_id").val();
  let p_method_id = $("#p_method_id").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "customer_idd": customer_idd,
      "amount": amount,
      "amount_paid": amount_paid,
      "balance": balance,
      "Accountt_id": Accountt_id,
      "p_method_id": p_method_id,
      "action": "register_payment"
    }

  } else {
    sendingData = {
      "payment_id": id,
      "customer_idd": customer_idd,
      "amount": amount,
      "amount_paid": amount_paid,
      "balance": balance,
      "Accountt_id": Accountt_id,
      "p_method_id": p_method_id,
      "action": "update_payment"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/payment.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#paymentform")[0].reset();
        loadpayment();





      } else {
        swal("NOW!", response, "error");
      }

    },
    error: function (data) {
      swal("NOW!", response, "error");

    }

  })

})


$("#paymentform").on("change", "select.customer_name", function () {
  let customer_name = $(this).val();
  console.log("name", customer_name);
  fill_amount(customer_name);

})



function subt(){
  var elm = document.forms["paymentform"];

  if (elm["amount"].value != "" && elm["amount_paid"].value != "")
    {elm["balance"].value = Math.round(parseFloat(elm["amount"].value) - parseFloat(elm["amount_paid"].value),'e2');
}
}

// $(function(){
//   $('#dropdown').on('change',function(){

//    var id = $(this).val();
//    $.post('get_payment_fee.php',{id:$(this).val()},function(res){
//    var res1 = res.split(",");

//    $("#amount").val($.trim(res1[0]));
   
          
//    });

//    });
// });




function fill_amount(customer_id) {
  let sendingData = {
    "action": "read_amount",
    "customer_id": customer_id

  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/payment.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      console.log("name", response)
      let html = '';
      let tr = '';

      if (status) {

        response.forEach(res => {
          $("#amount").val(res['balance']);

        })



      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}




function loadpayment() {
  $("#paymentTable tbody").html('');
  $("#paymentTable thead").html('');

  let sendingData = {
    "action": "read_all_payment"
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
          tr += "<tr>";
          th = "<tr>";
          for (let r in res) {
            th += `<th>${r}</th>`;

            if(r=="Total_amount"){
              tr += `<td>$${res[r]}</td>`;

            }else if(r=="amount_paid"){
              tr += `<td>$${res[r]}</td>`;


            }

            else if (r == "balance") {
              if (res[r] == 0) {
                tr += `<td><span class="btn btn-success btn-sm">✔</span></td>`;
              } else {
                tr += `<td><span class="btn btn-danger btn-sm">💲${res[r]}</span></td>`;
              }
            } else {
              tr += `<td>${res[r]}</td>`;
            }

          }

          tr += "</tr>"

        })

        $("#paymentTable thead").append(th);
        $("#paymentTable tbody").append(tr);
      }



    },
    error: function (data) {

    }

  })
}


