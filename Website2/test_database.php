<?php
$servername = "localhost";
$database = "user_log";
$username = "yuhangr2";
$password = "Xjua3584";
// Create connection
$conn = mysqli_connect($servername, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
mysqli_close($conn);
?>