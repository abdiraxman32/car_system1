<?php


header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_branch($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO branch(address, city, state)
     values('$address', '$city', '$state')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_branch($conn)
{
    $data = array();
    $array_data = array();
    $query = "select * from branch";
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

function get_branch_info($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT *FROM branch where branch_id= '$branch_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function update_branch($conn)
{
    extract($_POST);
    $data = array();
    $query = "UPDATE branch set address = '$address', city= '$city',  state = '$state' WHERE branch_id = '$branch_id'";
    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function Delete_branch($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "DELETE FROM branch where branch_id= '$branch_id'";
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
