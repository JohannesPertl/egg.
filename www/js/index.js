

let app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.


    onDeviceReady: function () {


        // Constants
        const alarmMp3Link = cordova.file.applicationDirectory + "www/sounds/alarm.mp3";
        const alarm = new Media(alarmMp3Link, null);
        const timerDuration = 3 * 60;
        const timerDisplay = document.getElementById("timer");


        let shouldStartTimer = false;
        let currentTimerDuration = timerDuration;
        let timer;
        document.addEventListener('click', function () {
            document.getElementById("home").hidden = true;
            shouldStartTimer = shouldStartTimer === false;
            if (shouldStartTimer) {
                startTimer(timerDisplay);

            } else {

                clearInterval(timer);
            }

        }, false);


        document.addEventListener("dblclick", function () {
            reset();
        }, false);


        function reset() {
            stopAlarm();
            clearInterval(timer);
            shouldStartTimer = false;
            timerDisplay.innerHTML = "";
            document.getElementById("home").hidden = false;
            currentTimerDuration = timerDuration;
        }

        function startTimer(display) {
            let counter = currentTimerDuration, minutes, seconds;
            timer = setInterval(function () {
                currentTimerDuration = counter;
                minutes = parseInt(counter / 60, 10);
                seconds = parseInt(counter % 60, 10);


                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (--counter < 0) {
                    reset();
                    playAlarm();
                }
            }, 1000);
        }

        function playAlarm() {
            alarm.setVolume(0.5);
            alarm.play();
        }

        function stopAlarm() {
            alarm.stop();
        }

    },

};

app.initialize();