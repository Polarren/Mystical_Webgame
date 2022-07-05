<?php
// Start the session
session_start();
?>
<?php
$response = "";
$q = $_REQUEST["q"];
$DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];

if ($q==="submit") {
    
    $_SESSION["started"] = "0";
    // Get current user id
    $version_r = fopen("$DOCUMENT_ROOT/data/version.txt", "r") or die("Unable to open file!2");
   // $version_r = fopen("./data/version.txt", "r") or die("Unable to open file!2");
    $version = intval(fread($version_r,2))+1;
    fclose($version_r);
    // write new user id
    $version_w = fopen("$DOCUMENT_ROOT/data/version.txt", "w") or die("Unable to open file!3");
    $txt = strval($version);
    fwrite($version_w, $txt);
    fclose($version_w);
    $response = "You have successfully submitted your answers to the current story!";

}
if ($q==="mouse_click") {
    if (isset($_POST["index_x"])){
       // $log = $_POST["log"];
        $index_x = $_POST["index_x"];
        $index_y = $_POST["index_y"];
        $userID = $_SESSION["user"];
    }else{
        print_r($_POST);
        echo "Error";
        http_response_code(400);
    }
    $current_time = floor(microtime(true) * 1000);
    $time_elapsed = $current_time-$_SESSION["start_time"];
    // $log = ''.$time_elapsed.' '.$log;

    // $mouse_click = fopen("$DOCUMENT_ROOT/data/mouse_click/$userID.txt", "a") or die("Unable to open file!4");
    // $mouse_click = fopen("data/mouse_click/$userID.txt", "a") or die("Unable to open file!4");

    // fwrite($mouse_click, $log);
    // fclose($mouse_click);
    $response = "You have successfully logged mouse clicks: ".$index_x.' '.$index_y;


    $servername = "localhost";
    $database = "database_2";
    $username = "changliu";
    $password = "test123";
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    echo "Connected successfully\n";
    
    $sql = "INSERT INTO mouse (time, index_x, index_y,type,user_id) VALUES ('$time_elapsed', '$index_x', '$index_y','1','$userID')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);

}



