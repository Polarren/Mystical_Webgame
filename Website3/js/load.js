

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
    window.addEventListener('keydown',function(){keydown()});
    window.addEventListener('keyup',function(){keyup()});
}

function continue_logging(){
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
      if (this.responseText==="1"){
        window.addEventListener('mousemove', function(){mousemove()});
        window.addEventListener('click', function(){mouseclick()});
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
    xmlhttp.open("GET", "js/jshelper.php?q=" + "submit");
    xmlhttp.send();

    editor.value="";
    if(!window.localStorage){
        UserData.remove('editor-text');
    }else{
        localStorage.removeItem('editor-text');
    }
}


/**
 * [Show_Hidden 点击控制div显示与隐藏]
 * @param {[id]} obj [需要显示隐藏div的id]
 */
function Show_Hidden(obj) {
  var coll_array;
  var i;
 

  var div = document.getElementById(obj);
 
  if (div.style.display===""){
    store_content(div.name);
    div.style.display="none";
  } else {
    coll_array = document.getElementsByClassName("container");
    for (i = 0; i < coll_array.length; i++) {
      if(coll_array[i].style.display===""){
        store_content(coll_array[i].name);
      }
      coll_array[i].style.display="none";
    }
    // load_content(div.name);
    load_content('content_lobby');
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


function store_content(name){
  var room_name = name.substring(8);
  var target_questions = question_map.get(room_name);
  var i;
  for(i=0;i<target_questions.length;i++){
    store_content_textarea("q"+target_questions[i].toString()+"text_"+room_name);
  }
}

function load_content(name){
  var room_name = name.substring(8);
  var target_questions = question_map.get(room_name);
  var i;
  for(i=0;i<target_questions.length;i++){
    load_content_textarea("q"+target_questions[i].toString()+"text_"+room_name);
  }
}





var UserData = {
  userData : null,
  name : location.hostname,
  //this.name = "www.xuanfengge.com";

  init:function(){
      // IE7下返回true，其他浏览器返回false
      if (!UserData.userData) {
          try {
              UserData.userData = document.createElement('INPUT');
              UserData.userData.type = "hidden";
              UserData.userData.style.display = "none";
              UserData.userData.addBehavior ("#default#userData");
              document.body.appendChild(UserData.userData);
              var expires = new Date();
              expires.setDate(expires.getDate()+365);
              UserData.userData.expires = expires.toUTCString();
          } catch(e) {
              return false;
          }
      }
      return true;
  },

  setItem : function(key, value) {
      // IE7下的set
      if(UserData.init()){
          UserData.userData.load(UserData.name);
          UserData.userData.setAttribute(key, value);
          UserData.userData.save(UserData.name);
      }
  },

  getItem : function(key) {
    // IE7下的get
      if(UserData.init()){
        UserData.userData.load(UserData.name);
        return UserData.userData.getAttribute(key)
      }
  },

  remove : function(key) {
      // IE7下的remove
      if(UserData.init()){
        UserData.userData.load(UserData.name);
        UserData.userData.removeAttribute(key);
        UserData.userData.save(UserData.name);
      }

  }
};

function store_content_textarea(textarea_id){
  var text_area = document.getElementById(textarea_id);
  var ques_num = textarea_id.substring(1,2);
  if(!window.localStorage){
    UserData.setItem('question_'+ques_num.toString()+'_textarea',text_area.value);
  }else{
    localStorage.setItem('question_'+ques_num.toString()+'_textarea',text_area.value);
}
}


function load_content_textarea(textarea_id){
  // var text_area = document.getElementById(textarea_id);
  var text_area = document.getElementById('q4text_lobby');
  var ques_num = textarea_id.substring(1,2);
  if(!window.localStorage){
    if(UserData.getItem('question_'+ques_num.toString()+'_textarea')==undefined) {
      text_area.value="";
    }else{
      text_area.value=UserData.getItem('question_'+ques_num.toString()+'_textarea');
    }
  }else{
      if(localStorage.getItem('question_'+ques_num.toString()+'_textarea')!=null){
        text_area.value=localStorage.getItem('question_'+ques_num.toString()+'_textarea');
      }else{
        text_area.value="testing";
      }
  }
}

window.onbeforeunload=function(){
// 离开本页之前保存数据
// console.log("leaving\n")
for (i = 0; i < editor_array.length; i++) {
  if(!window.localStorage){
      UserData.setItem('editor-text'+i.toString(),editor_array[i].value);
  }else{
      localStorage.setItem('editor-text'+i.toString(),editor_array[i].value);
  }
}


};

window.onload = function(){
console.log("loading\n");
for(i = 0;i<editor_array.length;i++){
  if(!window.localStorage){
      if(UserData.getItem('editor-text'+i.toString())==undefined) {
          editor_array[i].value="";
      }else{
          editor_array[i].value=UserData.getItem('editor-text'+i.toString());
      }
  }else{
      if(localStorage.getItem('editor-text'+i.toString())!=null){
          editor_array[i].value=localStorage.getItem('editor-text'+i.toString());
      }else{
          editor_array[i].value="";
      }
  }
}
}
