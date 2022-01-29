const tracks = {
    'musics': {
        1: { title: 'Vampiro - Matuê & Wiu & Teto', urlimg: '../img/vampiro-img.jpg', urlmusic: '../music/vampiro.mp3' },
        2: { title: 'Luxúria - Xamã e Matuê', urlimg: './img/luxuria-img.jpg', urlmusic: '../music/luxuria.mp3' }
    }
}

const audioTrack = new Audio();
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');
import { isf, soundProperties } from './modules/player/client.js';
const sound = new soundProperties(audioTrack);
let crnt_time = document.getElementById('current-time');

audioTrack.addEventListener('canplay', function () {
    sound.setEvent("ready")
    crnt_time.textContent = sound.getCurrentTime();
    document.getElementById('duration-time').textContent = sound.getDuration()
    document.getElementById('music-title').textContent = tracks.musics[1].title
    document.getElementById('image-music').src = tracks.musics[1].urlimg
})

audioTrack.addEventListener('ended', function () {
    
})

audioTrack.addEventListener('play', async function () {
    setInterval(() => {
        crnt_time.textContent = sound.getCurrentTime();
    }, 1000);
    const playIcon = document.querySelector('.bi-play');
    playIcon.classList.remove('bi-play');
    playIcon.classList.add('bi-pause');
})

audioTrack.addEventListener('pause', async function () {
    const pauseIcon = document.querySelector('.bi-pause');
    pauseIcon.classList.remove('bi-pause');
    pauseIcon.classList.add('bi-play');
})

nextButton.addEventListener('click', async function () {
    sound.setEvent("next")
})

playButton.addEventListener('click', async function () {
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
