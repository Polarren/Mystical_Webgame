

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
}

function continue_logging(){
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      if (this.responseText==="1"){
        window.addEventListener('mousemove', function(){mousemove()});
        window.addEventListener('click', function(){mouseclick()});
        // let textbar = document.getElementById('notes');
        // textbar.addEventListener('keydown',function(){keydown});
        // textbar.addEventListener('keyup',function(){keyup});
        window.addEventListener('keydown',function(){keydown()});
        window.addEventListener('keyup',function(){keyup()});
      }
    }
    xmlhttp.open("GET", "js/jshelper.php?q=" + "started");
    xmlhttp.send();

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



//to display or hide the videos
// function show_hidden(obj){
//   var div = document.getElementById(obj);
 
//   if (div.style.display===""){
//     div.style.display="none";
//   } else {
//     div.style.display="";
//   }
// }






/**
 * [Show_Hidden 点击控制div显示与隐藏]
 * @param {[id]} obj [需要显示隐藏div的id]
 */
 function show_hidden(obj) {
  var coll_array;
  var i;
  

  var div = document.getElementById(obj);
  refresh_textarea();
  if (div.style.display===""){

    div.style.display="none";
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

question_map.set('Greene', [16,4,5]);
question_map.set('Sean', [16,1,2]);
question_map.set('Maestro', [1,2,8,15]);
question_map.set('Mac', [5,6,9,10,11]);
question_map.set('Tommy', [7,8,9,10,11,13,14,15]);
question_map.set('Reeves', [3,4]);
question_map.set('Security', [13,15]);


question_map.set('office', [16,1,2]);
question_map.set('restroom', [5,6,9,10,11]);
question_map.set('storageroom', [7,8]);
question_map.set('exhibitionroom', [1,2,4,5,15]);
question_map.set('entrance', [7,8,13]);
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
