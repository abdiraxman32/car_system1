loadaccount();

btnAction = "Insert";


$("#accountForm").on("submit", function (event) {

  event.preventDefault();


  let bank_name = $("#bank_name").val();
  let holder_name = $("#holder_name").val();
  let accoun_number = $("#accoun_number").val();
  let balance = $("#balance").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "bank_name": bank_name,
      "holder_name": holder_name,
      "accoun_number": accoun_number,
      "balance": balance,
      "action": "register_account"
    }

  } else {
    sendingData = {
      "Account_id": id,
      "bank_name": bank_name,
      "holder_name": holder_name,
      "accoun_number": accoun_number,
      "balance": balance,
      "action": "update_account"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/account.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#accountForm")[0].reset();
        $("accountmodal").modal("hide");
        loadaccount();





      } else {
        swal("NOW!", response, "error");
      }

    },
    error: function (data) {
      swal("NOW!", response, "error");

    }

  })

})


function loadaccount() {
  $("#accountTable tbody").html('');
  $("#accountTable thead").html('');

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
              <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['Account_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
              <a class="dropdown-item delete_info" href="javascript:void(0);" delete_id=${res['Account_id']}><i class="bx bx-trash me-1"></i> Delete</a>
          </div>
      </div></td>`
          tr += "</tr>"

          // tr += `<td> <a class="btn btn-info update_info"  update_id=${res['Account_id']}><i class="mdi mdi-grease-pencil" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['Account_id']}><i class="mdi mdi-close-box
          // " style="color: #fff"></i></a> </td>`
          // tr += "</tr>"

        })
        $("#accountTable thead").append(th);
        $("#accountTable tbody").append(tr);
      }


    },
    error: function (data) {

    }

  })
}

function get_account_info(Account_id) {

  let sendingData = {
    "action": "get_account_info",
    "Account_id": Account_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/account.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['Account_id']);
        $("#bank_name").val(response['bank_name']);
        $("#holder_name").val(response['holder_name']);
        $("#accoun_number").val(response['accoun_number']);
        $("#balance").val(response['balance']);
        $("#accountmodal").modal('show');




      } else {
        dispalaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

function Delete_account(Account_id) {

  let sendingData = {
    "action": "Delete_account",
    "Account_id": Account_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/account.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        swal("Good job!", response, "success");
        loadaccount();


      } else {
        swal(response);
      }

    },
    error: function (data) {

    }

  })
}

$("#accountTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_account_info(id)
})


$("#accountTable").on('click', "a.delete_info", function () {
  let id = $(this).attr("delete_id");
  if (confirm("Are you sure To Delete")) {
    Delete_account(id)

  }

})