<?php
session_start();
unset($_SESSION['username']);
unset($_SESSION['image']);
unset($_SESSION['date']);
    header('Location:login.php');
?>