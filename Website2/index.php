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
    
	
     <style>
        .float {
            float: right;
            position: absolute;
            bottom: 0;
            right: 0;
            height: 300px;
            width: 650px;
            display: flex;
            align-items: flex-end;
            shape-outside: inset(calc(100% - 100px) 0 0);
            }
    </style> 

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
                                <li><a class="active" href="index.php" onclick="log_navigation(0)" >Introduction</a></li>
                                <li><a href="rooms.html" onclick="log_navigation(0)">Rooms</a></li>
                                <li><a href="characters.html" onclick="log_navigation(0)" >characters</a></li>
                                <li><a href="answer.html" onclick="log_navigation(0)" >Answer</a></li>
                                <!-- <textarea id="q15text_answer" name="question_15_textarea" rows="3" cols="5" oninput="save_answer(this)" onclick="log_navigation(3);">ddd</textarea> -->

                            </ul>
                            <div id = "status" style = "text-align:right">
                                    <!-- <span id = "status" style="margin-left:30px"  ></span> -->
                            </div>
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
                            <p> Assume you are detective provided with video recordings of an event taking place at the art gallery.    </p>
                            
                            <p> In this website we have recordings from each room and person. </p>
                            <p> Please find the answer to the questions in the Answer page.</p>
                            <p> Before you start, please adjust the camera to include your face in the window.</p>
                            <p> Current user id:
                                <?php
                                $myfile = fopen("./data/version.txt", "r") or die("Unable to open file!1");
                                $user_id = fread($myfile,filesize("./data/version.txt"));
                                echo $user_id;
                                //file_put_contents($myfile,intval($user_id)+1);
                                fclose($myfile);
                                
                                ?>
                            </p>
                            
                            <p> To start logging, please click on "Start".</p>
                        </article>
                        <a id = "startbutton" class="button" href="#" onclick="start_logging('<?php echo $user_id ?>');style.display = 'none';resetStartTime()" >
                            Start
                        </a>
                        <script> continue_logging();</script>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <div  class=float>
        <video autoplay="true" id="videoElement"></video>
    </div>

    <!-- !the code script below could be included in .js files -->
    <script>

        var video = document.querySelector("#videoElement");

        if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
            video.srcObject = stream;
            })
            .catch(function (err0r) {
            console.log("Something went wrong!");
            });
        }


    </script>

    
	<!-- ==============================footer================================= -->
    
</body>
</html>
