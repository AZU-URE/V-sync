function start_audio_Recording(candidate) {
    let name = candidate.getAttribute("id")
    //To stores the recorded media
    let chunksArr = [];
    const startBtn = document.getElementById(name);

    startBtn.disabled = true;
    // Access the camera and microphone
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then((mediaStream) => {
            const medRec = new MediaRecorder(mediaStream);
            window.mediaStream = mediaStream;
            window.mediaRecorder = medRec;
            medRec.start()

            setTimeout(() => {
                stop_Recording(startBtn)
            }, 6000);


            //when recorded data is available then push into chunkArr array
            medRec.ondataavailable = (e) => {
                chunksArr.push(e.data);
            };

            //stop the audio recording
            medRec.onstop = () => {
                const blob = new Blob(chunksArr, { type: "audio/wav" });
                chunksArr = [];

                // create audio element and store the media which is recorded
                const name = document.createElement("audio");
                name.controls = true;
                const RecUrl = URL.createObjectURL(blob);
                name.src = RecUrl;
                document.getElementById(candidate.parentNode.getAttribute("id")).append(
                    name);


                var wavesurfer = WaveSurfer.create({
                    container: `#${candidate.parentNode.nextElementSibling.getAttribute("id")}`,
                    waveColor: 'black',
                    progressColor: 'purple'
                });

                wavesurfer.load(RecUrl);
                // console.log();
            };



        });
}


function stop_Recording(start) {
    //stop all tracks
    window.mediaRecorder.stop();
    window.mediaStream.getTracks().forEach((track) => { track.stop(); });
    //disable the stop button and enable the start button
    start.disabled = false;
}


