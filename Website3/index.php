<?php
// Start the session
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <title></title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="css/reset.css" type="text/css" media="screen">
    <link rel="stylesheet" href="css/style.css" type="text/css" media="screen">
    <link rel="stylesheet" href="css/grid.css" type="text/css" media="screen"> 
    <script src="js/jquery-1.6.2.min.js" type="text/javascript"></script>
    <script src="js/jquery.galleriffic.js" type="text/javascript"></script>
    <script src="js/jquery.opacityrollover.js" type="text/javascript"></script>  
    <script src="js/load.js" type="text/javascript"></script>  

	<!--[if lt IE 7]>
        <div style=' clear: both; text-align:center; position: relative;'>
            <a href="http://www.microsoft.com/windows/internet-explorer/default.aspx?ocid=ie6_countdown_bannercode"><img src="http://storage.ie6countdown.com/assets/100/images/banners/warning_bar_0000_us.jpg" border="0"  alt="" /></a>
        </div>
	<![endif]-->
    <!--[if lt IE 9]>
   		<script type="text/javascript" src="js/html5.js"></script>
        <link rel="stylesheet" href="css/ie.css" type="text/css" media="screen">
	<![endif]-->
</head>
<body id="page1">
	<!--==============================header=================================-->
    <header>
    	<div class="row-1">
        	<div class="main">
            	<div class="container_12">
                	<div class="grid_12">
                    	<nav>
                            <ul class="menu">
                                <li><a class="active" href="index.php" onclick="log_navigation(0,[0,0,-1,-1,-1])" >Introduction</a></li>
                                <li><a href="rooms.html" onclick="log_navigation(0,[0,1,-1,-1,-1])">Rooms</a></li>
                                <li><a href="characters.html" onclick="log_navigation(0,[0,2,-1,-1,-1])" >characters</a></li>
                                <li><a href="answer.html" onclick="log_navigation(0,[0,3,-1,-1,-1])" >Answer</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div class="clear"></div>
            </div>
        </div>
         	
    </header>
    
<!-- content -->
    <section id="content">
        <div class="bg-bot">
        	<div class="main">
                <div class="container_8">
                    <div class="wrapper">
                        <article class="grid_8">
                            <h3 class="p2">Before we start</h3>
                            <p> Everything in this website is fictional.</p>
                            <p> Assume you are detective provided with a recording of an event taking place at the police station. </p>
                            
                            <p> In this website we have recordings from each room and person. </p>
                            <p> Please find the answer to the questions in the Answer page.</p>
                            <p> Current user id:
                                <?php
                                $myfile = fopen("./data/version.txt", "r") or die("Unable to open file!1");
                                $user_id = fread($myfile,filesize("./data/version.txt"));
                                echo $user_id;
                                //file_put_contents($myfile,intval($user_id)+1);
                                // fclose($myfile);
                                // $version_w = fopen("./data/version.txt", "r+") or die("Unable to open file!3");
                                // $txt = strval(intval($user_id)+1);
                                // fwrite($version_w, $txt);
                                // fclose($version_w);
                                ?>
                            </p>
                            
                            <p> To start logging, please click on "Start".</p>
                        </article>
                        <a class="button" href="#" onclick="start_logging('<?php echo $user_id ?>');style.display = 'none'" >
                            Start
                        </a>

                    </div>
                </div>

            </div>
        </div>
    </section>

	<!--==============================footer=================================-->
    
</body>
</html>
