

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
        const alarmSound = new Media(cordova.file.applicationDirectory + "www/sounds/alarm.mp3");
        const stopSound = new Media(cordova.file.applicationDirectory + "www/sounds/stop.mp3");
        const resumeSound = new Media(cordova.file.applicationDirectory + "www/sounds/resume.mp3");
        const resetSound = new Media(cordova.file.applicationDirectory + "www/sounds/reset.mp3");

        const timerDuration = 3 * 60;
        const timerDisplay = document.getElementById("timer");
        const homeText = document.getElementById("home");

        let shouldStartTimer = false;
        let currentTimerDuration = timerDuration;
        let timer;

        document.addEventListener('click', function () {
            homeText.hidden = true;

            shouldStartTimer = shouldStartTimer === false;
            if (shouldStartTimer) {
                cordova.plugins.backgroundMode.enable();
                startTimer(timerDisplay);
            } else {
                stopSound.play();
                clearInterval(timer);
            }

        }, false);

        let onLongTouch;
        let touchTimer;
        let touchDuration = 500;

        document.addEventListener("touchstart", function () {
            if(homeText.hidden){
                touchTimer = setTimeout(onLongTouch, touchDuration);
            }
        });

        document.addEventListener("touchend", function (){
            //stops short touches from firing the event
            if (touchTimer)
                clearTimeout(touchTimer);
        });

        onLongTouch = function() {
            alarmSound.stop();
            resetSound.setVolume('0.5');
            resetSound.play();
            reset();
        };

        function reset() {
            cordova.plugins.backgroundMode.disable();
            clearInterval(timer);
            shouldStartTimer = false;
            timerDisplay.innerHTML = "";
            homeText.hidden = false;
            currentTimerDuration = timerDuration;
        }

        function startTimer(display) {
            let counter = currentTimerDuration, minutes, seconds;
            resumeSound.play();
            timer = setInterval(function () {
                currentTimerDuration = counter;
                minutes = parseInt(counter / 60, 10);
                seconds = parseInt(counter % 60, 10);


                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (--counter < 0) {
                    alarmSound.play();
                    reset();
                }
            }, 1000);
        }
    },
};

app.initialize();