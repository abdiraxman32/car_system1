btnAction = "Insert";
fillbranch();
fill_job_title();
loademploye();

function fillbranch() {

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

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['branch_id']}">${res['address']}</option>`;

        })

        $("#branch").append(html);


      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

function fill_job_title() {

  let sendingData = {
    "action": "read_all_job_title"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/job_title.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;
      let html = '';
      let tr = '';

      if (status) {
        response.forEach(res => {
          html += `<option value="${res['title_id']}">${res['position']}</option>`;

        })

        $("#title").append(html);


      } else {
        displaymessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}

$("#employeform").on("submit", function (event) {

  event.preventDefault();


  let frist_name = $("#frist_name").val();
  let last_name = $("#last_name").val();
  let phone = $("#phone").val();
  let city = $("#city").val();
  let state = $("#state").val();
  let branch = $("#branch").val();
  let title = $("#title").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "frist_name": frist_name,
      "last_name": last_name,
      "phone": phone,
      "city": city,
      "state": state,
      "branch": branch,
      "title": title,
      "action": "register_employe"
    }

  } else {
    sendingData = {
      "employe_id": id,
      "frist_name": frist_name,
      "last_name": last_name,
      "phone": phone,
      "city": city,
      "state": state,
      "branch": branch,
      "title": title,
      "action": "update_employe"
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employe.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#employeform")[0].reset();
        loademploye();


      } else {
        employemessage("error", response);
      }

    },
    error: function (data) {
      employemessage("error", data.responseText);

    }

  })

})




function loademploye() {
  $("#employeTable tbody").html('');
  $("#employeTable thead").html('');

  let sendingData = {
    "action": "read_all_employe"
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employe.php",
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

            if(r=="salary"){
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
              <a class="dropdown-item  update_info" href="javascript:void(0);" update_id=${res['employe_id']}><i class="bx bx-edit-alt me-1"></i> Edit</a>
              <a class="dropdown-item delete_info" href="javascript:void(0);" delete_id=${res['employe_id']}><i class="bx bx-trash me-1"></i> Delete</a>
          </div>
      </div></td>`
          tr += "</tr>"

         

        })
        $("#employeTable thead").append(th);
        $("#employeTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}

function get_employe_info(employe_id) {

  let sendingData = {
    "action": "get_employe_info",
    "employe_id": employe_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employe.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        btnAction = "update";

        $("#update_id").val(response['employe_id']);
        $("#frist_name").val(response['frist_name']);
        $("#last_name").val(response['last_name']);
        $("#phone").val(response['phone']);
        $("#city").val(response['city']);
        $("#state").val(response['state']);
        $("#branch").val(response['branch_id']);
        $("#title").val(response['title_id']);
        $("#employemodal").modal('show');




      } else {
        employemessage("error", response);
      }

    },
    error: function (data) {

    }

  })
}


function Delete_employe(employe_id) {

  let sendingData = {
    "action": "Delete_employe",
    "employe_id": employe_id
  }

  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/employe.php",
    data: sendingData,

    success: function (data) {
      let status = data.status;
      let response = data.data;


      if (status) {

        swal("Good job!", response, "success");
        loademploye();


      } else {
        swal(response);
      }

    },
    error: function (data) {

    }

  })
}



$("#employeTable").on('click', "a.update_info", function () {
  let id = $(this).attr("update_id");
  get_employe_info(id)
})


$("#employeTable").on('click', "a.delete_info", function () {
  let id = $(this).attr("delete_id");
  if (confirm("Are you sure To Delete")) {
    Delete_employe(id)

  }

})