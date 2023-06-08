btnAction = "Insert";
loadsuplier();

$("#suplierForm").on("submit", function (event) {

  event.preventDefault();


  let company_name = $("#company_name").val();
  let country = $("#country").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "company_name": company_name,
      "country": country,
      "action": "register_suplier"
    }

  } else {
    sendingData = {
      "title_id": id,
      "company_name": company_name,
      "country": country,
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/supliers.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#suplierForm")[0].reset();
        loadsuplier();


      } else {
        employemessage("error", response);
      }

    },
    error: function (data) {
      employemessage("error", data.responseText);

    }

  })

})

function loadsuplier() {
  $("#suplierTable tbody").html('');
  $("#suplierTable thead").html('');

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
        $("#suplierTable thead").append(th);
        $("#suplierTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}