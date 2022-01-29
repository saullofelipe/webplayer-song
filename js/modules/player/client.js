// Information Storage Flow(EN-US) || Fluxo de Armazenamento de Informações (PT-BR) ||

let isf = {
    'connection': {
        'cache': {
            event: null
        }
    }
}

class soundProperties {

    constructor(sound) {
        this.sound = sound;
    }

    setEvent(event) {
        isf.connection.cache.event = event;
    }

    getDuration() {
        const duration = Math.trunc(this.sound.duration)
        //var hours = Math.trunc(duration / 3600);
        var minutes = Math.trunc((duration % 3600) / 60);
        var seconds = Math.trunc(duration % 60)
        return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0')
        //hours.toString().padStart(2, '0') + ":" + 
    }

    getCurrentTime() {
        const timeactual = Math.trunc(this.sound.currentTime)
        //var hours = Math.trunc(timeactual / 3600);
        var minutes = Math.trunc((timeactual % 3600) / 60);
        var seconds = Math.trunc(timeactual % 60)
        return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0')
        //hours.toString().padStart(2, '0') + ":" + 
    }
}

export { isf, soundProperties }