<?php

$conn = new mysqli("localhost", "root", "", "car_selling");

if($conn->connect_error){
    echo $conn->error;
}