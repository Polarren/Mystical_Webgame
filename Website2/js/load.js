

function mouseclick(){
    
    // var log = ''+ event.clientX +' '+ event.clientY+'\n';
    var index_x = event.clientX;
    var index_y = event.clientY;
    // console.log(log);
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      return;
    }
    xmlhttp.open('POST', "js/jshelper.php?q=" + "mouse_click", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.onload = function () {
        // do something to response
       console.log(this.responseText);
    };
    
    xmlhttp.send('&index_x='+index_x+'&index_y='+index_y);
    // xmlhttp.send("index_x="+index_x);
    // xmlhttp.send("index_y="+index_y);

}


function mousemove(){
    
//  var log = ''+ event.clientX +' '+ event.clientY+'\n';
  var index_x = event.clientX;
  var index_y = event.clientY;
  // console.log(log);

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    return;
  }
  xmlhttp.open('POST', "js/jshelper.php?q=" + "mouse_move", true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.onload = function () {
      // do something to response

     console.log(this.responseText);
  };
  
  // xmlhttp.send("log="+log);
  xmlhttp.send('&index_x='+index_x+'&index_y='+index_y);
  // xmlhttp.send("index_x="+index_x);
  // xmlhttp.send("index_y="+index_y);

}

function keydown(){
    
  var log = event.key;
  // console.log(log);
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    return;
  }
  xmlhttp.open('POST', "js/jshelper.php?q=" + "keydown", true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.onload = function () {
      // do something to response
      console.log(this.responseText);
  };
  xmlhttp.send("log="+log);

}

function keyup(){
    
  var log = event.key ;
  // console.log(log);
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    return;
  }
  xmlhttp.open('POST', "js/jshelper.php?q=" + "keyup", true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.onload = function () {
      // do something to response
      console.log(this.responseText);
  };
  xmlhttp.send("log="+log);

}


window.onscroll = function(){
  // var view_position = document.documentElement.scrollTop ;
  var view_position = document.documentElement.scrollTop/document.body.scrollHeight;
  console.log("Scroll event at postion: "+view_position);

  // const xmlhttp = new XMLHttpRequest();
  // xmlhttp.open('POST', "js/jshelper.php?q=" + "onscroll", true);
  // xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  // xmlhttp.onload = function () {
  //     // do something to response
  //     console.log(this.responseText);
  // // };
  // xmlhttp.send("view_position="+view_position);
};

function scroll(event){
  // console.log("Scroll event detected");
  var up=0;
  var event = event || window.event;
  if(event.wheelDelta) {   
        if(event.wheelDelta > 0) {     //scroll up
          up = 1;
        }
        if(event.wheelDelta < 0) {     //scroll down
          up = 0;
        }
  } else if(event.detail) {
        if(event.detail < 0) {    //scroll up
          up = 1;
        }
        if(event.detail > 0) {   //scroll down
          up = 0;
        }
  }
  // read_video_position();
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', "js/jshelper.php?q=" + "wheel", true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.onload = function () {
      // do something to response
      console.log(this.responseText);
  };
  xmlhttp.send("up="+up);
}

var started = 0;
function start_logging(user_id){
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        console.log(this.responseText);
    }
    xmlhttp.open("POST", "js/jshelper.php?q=" + "start", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.send("user="+user_id);
    console.log("Starting session: " + user_id);
    window.addEventListener('mousemove', function(){mousemove()});
    window.addEventListener('click', function(){mouseclick()});
    // contact-form
    // let textbar = document.getElementById('#notes');
    // textbar.addEventListener('keydown',function(){keydown});
    // textbar.addEventListener('keyup',function(){keyup});
    window.addEventListener('keydown',function(){keydown()});
    window.addEventListener('keyup',function(){keyup()});
    window.addEventListener("DOMMouseScroll", function(){scroll()});
    //    给页面绑定鼠标滚轮事件，针对Google，mousewheel非标准事件已被弃用，请使用 wheel事件代替
    window.addEventListener("wheel", function(){scroll()});
    started = 1;
}

