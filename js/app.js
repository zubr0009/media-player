import songList from "./data.js";
const APP = {
    audio: new Audio(),
    currentTrack: 0,
    tracks: [songList[0].track, songList[1].track, songList[2].track, songList[3].track, songList[4].track, songList[5].track, songList[6].track],
    init() {
        APP.loadPlaylist();
        APP.addDOMListeners();
        APP.addAudioListeners();
    },

    addDOMListeners() {
        document.getElementById('btnload').addEventListener('click', APP.load);
        document.getElementById('btnplay').addEventListener('click', APP.startplay);
        document.getElementById('btnpause').addEventListener('click', APP.pauseplay);
        const playlist = document.getElementById('playlist');
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
        playlist.innerHTML = songList.map(song => {
                return `<li class="song"> <!--song-->
                <div class="song-img">
                <img src="${song.thumbnail}" alt=""> <!--song thumbnail-->
                </div>
                <div class="song-details"> <!--song details-->
                <p class="song-title">${song.title}</p>
                <p class="song-artist">${song.artist}</p>
                </div>
                <div class="song-time"> <!--song time-->
                <time>0:00</time>
                </div>
                </li>`
        }).join(' ');
        const bigImage = document.getElementById('song-img');
        bigImage.src=`${songList[APP.currentTrack].large}`;
        const trackIndicator = document.querySelector('.playlist li');
        songList.map(() => {
            if (songList[APP.currentTrack]) {
                trackIndicator.classList.add('current-track');
            }
        }).join(' ');
    },

    // loadLargePic() {
    // },

    load(andPlay = false) {
        APP.audio.src = `./media/${APP.tracks[APP.currentTrack]}`;
        console.log('Audio has been loaded');
        andPlay && !(andPlay instanceof Event) && APP.startplay();
    },

    startplay() {
        if (APP.audio.src) {
            APP.audio.play();
        } else {
            console.warn('You need to load a track first');
        }
    },

    pauseplay() {
        if (APP.audio && APP.audio.pause());
    },

    durationchange() {
        document.getElementById('total-time').textContent = APP.audio.duration;
    },

    timeupdate() {
        document.getElementById('current-time').textContent = APP.audio.currentTime;
    },
};

document.addEventListener('DOMContentLoaded', APP.init);