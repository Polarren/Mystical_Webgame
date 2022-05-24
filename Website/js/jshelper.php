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
    $version_r = fopen("$DOCUMENT_ROOT/data/version.txt", "r") or die("Unable to open file!");
    $version = intval(fread($version_r,2))+1;
    fclose($version_r);
    // write new user id
    $version_w = fopen("$DOCUMENT_ROOT/data/version.txt", "w") or die("Unable to open file!");
    $txt = strval($version);
    fwrite($version_w, $txt);
    fclose($version_w);
    $response = "You have successfully submitted your answers to the current story!";
}
if ($q==="mouse_click") {
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
    $log = ''.$time_elapsed.' '.$log;

    $mouse_click = fopen("$DOCUMENT_ROOT/data/mouse_click/$userID.txt", "a") or die("Unable to open file!");
    fwrite($mouse_click, $log);
    fclose($mouse_click);
    $response = "You have successfully logged mouse clicks: ".$log;
}
if ($q === "start") {
    $_SESSION["started"] = "1";
    $_SESSION["user"] = $_POST["user"];
    $milliseconds = floor(microtime(true) * 1000);
    $_SESSION["start_time"]  = $milliseconds;
    $response = "Session is started; Current user: ".$_SESSION['user'];
}

if ($q === "started") {

    $response =$_SESSION["started"];
}

echo $response;
?>