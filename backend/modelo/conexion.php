<?php
// Archivo de conexión sencillo a MySQL
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'tienda';

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die('Error de conexión: ' . $conn->connect_error);
}
?>
