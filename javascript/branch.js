loadbranch();

btnAction = "Insert";


$("#branchForm").on("submit", function (event) {

  event.preventDefault();


  let address = $("#address").val();
  let city = $("#city").val();
  let state = $("#state").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "address": address,
      "city": city,
      "state": state,
      "action": "register_branch"
    }

  } else {
    sendingData = {
      "branch_id": id,
      "address": address,
      "city": city,
      "state": state,
      "action": "update_branch"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/branch.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#branchForm")[0].reset();
        $("branchmodal").modal("hide");
        loadbranch();





      } else {
        swal("NOW!", response, "error");
      }

    },
    error: function (data) {
      swal("NOW!", response, "error");

    }

  })

})


function loadbranch() {
  $("#branchTable tbody").html('');
  $("#branchTable thead").html('');

  let sendingData = {
    "action": "read_all_branch"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/branch.php",
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
              <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['branch_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
              <a class="dropdown-item delete_info" href="javascript:void(0);" delete_id=${res['branch_id']}><i class="bx bx-trash me-1"></i> Delete</a>
          </div>
      </div></td>`
          tr += "</tr>"

        })
        $("#branchTable thead").append(th);
        $("#branchTable tbody").append(tr);
      }


    },
    error: function (data) {

    }

  })
}

function get_branch_info(branch_id) {

  let sendingData = {
    "action": "get_branch_info",
    "branch_id": branch_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/branch.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['branch_id']);
        $("#address").val(response['address']);
        $("#city").val(response['city']);
        $("#state").val(response['state']);
        $("#branchmodal").modal('show');




      } else {
        dispalaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}


function Delete_branch(branch_id) {

  let sendingData = {
    "action": "Delete_branch",
    "branch_id": branch_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/branch.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        swal("Good job!", response, "success");
        loadbranch();


      } else {
        swal(response);
      }

    },
    error: function (data) {

    }

  })
}

$("#branchTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_branch_info(id)
})


$("#branchTable").on('click', "a.delete_info", function () {
  let id = $(this).attr("delete_id");
  if (confirm("Are you sure To Delete")) {
    Delete_branch(id)

  }

})