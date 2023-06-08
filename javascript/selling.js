btnAction = "Insert";
fillcustomer();
fill_car();
fill_price();
fill_price2();
loadesell();

function fillcustomer() {

  let sendingData = {
    "action": "read_all_customer"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/selling.php",
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

        $("#customer_id").append(html);


      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

function fill_car() {

  let sendingData = {
    "action": "read_all_cars"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/car.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      let html = '';
      let tr = '';

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['car_id']}">${res['car_name']}</option>`;

        })

        $("#car_id").append(html);


      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

$("#sellingForm").on("submit", function (event) {

  event.preventDefault();


  let customer_id = $("#customer_id").val();
  let car_id = $("#car_id").val();
  let quantity = $("#quantity").val();
  let price = $("#price").val();
  let balance = $("#balance").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "customer_id": customer_id,
      "car_id": car_id,
      "quantity": quantity,
      "price": price,
      "balance": balance,
      "action": "register_selling"
    }

  } else {
    sendingData = {
      "sell_id": id,
      "customer_id": customer_id,
      "car_id": car_id,
      "quantity": quantity,
      "price": price,
      "balance": balance,
      "action": "update_sell"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/selling.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#sellingForm")[0].reset();
        loadesell();


      } else {
        employemessage("error", response);
      }

    },
    error: function (data) {
      employemessage("error", data.responseText);

    }

  })

})

$("#sellingForm").on("change", "select.car_name", function () {
    let car_name = $(this).val();
    console.log("name", car_name);
    fill_price2(car_name);
    $("#quantity").val()==0;
  
  })


  
  $("#quantity").on("change", function () {
    let quantity = $(this).val();
   let car_id = $("#car_id").val();
    fill_price(car_id, quantity);
    console.log("quantity",quantity);
    console.log("car_id",car_id);

})



function fill_price2(car_id, quantity) {
    
    let sendingData = {
      "action": "read_car_price",
      "car_id": car_id

      
  
    }

  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/selling.php",
      data: sendingData,
  
      success: function (data) {
        let status = data.status;
        let response = data.data;
        console.log("name", response)
        let html = '';
        let tr = '';
  
        if (status) {
  
          response.forEach(res => {
            $("#price").val(res['price']);
            $("#balance").val(res['price']);
  
          })
  
  
  
        } else {
          displaymessage("error", response);
        }
  
      },
      error: function (data) {
  
      }
  
    })
  }
  
function fill_price(car_id, quantity) {
    
    let sendingData = {
      "action": "read_car_price",
      "car_id": car_id

      
  
    }

  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/selling.php",
      data: sendingData,
  
      success: function (data) {
        let status = data.status;
        let response = data.data;
        console.log("name", response)
        let html = '';
        let tr = '';
  
        if (status) {
  
          response.forEach(res => {
            $("#price").val(res['price']*quantity);
            $("#balance").val(res['price']*quantity);
  
          })
  
  
  
        } else {
          displaymessage("error", response);
        }
  
      },
      error: function (data) {
  
      }
  
    })
  }


function loadesell() {
  $("#sellingTable tbody").html('');
  $("#sellingTable thead").html('');

  let sendingData = {
    "action": "read_all_sell"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/selling.php",
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

          th += "<td>Action</td></tr>";




          tr += "<tr>";
          for(let r in res){

           
            if(r=="price"){
              tr += `<td>$${res[r]}</td>`;

            }else if(r=="balance"){
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
            <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['sell_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
        </div>
    </div></td>`
        tr += "</tr>"

        })
        $("#sellingTable thead").append(th);
        $("#sellingTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_sell_info(sell_id) {

  let sendingData = {
    "action": "get_sell_info",
    "sell_id": sell_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/selling.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['sell_id']);
        $("#customer_id").val(response['customer_id']);
        $("#car_id").val(response['car_id']);
        $("#quantity").val(response['quantity']);
        $("#price").val(response['price']);
        $("#balance").val(response['balance']);
        $("#sellingmodal").modal('show');




      } else {
        employemessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}



$("#sellingTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_sell_info(id)
})

