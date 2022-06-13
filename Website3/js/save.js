
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

var editor_array = document.getElementsByClassName("question");
var i;
for (i = 0; i < editor_array.length; i++) {
    editor_array[i].value="";
}

// editor.value="";
//this causes problem in safari, version is unable to increment by 1

window.onbeforeunload=function(){
    // 离开本页之前保存数据
    for (i = 0; i < editor_array.length; i++) {
        if(!window.localStorage){
            UserData.setItem('editor-text'+i.toString(),editor_array[i].value);
        }else{
            localStorage.setItem('editor-text'+i.toString(),editor_array[i].value);
        }
    }
    

};
window.onload=function(){
    // 加载页面时判断是否有数据并加载
    if(!window.localStorage){
        if(UserData.getItem('editor-text')==undefined) {
            editor.value="";
        }else{
            editor.value=UserData.getItem('editor-text');
        }
    }else{
        if(localStorage.getItem('editor-text')!=null){
            editor.value=localStorage.getItem('editor-text');
        }else{
            editor.value="";
        }
    }

};
// // 点击发表时删除数据
// document.getElementById("save").onclick=function(){
//     editor.value="";
//     if(!window.localStorage){
//         UserData.remove('editor-text');
//     }else{
//         localStorage.removeItem('editor-text');
//     }
// };