function continue_logging(){
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      if (this.responseText==="1"){
        started =1;
        window.addEventListener('mousemove', function(){mousemove()});
        window.addEventListener('click', function(){mouseclick()});
        // let textbar = document.getElementById('notes');
        // textbar.addEventListener('keydown',function(){keydown});
        // textbar.addEventListener('keyup',function(){keyup});
        window.addEventListener('keydown',function(){keydown()});
        window.addEventListener('keyup',function(){keyup()});
        window.addEventListener("DOMMouseScroll", function(){scroll()});
    //    给页面绑定鼠标滚轮事件，针对Google，mousewheel非标准事件已被弃用，请使用 wheel事件代替
        window.addEventListener("wheel", function(){scroll()});
        var startbutton = document.getElementById("startbutton");
        if (startbutton){startbutton.style.display="none";} else {
          console.log("faild to find start button.");
        }
      } else {
        started = 0;
      }
    }
    xmlhttp.open("GET", "js/jshelper.php?q=" + "started");
    xmlhttp.send();

}
var current_button_id = null;
function change_button_id(button_id){
  current_button_id=button_id;
  console.log("changing curent button id to "+toString(button_id));
};
function log_navigation(level,path){
  // Level 0: Introduction; Room; Character; Answer
  // Level 1: Collapse bar
  // Level 2: Selection button
  // Level 3: question textarea
  // console.log(log);
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', "js/jshelper.php?q=" + "navigate", true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.onload = function () {
      // do something to response
      console.log(this.responseText);
  };
  xmlhttp.send("level="+level+"&path="+path);


}

function submit(){
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      document.write(this.responseText);
    }
    clear_data();
    xmlhttp.open("GET", "js/jshelper.php?q=" + "submit");
    xmlhttp.send();
}

function change_video(video_id, source_id, video_src){
  var video = document.getElementById(video_id);
  var source = document.getElementById(source_id);

  source.setAttribute('src', video_src);

  video.load();

}

//to display or hide the videos
// function show_hidden(obj){
//   var div = document.getElementById(obj);
 
//   if (div.style.display===""){
//     div.style.display="none";
//   } else {
//     div.style.display="";
//   }
// }





var video_shown;
/**
 * [Show_Hidden 点击控制div显示与隐藏]
 * @param {[id]} obj [需要显示隐藏div的id]
 */
 function show_hidden(obj) {
  var coll_array;
  var i;
  

  var div = document.getElementById(obj);
  refresh_textarea();
  video_shown = obj;
  if (div.style.display===""){

    div.style.display="none";
    video_shown = "";
  } else {
    coll_array = document.getElementsByClassName("container");
    for (i = 0; i < coll_array.length; i++) {
      if(coll_array[i].style.display===""){
        // store_content(coll_array[i].name);
      }
      coll_array[i].style.display="none";
    }

    // load_content(div.name);
    // load_content('content_lobby');
    div.style.display="";
  }
}
  


function change_pic(button_id,pic_src){
  document.getElementById(button_id).src=pic_src;
};

function change_video(video_id, source_id, video_src){
  var video = document.getElementById(video_id);
  var source = document.getElementById(source_id);

  source.setAttribute('src', video_src);

  video.load();

}

const question_map = new Map();

question_map.set('Greene', [4]);
question_map.set('Sean', [2]);
question_map.set('Maestro', [2,15]);
question_map.set('Mac', [6,9,11]);
question_map.set('Tommy', [9,11,13,14,15]);
question_map.set('Reeves', [3,4]);
question_map.set('Security', [13,15]);


question_map.set('office', [2]);
question_map.set('restroom', [6,9,11]);
question_map.set('storageroom', []);
question_map.set('exhibitionroom', [2,4,15]);
question_map.set('entrance', [13]);
question_map.set('meetingroom', [3,4]);



function change_character(name,room){
  // Hide all questions
  var questions = Array.prototype.slice
    .call(document.getElementsByClassName("question"));

  for(var i = 0; i < questions.length; ++i){
    questions[i].style.display="none";
  }

  
  // Show only questions related to the character
  var question;
  var i;
  // console.log( question_map.get(name));
  var target_questions = question_map.get(name);
  // console.log(target_questions);
  for ( i =0; i<target_questions.length; i++){
    question = document.getElementById("question_"+target_questions[i].toString()+"_"+room);
    question.style.display = "";
  }

}

