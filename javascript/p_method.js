
loadpayment_method();
btnAction = "Insert";

$("#p_method_form").on("submit", function (event) {

  event.preventDefault();


  let Method = $("#Method").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "Method": Method,
      "action": "register_p_method"
    }

  } else {
    sendingData = {
      "p_method_id": id,
      "Method": Method,
      "action": "update_p_method"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/pe_method.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#p_method_form")[0].reset();
        loadpayment_method();





      } else {
        swal("Good job!", response, "error");
      }

    },
    error: function (data) {
      displaymessage("error", data.responseText);

    }

  })

})

function loadpayment_method() {
  $("#pe_method_Table tbody").html('');
  $("#pe_method_Table thead").html('');

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
              <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['p_method_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
              <a class="dropdown-item delete_info" href="javascript:void(0);" delete_id=${res['p_method_id']}><i class="bx bx-trash me-1"></i> Delete</a>
          </div>
      </div></td>`
          tr += "</tr>"

        })
        $("#pe_method_Table thead").append(th);
        $("#pe_method_Table tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_p_method(p_method_id) {

  let sendingData = {
    "action": "get_p_method",
    "p_method_id": p_method_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/pe_method.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['p_method_id']);
        $("#Method").val(response['name']);
        $("#p_method_modal").modal('show');




      } else {
        displayymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

function Delete_p_method(p_method_id) {

  let sendingData = {
    "action": "Delete_p_method",
    "p_method_id": p_method_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/pe_method.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        swal("Good job!", response, "success");
        loadpayment_method();


      } else {
        swal(response);
      }

    },
    error: function (data) {

    }

  })
}

$("#pe_method_Table").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_p_method(id)
})

$("#pe_method_Table").on('click', "a.delete_info", function () {
  let id = $(this).attr("delete_id");
  if (confirm("Are you sure To Delete")) {
    Delete_p_method(id)

  }

})