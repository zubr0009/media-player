import songList from "./data.js";
const APP = {
    audio: new Audio(),
    currentTrack: 0,
    paused: true,
    init() {
        APP.loadPlaylist();
        // APP.displayDurations();
        APP.addDOMListeners();
        APP.addAudioListeners();
        APP.load();
    },

    addDOMListeners() {
        document.getElementById('btnplay').addEventListener('click', APP.startplay);
        document.getElementById('btnpause').addEventListener('click', APP.pauseplay);
        document.getElementById('btnprev').addEventListener('click', APP.prevplay);
        document.getElementById('btnnext').addEventListener('click', APP.nextplay);
        document.getElementById('playlist').addEventListener('click', APP.clickSelect);
    },

    addAudioListeners() {
        APP.audio.addEventListener('error', APP.audioError);
        APP.audio.addEventListener('ended', APP.ended);
        APP.audio.addEventListener('loadstart', APP.loadstart);
        APP.audio.addEventListener('loadedmetadata', APP.loadedmetadata);
        APP.audio.addEventListener('canplay', APP.canplay);
        APP.audio.addEventListener('durationchange', APP.durationchange);
        APP.audio.addEventListener('timeupdate', APP.timeupdate);
        APP.audio.addEventListener('play', APP.play);
        APP.audio.addEventListener('pause', APP.pause);
    },

    loadPlaylist() {
        const playlist = document.getElementById('playlist');
        playlist.innerHTML = songList.map((song, index) => {
            let current = '';
            if(index === APP.currentTrack){ 
                current = "current-track" ;
            }
                return `<li class="song ${current}" data-id="${index}"> <!--song-->
                <div class="song-img">
                <img src="${song.thumbnail}" alt=""> <!--song thumbnail-->
                </div>
                <div class="song-details"> <!--song details-->
                <p class="song-title">${song.title}</p>
                <p class="song-artist">${song.artist}</p>
                </div>
                <div class="song-time"> <!--song time-->
                <time id="list-total-time">0:00</time>
                </div>
                </li>`
            }).join(' ');
            APP.bigImageUpdate();
    },

    load() {
        APP.audio.src = `./media/${songList[APP.currentTrack].track}`;
    },

    ended() {
        APP.currentTrack++;
        APP.songTransition();
    },

    startplay() {
        if (APP.audio.src) {
            APP.audio.play();
        }
    },

    pauseplay() {
        if (APP.audio && APP.audio.pause());
    },

    prevplay() {
        if (APP.audio && APP.audio.pause());
        APP.currentTrack--;
        if (APP.currentTrack < 0) {
            APP.currentTrack = songList.length;
        }
        APP.songTransition();
    },

    nextplay() {
        if (APP.audio && APP.audio.pause());
        APP.currentTrack++;
        if (APP.currentTrack > songList.length) {
            APP.currentTrack = 0;
        }
        APP.songTransition();
    },

    clickSelect(ev) {
        let selection = ev.target.closest('li.song');
        const index = selection.dataset.id;
        APP.currentTrack = parseInt(index);
        APP.songTransition();
    },

    bigImageUpdate() {
        const bigImage = document.getElementById('song-img');
        bigImage.src=`${songList[APP.currentTrack].large}`;
    },

    selectColorUpdate() {
        console.log(APP.currentTrack);
        let songs = document.querySelectorAll('li.song');
        songs.forEach((song, index) => {
            song.classList.remove('current-track');
            if (index === APP.currentTrack) {
                song.classList.add('current-track');
            }
        });
    },

    durationchange() {
        document.getElementById('total-time').textContent = APP.audio.duration;
    },

    timeupdate() {
        document.getElementById('current-time').textContent = APP.audio.currentTime;
    },

    songTransition() {
        APP.selectColorUpdate();
        APP.load();
        APP.bigImageUpdate();
        APP.startplay();
    },

    // displayDurations() {
    //     songList.forEach((song) => {
    //         let tempAudio = new Audio( `../media/${song}`);
    //         tempAudio.addEventListener('durationchange', (ev) => {
    //             document.getElementById('list-total-time').textContent = APP.audio.duration;
    //         });
    //     });
    // },
}

document.addEventListener('DOMContentLoaded', APP.init);