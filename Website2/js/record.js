var video = document.querySelector("#videoElement");

if (navigator.mediaDevices) {
    console.log('getUserMedia supported.');
  
    const constraints = { video: true };
    let chunks = [];
  
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
  
      const mediaRecorder = new MediaRecorder(stream);
  
    //   visualize(stream);
      video.srcObject = stream;
      

      var start_button = document.getElementById("startbutton");
      var stop_button = document.getElementById("stopbutton");
      start_button.onclick = function() {
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
      }
  
      stop_button.onclick = function() {
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        console.log("recorder stopped");
      }
  
      mediaRecorder.onstop = function(e) {
        console.log("data available after MediaRecorder.stop() called.");
        let blob = new Blob(chunks, { 'type' : 'video/mp4' });
        // videoStream = URL.createObjectURL(blob);
        var data = new FormData();
        data.append('file',blob);
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function() {
            console.log("Blob sent");
            console.log(this.response);
            
        }
        xmlhttp.open("POST", "js/jshelper.php?q=" + "video");
        xmlhttp.send(data);

        chunks = [];
        // const clipName = prompt('Enter a name for your sound clip');
  
        // const clipContainer = document.createElement('article');
        // const clipLabel = document.createElement('p');
        // const audio = document.createElement('audio');
        // const deleteButton = document.createElement('button');
  
        // clipContainer.classList.add('clip');
        // audio.setAttribute('controls', '');
        // deleteButton.innerHTML = "Delete";
        // clipLabel.innerHTML = clipName;
  
        // clipContainer.appendChild(audio);
        // clipContainer.appendChild(clipLabel);
        // clipContainer.appendChild(deleteButton);
        // soundClips.appendChild(clipContainer);
  
        // audio.controls = true;
        // const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
        // chunks = [];
        // const audioURL = URL.createObjectURL(blob);
        // audio.src = audioURL;
        // console.log("recorder stopped");
  
        // deleteButton.onclick = function(e) {
        //   const evtTgt = e.target;
        //   evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
        // }
      }
  
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      }

      function update_record(){
        // Update state recording by http requests
        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onload = function() {
          if (this.responseText==="1"){
            // console.log(mediaRecorder.state);
            if (mediaRecorder.state=="inactive"){
                mediaRecorder.start();
                console.log("recorder started");
            }
    
          } else {
            if (mediaRecorder.state=="recording"){
                mediaRecorder.stop();
                console.log("recorder stopped");
            }
          }
        }
        xmlhttp.open("GET", "js/jshelper.php?q=" + "started");
        xmlhttp.send();
    };
    window.setInterval(function() {
        // console.log("Updating record");
        update_record();
    }, 1000);
    })
    .catch(function(err) {
      console.log('The following error occurred: ' + err);
    })
  };




