btnAction = "Insert";
loadejob();

$("#jobForm").on("submit", function (event) {

  event.preventDefault();


  let position = $("#position").val();
  let salary = $("#salary").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "position": position,
      "salary": salary,
      "action": "register_job_title"
    }

  } else {
    sendingData = {
      "title_id": id,
      "position": position,
      "salary": salary,
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/job_title.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#jobForm")[0].reset();
        loadejob();


      } else {
        employemessage("error", response);
      }

    },
    error: function (data) {
      employemessage("error", data.responseText);

    }

  })

})




function loadejob() {
  $("#jobTable tbody").html('');
  $("#jobTable thead").html('');

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
      let th = '';

      if (status) {
        response.forEach(res => {
          th = "<tr>";
          for (let r in res) {
            th += `<th>${r}</th>`;
          }

        //   th += "<td>Action</td></tr>";




          tr += "<tr>";
          for (let r in res) {


            tr += `<td>${res[r]}</td>`;


          }
        //   tr += `<td> <a class="btn btn-info update_info"  update_id=${res['title_id']}><i class="mdi mdi-grease-pencil" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['title_id']}><i class="mdi mdi-close-box
        //   " style="color: #fff"></i></a> </td>`
          tr += "</tr>"

        })
        $("#jobTable thead").append(th);
        $("#jobTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}