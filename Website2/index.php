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

	
    <!-- <style media="screen">
            *,
        *:before,
        *:after{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        body{
            background-color: #0855ae;
        }
        .popup{
            background-color: #ffffff;
            width: 420px;
            padding: 30px 40px;
            position: absolute;
            transform: translate(-50%,-50%);
            left: 50%;
            top: 50%;
            border-radius: 8px;
            font-family: "Poppins",sans-serif;
            display: none; 
            text-align: center;
        }
        .popup button_popup{
            display: block;
            margin:  0 0 20px auto;
            background-color: transparent;
            font-size: 30px;
            color: #ffffff;
            background: #03549a;
            border-radius: 100%;
            width: 40px;
            height: 40px;
            border: none;
            outline: none;
            cursor: pointer;
        }
        .popup h2{
        margin-top: -20px;
        }
        .popup p{
            font-size: 14px;
            text-align: justify;
            margin: 20px 0;
            line-height: 25px;
        }
        a{
            display: block;
            width: 150px;
            position: relative;
            margin: 10px auto;
            text-align: center;
            background-color: #0f72e5;
            border-radius: 20px;
            color: #ffffff;
            text-decoration: none;
            padding: 8px 0;
        }
    </style> -->
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
                            <p> Assume you are detective provided with a recording of an event taking place at the art gallery. </p>
                            
                            <p> In this website we have recordings from each room and person. </p>
                            <p> Please find the answer to the questions in the Answer page.</p>
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

    <!-- <button onclick="resetStartTime()">Start</button> -->
    

    <!-- <div class="popup">
        <button_popup id="close">&times;</button_popup>
        <h2>Automatic Pop-Up</h2>
        <p>
           It's 30 minutes! submit or continue on this story.
        </p>
        <a href="#">Let's Go</a>
        
        <div class="buttons">                                        
            <a class="button" href="#" onClick="submit()">Submit</a>
        </div>    
    </div>

    <script type="text/javascript">
        function open(){
            document.querySelector(".popup").style.display = "block";
        }

        document.querySelector("#close").addEventListener("click", function(){
            document.querySelector(".popup").style.display = "none";
        })            
    </script>  -->
	<!-- ==============================footer================================= -->
    
</body>
</html>
