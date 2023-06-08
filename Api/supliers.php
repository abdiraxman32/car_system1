<?php
header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_suplier($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO suplier(company_name, country)
     values('$company_name', '$country')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_supliers($conn)
{
    $data = array();
    $array_data = array();
    $query = "select * from suplier";
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

if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $action($conn);
} else {
    echo json_encode(array("status" => false, "data" => "Action Required....."));
}
