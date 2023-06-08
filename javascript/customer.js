loadcustomers();

btnAction = "Insert";


$("#customerForm").on("submit", function (event) {

  event.preventDefault();


  let frist_name = $("#frist_name").val();
  let last_name = $("#last_name").val();
  let phone = $("#phone").val();
  let address = $("#address").val();
  let city = $("#city").val();
  let state = $("#state").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "frist_name": frist_name,
      "last_name": last_name,
      "phone": phone,
      "address": address,
      "city": city,
      "state": state,
      "action": "register_customer"
    }

  } else {
    sendingData = {
      "customer_id": id,
      "frist_name": frist_name,
      "last_name": last_name,
      "phone": phone,
      "address": address,
      "city": city,
      "state": state,
      "action": "update_customer"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/customer.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#customerForm")[0].reset();
        $("customermodal").modal("hide");
        loadcustomers();





      } else {
        swal("NOW!", response, "error");
      }

    },
    error: function (data) {
      swal("NOW!", response, "error");

    }

  })

})


function loadcustomers() {
  $("#customerTable tbody").html('');
  $("#customerTable thead").html('');

  let sendingData = {
    "action": "read_all_customer"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/customer.php",
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
          for (let r in res) {


            tr += `<td>${res[r]}</td>`;


          }

          tr += `<td <div class="dropdown">
          <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
              <i class="bx bx-dots-vertical-rounded"></i>
          </button>
          <div class="dropdown-menu">
              <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['customer_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
              <a class="dropdown-item delete_info" href="javascript:void(0);" delete_id=${res['customer_id']}><i class="bx bx-trash me-1"></i> Delete</a>
          </div>
      </div></td>`
          tr += "</tr>"


        })
        $("#customerTable thead").append(th);
        $("#customerTable tbody").append(tr);
      }


    },
    error: function (data) {

    }

  })
}

function get_customer_info(customer_id) {

  let sendingData = {
    "action": "get_customer_info",
    "customer_id": customer_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/customer.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['customer_id']);
        $("#frist_name").val(response['frist_name']);
        $("#last_name").val(response['last_name']);
        $("#phone").val(response['phone']);
        $("#address").val(response['address']);
        $("#city").val(response['city']);
        $("#state").val(response['state']);
        $("#customermodal").modal('show');




      } else {
        dispalaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}


function Delete_customer(customer_id) {

  let sendingData = {
    "action": "Delete_customer",
    "customer_id": customer_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/customer.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        swal("Good job!", response, "success");
        loadcustomers();


      } else {
        swal(response);
      }

    },
    error: function (data) {

    }

  })
}

$("#customerTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_customer_info(id)
})


$("#customerTable").on('click', "a.delete_info", function () {
  let id = $(this).attr("delete_id");
  if (confirm("Are you sure To Delete")) {
    Delete_customer(id)

  }

})