<?php

header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function get_total_income($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT  sum(balance) as total from account";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function get_total_expense($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT  sum(Amount) as total from charge";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function get_total_employe($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "select count(employe_id) as employee from employe";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}



function get_total_customers($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "select count(customer_id) as customers from customers";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
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
