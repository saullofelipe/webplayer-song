const audioTrack = new Audio('luxuria.mp3');
const playbutton = document.querySelector('#play');

playbutton.addEventListener("click", function () {
    audioTrack.play()
});