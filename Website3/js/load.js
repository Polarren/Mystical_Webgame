

function mouseclick(){
    
    // var log = ''+ event.clientX +' '+ event.clientY+'\n';
    var index_x = event.clientX;
    var index_y = event.clientY;
    // console.log(log);
    const xmlhttp = new XMLHttpRequest();
   
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
};

function print_answer(){
  var answer_text;
  for(i = 0;i<question_amount;i++){
    if(!window.localStorage){
        if(UserData.getItem('editor-text'+i.toString())==undefined) {
            console.log("Window Local Storage: undeifined");
        }else{
            // console.log("edtior_array "+i+ ": "+UserData.getItem('editor-text'+i.toString()));
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.onload = function() {
              console.log(this.responseText);
            }
            xmlhttp.open("POST", "js/jshelper.php?q=" + "print_answer");
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            answer_text = UserData.getItem('editor-text'+i.toString());
            console.log("questionNum="+(i+1)+"&answertext="+answer_text);
            xmlhttp.send("questionNum="+(i+1)+"&answertext="+answer_text);
            
        }
    }else{
        if(localStorage.getItem('editor-text'+i.toString())!=null){
            // console.log("edtior_array "+i+ ": "+localStorage.getItem('editor-text'+i.toString()));
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.onload = function() {
              console.log(this.responseText);
            }
            xmlhttp.open("POST", "js/jshelper.php?q=" + "print_answer");
            xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            answer_text = localStorage.getItem('editor-text'+i.toString());
            console.log("questionNum="+(i+1)+"&answertext="+answer_text);
            xmlhttp.send("questionNum="+(i+1)+"&answertext="+answer_text);
        }else{
            console.log("Local Storage: undeifined");
        }
    }
  }
};

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
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('click', mouseclick);
    window.addEventListener('keydown',keydown);
    window.addEventListener('keyup',keyup);
    //    给页面绑定鼠标滚轮事件,针对火狐的非标准事件 
    window.addEventListener("DOMMouseScroll", scroll);
    //    给页面绑定鼠标滚轮事件，针对Google，mousewheel非标准事件已被弃用，请使用 wheel事件代替
    window.addEventListener("wheel", scroll);
    started =1;
}

function continue_logging(){
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      if (this.responseText==="1"){
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('click', mouseclick);
        window.addEventListener('keydown',keydown);
        window.addEventListener('keyup',keyup);
        //    给页面绑定鼠标滚轮事件,针对火狐的非标准事件 
        window.addEventListener("DOMMouseScroll", scroll);
        //    给页面绑定鼠标滚轮事件，针对Google，mousewheel非标准事件已被弃用，请使用 wheel事件代替
        window.addEventListener("wheel", scroll);
        // console.log("Setting started to be one");
        var startbutton = document.getElementById("startbutton");
        if (startbutton){startbutton.style.display="none";} 
      }
    }
    xmlhttp.open("GET", "js/jshelper.php?q=" + "started");
    xmlhttp.send();
    // console.log("started = "+started);
    
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
  // console.log(path);
  xmlhttp.send("level="+level+"&path="+path);


};

function submit(){
    print_answer();
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      document.write(this.responseText);
    }
    xmlhttp.open("GET", "js/jshelper.php?q=" + "submit");
    xmlhttp.send();
    
    clear_data();
  };



  var video_shown;
  // /**
  //  * [Show_Hidden 点击控制div显示与隐藏]
  //  * @param {[id]} obj [需要显示隐藏div的id]
  //  */
  //  function Show_Hidden(obj) {
  //   var coll_array;
  //   var i;
    
  
  //   var div = document.getElementById(obj);
  //   refresh_textarea();
  //   video_shown = obj;
  //   if (div.style.display===""){
  
  //     div.style.display="none";
  //     video_shown = "";
  //   } else {
  //     coll_array = document.getElementsByClassName("container");
  //     // for (i = 0; i < coll_array.length; i++) {
  //     //   if(coll_array[i].style.display===""){
  //     //     // store_content(coll_array[i].name);
  //     //   }
  //     //   coll_array[i].style.display="none";
  //     // }
  
  //     // load_content(div.name);
  //     // load_content('content_lobby');
  //     div.style.display="";
  //   }
  
    
  // };


