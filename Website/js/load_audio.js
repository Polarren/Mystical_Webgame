function play1() {
    var audio_stop1 = document.getElementById("audio2");
    audio_stop1.pause();
    var audio_stop2 = document.getElementById("audio3");
    audio_stop2.pause();
    var audio = document.getElementById("audio1");
    audio.currentTime=0;
    audio.play();
}
function play2() {
    var audio_stop1 = document.getElementById("audio1");
    audio_stop1.pause();
    var audio_stop2 = document.getElementById("audio3");
    audio_stop2.pause();
    var audio = document.getElementById("audio2");
    audio.currentTime=0;
    audio.play();
}

function play3() {
    var audio_stop1 = document.getElementById("audio1");
    audio_stop1.pause();
    var audio_stop2 = document.getElementById("audio2");
    audio_stop2.pause();
    var audio = document.getElementById("audio3");
    audio.currentTime=0;
    audio.play();
}