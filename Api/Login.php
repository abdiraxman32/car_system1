<?php
session_start();
header("content-type: application/json");
include '../config/conn.php';
function login($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "call login_procedure('$username','$password')";
    $result = $conn->query($query);


    if ($result) {

        $row = $result->fetch_assoc();

        if (isset($row['msg'])) {
            if ($row['msg'] == "Deny") {
                $data = array("status" => false, "data" => "username or password is incorrect");
            } else {
                $data = array("status" => false, "data" => "username or password is incorrect");
            }
        } else {
            foreach ($row as $key => $values) {
                $_SESSION[$key] = $values;
            }
            $data = array("status" => true, "data" => "success");
        }
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
