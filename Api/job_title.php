<?php
header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_job_title($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO job_title(position, salary)
     values('$position', '$salary')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_job_title($conn)
{
    $data = array();
    $array_data = array();
    $query = "select * from job_title";
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
