btnAction = "Insert";
fill_car_modal();
fill_suplier();
loadecars();

function fill_car_modal() {

  let sendingData = {
    "action": "read_all_car_modals"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/car_modals.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      let html = '';
      let tr = '';

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['car_modal_id']}">${res['modal']}</option>`;

        })

        $("#car_modal_id").append(html);


      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}


function fill_suplier() {

    let sendingData = {
      "action": "read_all_supliers"
    }
  
    $.ajax({
      method: "POST",
      dataType: "JSON",
      url: "Api/supliers.php",
      data: sendingData,
  
      success: function (data) {
        let status = data.status;
        let response = data.data;
        let html = '';
        let tr = '';
  
        if (status) {
          response.forEach(res => {
            html += `<option value="${res['suplier_id']}">${res['company_name']}</option>`;
  
          })
  
          $("#suplier_id").append(html);
  
  
        } else {
          displaymessage("error", response);
        }
  
      },
      error: function (data) {
  
      }
  
    })
  }
  



$("#carForm").on("submit", function (event) {

  event.preventDefault();


  let car_name = $("#car_name").val();
  let car_modal_id = $("#car_modal_id").val();
  let size = $("#size").val();
  let suplier_id = $("#suplier_id").val();
  let unit_price = $("#unit_price").val();
  let price = $("#price").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "car_name": car_name,
      "car_modal_id": car_modal_id,
      "size": size,
      "suplier_id": suplier_id,
      "unit_price": unit_price,
      "price": price,
      "action": "register_cars"
    }

  } else {
    sendingData = {
      "car_id": id,
      "car_name": car_name,
      "car_modal_id": car_modal_id,
      "size": size,
      "suplier_id": suplier_id,
      "unit_price": unit_price,
      "price": price,
      "action": "update_car"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/car.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#carForm")[0].reset();
        loadecars();


      } else {
        employemessage("error", response);
      }

    },
    error: function (data) {
      employemessage("error", data.responseText);

    }

  })

})


function loadecars() {
  $("#carTable tbody").html('');
  $("#carTable thead").html('');

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
              <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['car_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
              <a class="dropdown-item delete_info" href="javascript:void(0);" delete_id=${res['car_id']}><i class="bx bx-trash me-1"></i> Delete</a>
          </div>
      </div></td>`
          tr += "</tr>"

          // tr += `<td> <a class="btn btn-info update_info"  update_id=${res['car_id']}><i class="mdi mdi-grease-pencil" style="color: #fff"></i></a>&nbsp;&nbsp 
          // <a class="btn btn-danger delete_info" delete_id=${res['car_id']}><i class="mdi mdi-close-box
          // " style="color: #fff"></i></a> </td>`
          // tr += "</tr>"

        })
        $("#carTable thead").append(th);
        $("#carTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_car_info(car_id) {

  let sendingData = {
    "action": "get_car_info",
    "car_id": car_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/car.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['car_id']);
        $("#car_name").val(response['car_name']);
        $("#car_modal_id").val(response['car_modal_id']);
        $("#size").val(response['size']);
        $("#suplier_id").val(response['suplier_id']);
        $("#unit_price").val(response['unit_price']);
        $("#price").val(response['price']);
        $("#carmodal").modal('show');




      } else {
        employemessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}


function Delete_car(car_id) {

  let sendingData = {
    "action": "Delete_car",
    "car_id": car_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/car.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        swal("Good job!", response, "success");
        loadecars();


      } else {
        swal(response);
      }

    },
    error: function (data) {

    }

  })
}



$("#carTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_car_info(id)
})


$("#carTable").on('click', "a.delete_info", function () {
  let id = $(this).attr("delete_id");
  if (confirm("Are you sure To Delete")) {
    Delete_car(id)

  }

})