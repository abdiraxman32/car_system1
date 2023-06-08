<?php
header("content-type: application/json");
include '../config/conn.php';
// $action = $_POST['action'];

function register_selling($conn)
{
    extract($_POST);
    $data = array();
    $query = "INSERT INTO sell(customer_id, car_id, quantity, price,balance)
     values('$customer_id', '$car_id', '$quantity', '$price','$balance')";

    $result = $conn->query($query);


    if ($result) {


        $data = array("status" => true, "data" => "successfully Registered 😂😊😒😎");
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}

function read_all_sell($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT s.sell_id,  concat(c.frist_name, ' ', c.last_name)  as customer_name, ca.car_name,s.quantity,s.price,s.balance,s.status from sell s JOIN customers c on s.customer_id=c.customer_id JOIN car ca on s.car_id=ca.car_id order by sell_id";
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

function read_all_sell_statement($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "CALL read_sell_statement('$tellphone')";
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

function read_car_price($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "CALL read_all_car_price('$car_id')";
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


function read_all_customer($conn)
{
    $data = array();
    $array_data = array();
    $query = "SELECT c.customer_id, concat(c.frist_name, ' ', c.last_name)  as customer_name  from customers c ";
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


function get_sell_info($conn)
{
    extract($_POST);
    $data = array();
    $array_data = array();
    $query = "SELECT *FROM sell where sell_id= '$sell_id'";
    $result = $conn->query($query);


    if ($result) {
        $row = $result->fetch_assoc();

        $data = array("status" => true, "data" => $row);
    } else {
        $data = array("status" => false, "data" => $conn->error);
    }

    echo json_encode($data);
}


function update_sell($conn)
{
    extract($_POST);
    $data = array();
    $query = "UPDATE sell set customer_id = '$customer_id', car_id= '$car_id',  quantity = '$quantity', price= '$price',balance= '$balance' WHERE sell_id = '$sell_id'";
    $result = $conn->query($query);


    if ($result) {

        $data = array("status" => true, "data" => "successfully updated 😂😊😒😎");
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
