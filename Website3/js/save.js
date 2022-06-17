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

const editor_array = new Array(19);
// var editor_array = document.getElementsByName('questiontextbar');
var i;
for (i = 0; i < 19; i++) {
    editor_array[i]="";
};
var question_i_array;
var j;


window.onbeforeunload=function(){
    // 离开本页之前保存数据
    for (i = 0; i < editor_array.length; i++) {
        if(!window.localStorage){
            UserData.setItem('editor-text'+i.toString(),editor_array[i]);
        }else{
            localStorage.setItem('editor-text'+i.toString(),editor_array[i]);
        }
    }
    

};

window.onload = function(){
    for(i = 0;i<editor_array.length;i++){
        if(!window.localStorage){
            if(UserData.getItem('editor-text'+i.toString())==undefined) {
                editor_array[i]="";
                console.log("Frame Undefined");
            }else{
                editor_array[i]=UserData.getItem('editor-text'+i.toString());
                question_i_array = document.getElementsByName("question_"+i.toString()+"_textarea");
                console.log(question_i_array);
                for (j=0; j<question_i_array.length;j++){
                    question_i_array[j].value = editor_array[i];
                }
            }
        }else{
            if(localStorage.getItem('editor-text'+i.toString())!=null){
                editor_array[i].value=localStorage.getItem('editor-text'+i.toString());
                question_i_array = document.getElementsByName("question_"+i.toString()+"_textarea");
                for (j=0; j<question_i_array.length;j++){
                    question_i_array[j].value = editor_array[i];
                }
            }else{
                editor_array[i]="";
            }
        }
    }
}

function save_answer(textarea) {
    var question_num;
    var name = textarea.name;
    question_num = parseInt(name.substring(9))-1;
    editor_array[question_num] = textarea.value;
    // console.log("Saving content "+ textarea.value + " to editor array "+question_num+".");
}



// function store_content(name){
//     var room_name = name.substring(8);
//     var target_questions = question_map.get(room_name);
//     var i;
//     for(i=0;i<target_questions.length;i++){
//       store_content_textarea("q"+target_questions[i].toString()+"text_"+room_name);
//     }
//   }
  
  function load_content(name){
    var room_name = name.substring(8);
    var target_questions = question_map.get(room_name);
    var i;
    for(i=0;i<target_questions.length;i++){
      load_content_textarea("q"+target_questions[i].toString()+"text_"+room_name);
    }
  }
  
  
//   function store_content_textarea(textarea_id){
//     var text_area = document.getElementById(textarea_id);
//     var ques_num = textarea_id.substring(1,2);
//     if(!window.localStorage){
//       UserData.setItem('question_'+ques_num.toString()+'_textarea',text_area.value);
//     }else{
//       localStorage.setItem('question_'+ques_num.toString()+'_textarea',text_area.value);
//   }
//   }
  
  
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


function refresh_textarea(){
    for(i = 0;i<editor_array.length;i++){
        question_i_array = document.getElementsByName("question_"+(i+1).toString()+"_textarea");
        for (j=0; j<question_i_array.length;j++){
            question_i_array[j].value = editor_array[i];
        }
    }
}
  
 
    // };
    // // 点击发表时删除数据
    // document.getElementById("save").onclick=function(){
    //     editor.value="";
    //     if(!window.localStorage){
    //         UserData.remove('editor-text');
    //     }else{
    //         localStorage.removeItem('editor-text');
    //     }
    // };