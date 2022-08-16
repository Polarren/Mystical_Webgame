<?php
// Start the session
session_start();
?>
<?php
$response = "";
$q = $_REQUEST["q"];
$DOCUMENT_ROOT = $_SERVER['DOCUMENT_ROOT'];
$servername = "localhost";
$database = "user_log";
$username = "yuhangr2";
$password = "Xjua3584";

if ($q==="submit") {
    
    $_SESSION["started"] = "0";
    // Get current user id
    $version_r = fopen("$DOCUMENT_ROOT/Website2/data/version.txt", "r") or die("Unable to open file!2");
   // $version_r = fopen("./data/version.txt", "r") or die("Unable to open file!2");
    $version = intval(fread($version_r,2))+1;
    fclose($version_r);
    // write new user id
    $version_w = fopen("$DOCUMENT_ROOT/Website2/data/version.txt", "w") or die("Unable to open file!3");
    $txt = strval($version);
    fwrite($version_w, $txt);
    fclose($version_w);
    $response = "You have successfully submitted your answers to the current story!";

};

if ($q==="print_answer") {
    if (isset($_POST["questionNum"])){
        // $log = $_POST["log"];
        $question_num = $_POST["questionNum"];
        $answer_text = $_POST["answertext"];
        $userID = $_SESSION["user"];
        $answer_file= fopen("$DOCUMENT_ROOT/Website2/data/answers/answer_".$userID.".txt", "a") or die("Unable to open file!4");
        fwrite($answer_file, "Question ".$question_num.":\n");
        fwrite($answer_file, $answer_text."\n");
        fclose($answer_file);
        $response = "You have successfully printed your answers to the file!\n";
     }else{
         print_r($_POST);
        //  http_response_code(400);
        $response = "Error encountered\n";
     }

};

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


  
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    echo "Connected successfully\n";
    
    $sql = "INSERT INTO mouse (website, time, index_x, index_y,type,user_id) VALUES ('2','$time_elapsed', '$index_x', '$index_y','1','$userID')";
    if (mysqli_query($conn, $sql)) {
        echo "Mouse click logged into database\n";
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

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    echo "Connected successfully\n";
    
    $sql = "INSERT INTO mouse (website, time, index_x, index_y,type,user_id) VALUES ('2','$time_elapsed', '$index_x', '$index_y','0','$userID')";
    if (mysqli_query($conn, $sql)) {
        echo "Mouse move logged into database\n";
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

    $view_position = $_POST["view_position"];
    $view_position_percent = $_POST["view_position_percent"];

    $response = "You have successfully logged a scroll: ".$scroll_type." at ".$view_position_percent;

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    echo "Connected successfully\n";
    
    $sql = "INSERT INTO wheel (website, time,user_id, scroll_type, view_position, view_position_percent) VALUES ('2','$time_elapsed', '$userID','$up', '$view_position', '$view_position_percent')";
    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);

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

    $response = "You have successfully logged navigation: level ".$level.", path ".$navigation_path[0].$navigation_path[1].$navigation_path[2].$navigation_path[3];

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    echo "Connected successfully\n";
    
    $sql = "INSERT INTO navigation (website,time,user_id, level, start , level_0, level_1, level_2, level_3) VALUES ('3','$time_elapsed', '$userID', '$level','$navigation_path[0]','$navigation_path[1]','$navigation_path[2]','$navigation_path[3]','$navigation_path[4]')";
    if (mysqli_query($conn, $sql)) {
        echo "Navigation path logged into database\n";
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
    mysqli_close($conn);

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
        
    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    
    echo "Connected successfully\n";
    
    $sql = "INSERT INTO keyboard (website, time, content,action,user_id) VALUES ('2', '$time_elapsed', '$log', '0','$userID')";
    if (mysqli_query($conn, $sql)) {
        echo "Key down logged into database\n";
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

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $database);
    // Check connection
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    echo "Connected successfully\n";
    
    $sql = "INSERT INTO keyboard (website, time, content,action,user_id) VALUES ('2','$time_elapsed', '$log', '1','$userID')";
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

if ($q==="video") {
    // print_r("Request received.");
    // var_dump(file_get_contents('php://input'));
    print_r($_FILES);
    // echo "Error";
    // http_response_code(400);
    // $video = fopen("$DOCUMENT_ROOT/Website2/data/videos/video.webm", "wb") or die("Unable to open file!");
    $blob = $_FILES["file"];
    move_uploaded_file($_FILES["file"]["tmp_name"], "$DOCUMENT_ROOT/Website2/data/videos/video_user".$_SESSION['user'].".mp4");
    // fwrite($video, $blob);
    // fclose($video);
    $response = "You have successfully saved your video to the current directory!";

};

echo $response;
?>