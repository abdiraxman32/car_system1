$("#tellphone").attr("disabled", true);

$("#type").on("change", function(){
    if($("#type").val()== 0){
    $("#tellphone").attr("disabled", true);

    }else{
        $("#tellphone").attr("disabled", false);
    }
})

$("#printtstatement").on("click", function(){
    printStatement();
    
})

function printStatement(){
    let printarea= document.querySelector("#prinT_Area");
  
    
    let newwindow= window.open("");
    newwindow.document.write(`<html><head><title></title>`);
    newwindow.document.write(`<style media="print">
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
    body{
        font-family: 'Poppins', sans-serif;
    }

    table{
      width:60%;
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


$("#exporttstatement").on("click", function(){
    let file= new Blob([$('#prinT_Area').html()], {type:"application/vnd.ms-excel"});
    let url= URL.createObjectURL(file);
    let a= $("<a />", {
        href: url,
        download: "print_statement.xls"}).appendTo("body").get(0).click();
        e.preventDefault();

});



$("#Paymentform").on("submit", function(event){
    
    event.preventDefault();
    $("#Paymentable tr").html("");


    let tellphone= $("#tellphone").val();
    
 
  
    let sendingData = {
       
         "tellphone" : tellphone,
         
        "action": "read_all_payment_statement",
       
    }
    


  $.ajax({
    method: "POST",
    dataType: "JSON",
    url: "Api/payment.php",
    data : sendingData,
    success: function(data){
        let status= data.status;
        let response= data.data;
   
        let tr= '';
        let th= '';

        if(status){
            response.forEach(res=>{

                th = "<tr>";
                for(let r in res){
                th += `<th>${r}</th>`;
               }

               th += "</tr>";


                tr += "<tr>";
                for(let r in res){

                    if(r=="price"){
                        tr += `<td>$${res[r]}</td>`;
          
                      }else if(r=="amount_paid"){
                        tr += `<td>$${res[r]}</td>`;
                
               }else if(r=="balance"){
                tr += `<td>$${res[r]}</td>`;
        
       }
               else{
                tr += `<td>${res[r]}</td>`;
               }

                }

                tr+= "</tr>"
              
            })

            $("#Paymentable thead").append(th);
            $("#Paymentable tbody").append(tr);
        }

    },
    error: function(data){

    }

  })

})







