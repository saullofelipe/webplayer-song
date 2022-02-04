const tracks = {
    'musics': {
        1: { title: 'Vampiro - Matuê & Wiu & Teto', urlimg: '../img/vampiro-img.jpg', urlmusic: '../music/vampiro.mp3' },
        2: { title: 'Luxúria - Xamã e Matuê', urlimg: '../img/luxuria-img.jpg', urlmusic: '../music/luxuria.mp3' },
        3: { title: 'Haikaiss - Sem Graça', urlimg: '../img/sem-graca-img.jpg', urlmusic: '../music/sem-graca.mp3' }
    }
}

const audioTrack = new Audio(tracks.musics[3].urlmusic);
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
import { isf, soundProperties } from './modules/player/client.js';
const sound = new soundProperties(audioTrack);
let crnt_time = document.getElementById('current-time');

audioTrack.addEventListener('canplay', function () {
    crnt_time.textContent = sound.getCurrentTime()
    sound.setEvent("ready")
})

audioTrack.addEventListener('ended', function () {
    sound.setEvent("ready")
})

var timer;
var percent = 0;
audioTrack.addEventListener("playing", function () {
    var duration = audioTrack.duration;
    advance(duration, audioTrack);
    document.getElementById('duration-time').textContent = sound.getDuration()
    document.getElementById('music-title').textContent = tracks.musics[3].title
    document.getElementById('image-music').src = tracks.musics[3].urlimg
});


audioTrack.addEventListener("pause", function (_event) {
    clearTimeout(timer);
});

var advance = function (duration, element) {
    var progress = document.getElementById("curx");
    var increment = 10 / duration
    var percent = Math.min(increment * element.currentTime * 10, 100);
    progress.style.width = percent + '%'
    startTimer(duration, element);
}
var startTimer = function (duration, element) {
    if (percent < 100) {
        timer = setTimeout(function () { advance(duration, element) }, 100);
    }
}

audioTrack.addEventListener('timeupdate', () => {
    crnt_time.textContent = sound.getCurrentTime();
})

audioTrack.addEventListener('play', () => {
    const playIcon = document.querySelector('.bi-play');
    playIcon.classList.remove('bi-play');
    playIcon.classList.add('bi-pause');
})

audioTrack.addEventListener('pause', () => {
    const pauseIcon = document.querySelector('.bi-pause');
    pauseIcon.classList.remove('bi-pause');
    pauseIcon.classList.add('bi-play');
})

nextButton.addEventListener('click', () => {
    sound.setEvent("next")
})

playButton.addEventListener('click', () => {
    const verication = isf.connection.cache.event;
    switch (verication) {
        case 'ready':
        case 'pause':
            audioTrack.play();
            sound.setEvent("play");
            break;
        case 'play':
            audioTrack.pause();
            sound.setEvent("pause");
            break;
        default:
            throw new Error('O player não reconheceu o evento! Alguns dos motivos podem ser: Música (atual) não está pronta para ser tocada, o evento é desconhecido ou o retorno é inválido.')
    }
})