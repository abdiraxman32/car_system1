<?php
header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];


function register_payment($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO payment(customer_id, amount,amount_paid,balance, Account_id, p_method_id)
     values('$customer_idd', '$amount','$amount_paid', '$balance', '$Accountt_id', '$p_method_id')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_amount($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "CALL read_amount('$customer_id')";
    $result = $conn->query($query);


    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

// function read_amount_paid($conn){
//     extract($_POST);
//     $data = array();
//     $array_data = array();
//    $query ="CALL payment_amount('$amount_paid')";
//     $result = $conn->query($query);


//     if($result){
//         while($row = $result->fetch_assoc()){
//             $array_data[] = $row;
//         }
//         $data = array("status" => true, "data" => $array_data);


//     }else{
//         $data = array("status" => false, "data"=> $conn->error);

//     }

//     echo json_encode($data);
// }



function read_customer_selling($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT c.customer_id,concat(c.frist_name, ' ', c.last_name)  as customer_name from customers c WHERE customer_id in (SELECT customer_id from sell)";
    $result = $conn->query($query);


    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function get_payment_info($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT * FROM payment where payment_id= '$payment_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_payment_statement($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "CALL payment_statement('$tellphone')";
    $result = $conn->query($query);


    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_payment($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT p.payment_id,concat(c.frist_name, ' ', c.last_name) as customer_name,p.amount as Total_amount,p.amount_paid,p.balance,a.bank_name,pm.name as payment_method,p.date from payment p JOIN customers c on p.customer_id=c.customer_id JOIN account a on p.Account_id=a.Account_id JOIN payment_method pm on p.p_method_id=pm.p_method_id";
    $result = $conn->query($query);


    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_top_payments($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT concat(c.frist_name, ' ', c.last_name) as customer, p.amount_paid as Amount
    FROM payment p JOIN customers c on p.customer_id=c.customer_id JOIN account ac on p.Account_id=ac.Account_id JOIN payment_method pm on p.p_method_id=pm.p_method_id
    ORDER BY amount_paid DESC
    LIMIT 5";
    $result = $conn->query($query);


    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function read_all_pending($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT concat(c.frist_name, ' ', c.last_name)  as customer_name, ca.car_name,s.quantity,s.price,s.status from sell s JOIN customers c on s.customer_id=c.customer_id JOIN car ca on s.car_id=ca.car_id where s.status='pending'";
    $result = $conn->query($query);


    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $array_data[] = $row;
        }
        $data = array("status" => true, "data" => $array_data);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

// function update_payment($conn)
// {
//     extract($_POST);

//     $data = array();

//     $query = "UPDATE payment set customer_id = '$customer_idd', amount = '$amount', Account_id = '$Account_id', p_method_id = '$p_method_id' WHERE payment_id= '$payment_id'";

//     $result = $conn->query($query);


//     if ($result) {

//         $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");
//     } else {
//         $data = array("status" => false, "data" => $conn->error);
//     }

//     echo json_encode($data);
// }


// function Delete_payment($conn){
//     extract($_POST);
//     $data = array();
//     $array_data = array();
//    $query ="DELETE FROM payment where payment_id= '$payment_id'";
//     $result = $conn->query($query);


//     if($result){


//         $data = array("status" => true, "data" => "successfully Deleted😎");


//     }else{
//         $data = array("status" => false, "data"=> $conn->error);

//     }

//     echo json_encode($data);
// }

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo json_encode(array("status" => false, "data" => "Action Required....."));
}
