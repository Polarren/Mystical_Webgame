function play_audio(audio_id,audio_src) {
    // var audio_stop1 = document.getElementById("audio2");
    // audio_stop1.pause();
    // var audio_stop2 = document.getElementById("audio3");
    // audio_stop2.pause();
    var audio = document.getElementById(audio_id);
    audio.src = audio_src;

    // <audio controls="controls">
    //     <source src="audios/trial_room_1.mp3" type="audio/mpeg">
    // Your browser does not support the audio element.
    // </audio>
    audio.currentTime=0;
    audio.play();
}
// function play2() {
//     var audio_stop1 = document.getElementById("audio1");
//     audio_stop1.pause();
//     var audio_stop2 = document.getElementById("audio3");
//     audio_stop2.pause();
//     var audio = document.getElementById("audio2");
//     audio.currentTime=0;
//     audio.play();
// }

// function play3() {
//     var audio_stop1 = document.getElementById("audio1");
//     audio_stop1.pause();
//     var audio_stop2 = document.getElementById("audio2");
//     audio_stop2.pause();
//     var audio = document.getElementById("audio3");
//     audio.currentTime=0;
//     audio.play();
// }