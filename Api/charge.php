<?php
header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_charge($conn)
{
    extract($_POST);
    $data = array();
    $query = "CALL charge_month('$month', '$year', '$description', '$Acount_id', '$user_idd')";

    $result = $conn->query($query);


    if ($result) {

        $row = $result->fetch_assoc();
        if ($row['msg'] == 'Deny') {
            $data = array("status" => false, "data" => "Insuficance Balance😜");
        } elseif ($row['msg'] == 'Registered') {
            $data = array("status" => true, "data" => "transaction successfully ✅");
        } elseif ($row['msg'] == 'NOt') {
            $data = array("status" => false, "data" => "Horay Ayaa loogu dalacay lacagta bishaan '$month'❌");
        }
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_charge($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT ch.charge_id as ID, concat(e.frist_name, ' ', e.last_name) as Employe,j.position,ch.Amount as salary,m.month_name as month,ch.year,ac.bank_name,ch.description,u.username,ch.date FROM charge ch JOIN employe e on ch.employe_id=e.employe_id JOIN job_title j on ch.title_id=j.title_id JOIN month m on ch.month=m.month_id JOIN account ac on ch.Account_id=ac.Account_id JOIN users u on ch.user_id=u.user_id order by ID";
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


function read_all_monthes($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT * from month";
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