if ($q==="mouse_move") {
    if (isset($_POST["index_x"])){
       // $log = $_POST["log"];
        $index_x = $_POST["index_x"];
        $index_y = $_POST["index_y"];
        $userID = $_SESSION["user"];
    }else{
        print_r($_POST);
        echo "Error3333";
        http_response_code(400);
    }
    // echo "what the fuck\n";
    $current_time = floor(microtime(true) * 1000);
    $time_elapsed = $current_time-$_SESSION["start_time"];
//    $log = ''.$time_elapsed.' '.$log;

    // $mouse_move = fopen("$DOCUMENT_ROOT/data/mouse_move/$userID.txt", "a") or die("Unable to open file!5");
//     fwrite($mouse_move, $log);
//     fclose($mouse_move);
    // $mouse_move = "1";
    $response = "You have successfully logged mouse moves: ".$index_x.' '.$index_y;

    $servername = "localhost";
    $database = "database_2";
    $username = "changliu";
    $password = "test123";
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    echo "Connected successfully\n";
    
    $sql = "INSERT INTO mouse (time, index_x, index_y,type,user_id) VALUES ('$time_elapsed', '$index_x', '$index_y','0','$userID')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}



if ($q==="wheel") {
    if (isset($_POST["up"])){
        $up = $_POST["up"];
        $userID = $_SESSION["user"];
    }else{
        print_r($_POST);
        echo "Error";
        http_response_code(400);
    }
    $current_time = floor(microtime(true) * 1000);
    $time_elapsed = $current_time-$_SESSION["start_time"];
    $scroll_type = 'up';
    if ($up=="0"){
        $scroll_type = 'down';
    }
    $response = "You have successfully logged a scroll: ".$scroll_type;


    // $servername = "localhost";
    // $database = "database_2";
    // $username = "changliu";
    // $password = "test123";
    // // Create connection
    // $conn = mysqli_connect($servername, $username, $password, $database);
    // // Check connection
    // if (!$conn) {
    //     die("Connection failed: " . mysqli_connect_error());
    // }
    
    // echo "Connected successfully\n";
    
    // $sql = "INSERT INTO wheel (time, scroll_type,type) VALUES ('$time_elapsed', '$up','1')";
    // if (mysqli_query($conn, $sql)) {
    //     echo "New record created successfully";
    // } else {
    //     echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    // }
    // mysqli_close($conn);

}

if ($q==="navigate") {
    if (isset($_POST["level"])){
        $level = $_POST["level"];
        $navigation_path=$_POST["path"];
        $userID = $_SESSION["user"];
    }else{
        print_r($_POST);
        echo "Error";
        http_response_code(400);
    }
    $current_time = floor(microtime(true) * 1000);
    $time_elapsed = $current_time-$_SESSION["start_time"];

    $response = "You have successfully logged navigation: level ".$level.", path ".$navigation_path;


    // $servername = "localhost";
    // $database = "database_2";
    // $username = "changliu";
    // $password = "test123";
    // // Create connection
    // $conn = mysqli_connect($servername, $username, $password, $database);
    // // Check connection
    // if (!$conn) {
    //     die("Connection failed: " . mysqli_connect_error());
    // }
    
    // echo "Connected successfully\n";
    
    // $sql = "INSERT INTO wheel (time, scroll_type,type) VALUES ('$time_elapsed', '$scroll_type','1')";
    // if (mysqli_query($conn, $sql)) {
    //     echo "New record created successfully";
    // } else {
    //     echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    // }
    // mysqli_close($conn);

}


if ($q==="keydown") {
    if (isset($_POST["log"])){
        $log = $_POST["log"];
        $userID = $_SESSION["user"];
    }else{
        print_r($_POST);
        echo "Error";
        http_response_code(400);
    }
    echo"keydown received";
    $current_time = floor(microtime(true) * 1000);
    $time_elapsed = $current_time-$_SESSION["start_time"];
    // $log = ''.$time_elapsed.' '.$log;

    // $mouse_move = fopen("$DOCUMENT_ROOT/data/keyboard/$userID.txt", "a") or die("Unable to open file!6");
    // fwrite($mouse_move, $log);
    // fclose($mouse_move);
    $response = "You pressed a key: ".$log;
        
    $servername = "localhost";
    $database = "database_2";
    $username = "changliu";
    $password = "test123";
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    echo "Connected successfully\n";
    
    $sql = "INSERT INTO keyboard (time, content,action,user_id) VALUES ('$time_elapsed', '$log', '0','$userID')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}
if ($q==="keyup") {
    if (isset($_POST["log"])){
        $log = $_POST["log"];
        $userID = $_SESSION["user"];
    }else{
        print_r($_POST);
        echo "Error";
        http_response_code(400);
    }
    $current_time = floor(microtime(true) * 1000);
    $time_elapsed = $current_time-$_SESSION["start_time"];
    // $log = ''.$time_elapsed.' '.$log;

    // $mouse_move = fopen("$DOCUMENT_ROOT/data/keyboard/$userID.txt", "a") or die("Unable to open file!7");
    // fwrite($mouse_move, $log);
    // fclose($mouse_move);
    $response = "You released a key: ".$log;

    $servername = "localhost";
    $database = "database_2";
    $username = "changliu";
    $password = "test123";
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    echo "Connected successfully\n";
    
    $sql = "INSERT INTO keyboard(time, content,action,user_id) VALUES ('$time_elapsed', '$log', '1','$userID')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);
}

if ($q === "start") {
    $_SESSION["started"] = "1";
    $_SESSION["user"] = $_POST["user"];
    $milliseconds = floor(microtime(true) * 1000);
    $_SESSION["start_time"]  = $milliseconds;
    $response = "Session is started; Current user: ".$_SESSION['user'];
}

if ($q === "started") {
    if (isset($_SESSION["started"])){
        $response =$_SESSION["started"];
    } else {
        $response =0;
    }
}

echo $response;
?>