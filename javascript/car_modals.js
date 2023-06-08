btnAction = "Insert";
loade_car_modals();



$("#carmodalForm").on("submit", function (event) {

  event.preventDefault();


  let modal = $("#modal").val();
  let id = $("#update_id").val();

  let sendingData = {}

  if (btnAction == "Insert") {
    sendingData = {
      "modal": modal,
      "action": "register_car_modals"
    }

  } else {
    sendingData = {
      "car_modal_id": id,
      "modal": modal,
    }
  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/car_modals.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      if (status) {
        swal("Good job!", response, "success");
        btnAction = "Insert";
        $("#carmodalForm")[0].reset();
        loade_car_modals();


      } else {
        employemessage("error", response);
      }

    },
    error: function (data) {
      employemessage("error", data.responseText);

    }

  })

})

function loade_car_modals() {
  $("#carmodalTable tbody").html('');
  $("#carmodalTable thead").html('');

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
        //   tr += `<td> <a class="btn btn-info update_info"  update_id=${res['employe_id']}><i class="mdi mdi-grease-pencil" style="color: #fff"></i></a>&nbsp;&nbsp <a class="btn btn-danger delete_info" delete_id=${res['employe_id']}><i class="mdi mdi-close-box
        //   " style="color: #fff"></i></a> </td>`
          tr += "</tr>"

        })
        $("#carmodalTable thead").append(th);
        $("#carmodalTable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}