function change_room(room,name){
  // Hide all questions
  var questions = Array.prototype.slice
    .call(document.getElementsByClassName("question"));

  for(var i = 0; i < questions.length; ++i){
    questions[i].style.display="none";
  }

  
  // Show only questions related to the character
  var question;
  var i;
  // console.log( question_map.get(name));
  var target_questions = question_map.get(room);
  // console.log(target_questions);
  for ( i =0; i<target_questions.length; i++){
    question = document.getElementById("question_"+target_questions[i].toString()+"_"+name);
    question.style.display = "";
  }

}

const room_num = new Map();
room_num.set('office', 1);
room_num.set('restroom', 2);
room_num.set('storageroom', 3);
room_num.set('exhibitionroom', 4);
room_num.set('entrance', 5);
room_num.set('meetingroom', 6);

room_num.set('Sean', 1);
room_num.set('Greene', 2);
room_num.set('Maestro', 3);
room_num.set('Mac', 4);
room_num.set('Tommy', 5);
room_num.set('Reeves', 6);
room_num.set('Security', 7);

function read_video_position(){
  
  var cur_roomnum = room_num.get(video_shown);
  var video_height = 71+60*cur_roomnum+18;
  var log = document.documentElement.scrollTop ;
  var ratio = (video_height-log)/window.innerHeight;
  console.log(ratio);
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open('POST', "js/jshelper.php?q=" + "video_position", true);
  xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xmlhttp.onload = function () {
      // do something to response
      console.log(this.responseText);
  };
  // console.log("ddddddddddd");
  xmlhttp.send("log="+log);

}


var secs = 0;

function countDown() {
  var mins = secs ;
  var element = document.getElementById("status");
  element.innerHTML = "You have spent" + mins.toFixed(2) + " seconds";
  secs++;
  setTimeout(countDown, 1000);
  if (secs == 5) {
    element.innerHTML = '<h2>You have no time left!</h2>';
    // secs = 5;
    confirmfun();
    // secs = 5;
    // open();
    
  }
}

function testfun(){
  alert("30 minutes gone!");
}

function confirmfun(){
	var x;
	var r=confirm("30 minutes have passed.\nClick 'OK' to submit and jump to next story\nOr click 'Cancel' to continue on this one");
	if (r==true){
		x="你按下了\"确定\"按钮!";
	}
	else{
		x="你按下了\"取消\"按钮!";
	}
	// document.getElementById("demo").innerHTML=x;
}

function resetStartTime() {
  startTime = new Date();
  window.localStorage.setItem('startTime', startTime);
  return startTime;
}

function update_timer(){
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onload = function() {
    if (this.responseText==="1"){
      started =1;
      var secsDiff = new Date().getTime() - startTime.getTime();
      var in_seconds = Math.floor(secsDiff / 1000);
      if(in_seconds%60 <10) var seconds_display = '0'+in_seconds%60;
      else var seconds_display = in_seconds%60;
      var minuts = Math.floor(in_seconds/60);
      document.getElementById('status').innerText = '\n'+minuts+ ' : '+seconds_display;
      document.getElementById('status').style.fontSize = 'x-large';
      document.getElementById('status').style.marginLeft;
      if ( Math.floor(secsDiff / 1000)== 5) {      
        confirmfun();      
      }
    } else {
      resetStartTime();
      var secsDiff = 0;
      var in_seconds = Math.floor(secsDiff / 1000);
      if(in_seconds%60 <10) var seconds_display = '0'+in_seconds%60;
      else var seconds_display = in_seconds%60;
      var minuts = Math.floor(in_seconds/60);
      document.getElementById('status').innerText = '\n'+minuts+ ' : '+seconds_display;
      document.getElementById('status').style.fontSize = 'x-large';
      document.getElementById('status').style.marginLeft;
    }
  }
  xmlhttp.open("GET", "js/jshelper.php?q=" + "started");
  xmlhttp.send();

  

}


document.addEventListener('DOMContentLoaded', function(event) { 
  // get timestamp
  startTime = new Date(window.localStorage.getItem('startTime') || resetStartTime());
  // start timer
  update_timer();
  window.setInterval(function() {
    update_timer();
  }, 1000);
});