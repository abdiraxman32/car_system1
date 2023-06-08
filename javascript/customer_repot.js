$("#from").attr("disabled", true);
$("#to").attr("disabled", true);


$("#type").on("change", function () {
  if ($("#type").val() == 0) {
    $("#from").attr("disabled", true);
    $("#to").attr("disabled", true);

  } else {
    $("#from").attr("disabled", false);
    $("#to").attr("disabled", false);
  }
})




$("#printt_statement").on("click", function () {
  printSttatement();

})

function printSttatement() {
  let printarea = document.querySelector("#printt_Area");

  console.log("click");
  let newwindow = window.open("");
  newwindow.document.write(`<html><head><title></title>`);
  newwindow.document.write(`<style media="print">
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
  body{
      font-family: 'Poppins', sans-serif;
  }

  table{
    width:100%;
}

  th{
      background-color : #40E0D0 !important;
      color: white !important;
     
  }
    
  th , td{
      padding:10px !important;
      text-align: left !important;

  }

  th , td{
      
      border-bottom : 1px solid #ddd !important;
  }
  
  
  </style>`);
  newwindow.document.write(`</head><body>`);
  newwindow.document.write(printarea.innerHTML);
  newwindow.document.write(`</body></html>`);
  newwindow.print();
  newwindow.close();


}



$("#exportt_statement").on("click", function () {
  let file = new Blob([$('#printt_Area').html()], { type: "application/vnd.ms-excel" });
  let url = URL.createObjectURL(file);
  let a = $("<a />", {
    href: url,
    download: "print_statement.xls"
  }).appendTo("body").get(0).click();
  e.preventDefault();

});



$("#customerform").on("submit", function (event) {

  event.preventDefault();
  $("#customertable tr").html("");


  let from = $("#from").val();
  let to = $("#to").val();


  let sendingData = {

    "from": from,
    "to": to,
    "action": "read_all_customer_statement",

  }



  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/customer.php",
    data: sendingData,
    success: function (data) {
      let status = data.status;
      let response = data.data;

      let tr = '';
      let th = '';

      if (status) {
        response.forEach(res => {

          th = "<tr>";
          for (let r in res) {
            th += `<th>${r}</th>`;
          }

          th += "</tr>";


          tr += "<tr>";
          for (let r in res) {

            if (r == "status") {
              if (res[r] == "booking") {
                tr += `<td><span class="badge bg-success">${res[r]}</span></td>`;
              } else {
                tr += `<td><span class="badge bg-danger">${res[r]}</span></td>`;
              }
            } else {
              tr += `<td>${res[r]}</td>`;
            }

          }

          tr += "</tr>"

        })

        $("#customertable thead").append(th);
        $("#customertable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })

})



function loadData() {
  $("#customertable tbody").html('');

  let sendingData = {
    "action": "get_customer_info"
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

      if (status) {
        response.forEach(res => {

          th = "<tr>";
          for (let r in res) {
            th += `<th>${r}</th>`;
          }

          th += "</tr>";


          tr += "<tr>";
          for (let r in res) {

            if (r == "status") {
              if (res[r] == "booking") {
                tr += `<td><span class="badge badge-success">${res[r]}</span></td>`;
              } else {
                tr += `<td><span class="badge badge-danger">${res[r]}</span></td>`;
              }
            } else {
              tr += `<td>${res[r]}</td>`;
            }

          }

          tr += "</tr>"

        })

        $("#customertable thead").append(th);
        $("#customertable tbody").append(tr);
      }

    },
    error: function (data) {

    }

  })
}