/**
 * [Show_Hidden 点击控制div显示与隐藏]
 * @param {[id]} obj [需要显示隐藏div的id]
 */
function Show_Hidden(obj) {
  var coll_array;
  var i;
 

  var div = document.getElementById(obj);
  refresh_textarea();
  video_shown = obj;
  if (div.style.display===""){
    // store_content(div.name);
    div.style.display="none";
    video_shown = "";
  } else {
    coll_array = document.getElementsByClassName("container");
    for (i = 0; i < coll_array.length; i++) {
      // if(coll_array[i].style.display===""){
        // store_content(coll_array[i].name);
      // }
      coll_array[i].style.display="none";
    }
    // load_content(div.name);
    // load_content('content_lobby');
    div.style.display="";
  }

  
}

var current_button_id = null;

function change_button_id(button_id){
  current_button_id=button_id;
  console.log("changing curent button id to "+toString(button_id));
};


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

question_map.set('Schrader', [10]);
question_map.set('Jessica', [11]);
question_map.set('Dwight', [18,19]);
question_map.set('Mickey', [12]);
question_map.set('Chip', [13]);
question_map.set('Martin', [4,14]);
question_map.set('Doug', [4,16]);
question_map.set('Tucker', [4,5]);
question_map.set('Sting', [4,8]);
question_map.set('Kint', [17]);
question_map.set('Cassidy', [4,8,15]);
question_map.set('Blade', [4,6,8]);

question_map.set('lobby', [1,2,3,7,19]);
question_map.set('outside', [3,12,13,19]);
question_map.set('hall', [2,4,7,14,15]);
question_map.set('interview_room_1', [6,14]);
question_map.set('interview_room_2', [4,8,11,13,17]);
question_map.set('conference_room', [6]);
question_map.set('tucker_office', [5,16]);
question_map.set('toilet', [18,19]);


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
room_num.set('content_lobby', 1);
room_num.set('content_outside', 2);
room_num.set('content_hall', 3);
room_num.set('content_conference_room', 4);
room_num.set('content_tucker_office', 5);
room_num.set('content_interview_room_1', 6);
room_num.set('content_interview_room_2', 7);
room_num.set('content_toilet', 8);

room_num.set('content_Dwight', 1);
room_num.set('content_Schrader', 2);
room_num.set('content_Jessica', 3);
room_num.set('content_Chip', 4);
room_num.set('content_Kint', 5);
room_num.set('content_Mickey', 6);
room_num.set('content_Martin', 7);
room_num.set('content_Blade', 8);
room_num.set('content_Doug', 9);
room_num.set('content_Tucker', 10);
room_num.set('content_Cassidy', 11);
room_num.set('content_Sting', 12);

function read_video_position(){
  
  if (video_shown!=""){
    console.log("video_shown="+video_shown);
    var cur_roomnum = room_num.get(video_shown);
    var video_height = 71+60*cur_roomnum+18;
    var log = document.documentElement.scrollTop ;
    var ratio = (video_height-log)/window.innerHeight;
    console.log("ratio="+ratio);
    // const xmlhttp = new XMLHttpRequest();
    // xmlhttp.open('POST', "js/jshelper.php?q=" + "video_position", true);
    // xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // xmlhttp.onload = function () {
    //     // do something to response
    //     console.log(this.responseText);
    // };
    // // console.log("ddddddddddd");
    // xmlhttp.send("log="+log);

  }
};


function confirmfun(){
	// var x;
	alert("30 minutes have passed.");
	// if (r==true){
	// 	submit();
	// }
	// else{
	// 	x="你按下了\"取消\"按钮!";
	// }
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


