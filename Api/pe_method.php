<?php

header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];



function register_p_method($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO payment_method(name)
     values('$Method')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_p_method($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT * from payment_method";
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

function get_p_method($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT *FROM payment_method where p_method_id= '$p_method_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function update_p_method($conn)
{
    extract($_POST);

    $data = array();

    $query = "UPDATE payment_method set name = '$Method' WHERE p_method_id = '$p_method_id'";


    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function Delete_p_method($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM payment_method where p_method_id= '$p_method_id'";
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
