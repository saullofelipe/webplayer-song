const audioTrack = new Audio('luxuria.mp3');
const playButton = document.querySelector('#play');
import { SoundProperties, statePlay } from './modules/client.js';
const sound = new SoundProperties();
//document.querySelector('.reproduction').setAttribute('title', 'offline');

audioTrack.addEventListener('canplay', function () {
    sound.setEvent("ready")
})

audioTrack.addEventListener('play', async function () {
    const playIcon = document.querySelector('.bi-play');
    playIcon.classList.remove('bi-play');
    playIcon.classList.add('bi-pause');
})

audioTrack.addEventListener('pause', async function () {
    const pauseIcon = document.querySelector('.bi-pause');
    pauseIcon.classList.remove('bi-pause');
    pauseIcon.classList.add('bi-play');

})

playButton.addEventListener('click', async function () {
    if (statePlay.connection.cache.nowevent === "ready") {
        audioTrack.play();
        sound.setEvent("play"); 
    } else
        if (statePlay.connection.cache.nowevent === "play") {
            audioTrack.pause();
            sound.setEvent("ready");
        };
    console.log(statePlay.connection.cache.nowevent)
})