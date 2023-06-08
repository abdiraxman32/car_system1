<?php


header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_customer($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO customers(frist_name, last_name, phone, address, city, state)
     values('$frist_name', '$last_name', '$phone', '$address', '$city', '$state')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_customer($conn)
{
    $data = array();
    $array_data = array();
    $query = "select * from customers";
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



function read_all_customer_statement($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "CALL read_customer_statement('$from', '$to')";
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


function get_customer_info($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT *FROM customers where customer_id= '$customer_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function update_customer($conn)
{
    extract($_POST);
    $data = array();
    $query = "UPDATE customers set frist_name = '$frist_name', last_name= '$last_name',  phone = '$phone', address= '$address', city= '$city', state= '$state' WHERE customer_id = '$customer_id'";
    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function Delete_customer($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM customers where customer_id= '$customer_id'";
    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Deleted😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo json_encode(array("status" => false, "data" => "Action Required....."));
}
