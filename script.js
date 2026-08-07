const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volumeText = document.getElementById("volumeText");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");

const player = document.querySelector(".player");
const tracks = document.querySelectorAll(".track");


/* ================= ŞARKILAR ================= */

const songs = [

    {
        title: "CLTR TRACK 01",
        artist: "CLTR COMMUNITY",
        file: "music/track1.mp3"
    },

    {
        title: "CLTR TRACK 02",
        artist: "CLTR COMMUNITY",
        file: "music/track2.mp3"
    },

    {
        title: "CLTR TRACK 03",
        artist: "CLTR COMMUNITY",
        file: "music/track3.mp3"
    }

];


let currentIndex = 0;


/* ================= ZAMAN ================= */

function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes =
        Math.floor(seconds / 60);

    const secs =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${secs}`;

}


/* ================= ŞARKI YÜKLE ================= */

function loadSong(index) {

    currentIndex = index;

    const song = songs[currentIndex];

    audio.src = song.file;

    songTitle.textContent =
        song.title;

    songArtist.textContent =
        song.artist;

    progress.value = 0;

    currentTime.textContent =
        "0:00";

    duration.textContent =
        "0:00";


    tracks.forEach(track => {

        track.classList.remove("active");

    });


    const selectedTrack =
        document.querySelector(
            `.track[data-index="${currentIndex}"]`
        );


    if (selectedTrack) {

        selectedTrack.classList.add("active");

    }

}


/* ================= PLAY ================= */

function togglePlay() {

    if (audio.paused) {

        audio.play()
            .then(() => {

                player.classList.add("playing");

                playBtn.textContent = "Ⅱ";

            })
            .catch(error => {

                console.error(
                    "Şarkı oynatılamadı:",
                    error
                );

            });

    } else {

        audio.pause();

        player.classList.remove("playing");

        playBtn.textContent = "▶";

    }

}


/* ================= NEXT ================= */

function nextSong() {

    currentIndex++;

    if (currentIndex >= songs.length) {

        currentIndex = 0;

    }

    loadSong(currentIndex);

    audio.play()
        .then(() => {

            player.classList.add("playing");

            playBtn.textContent = "Ⅱ";

        })
        .catch(error => {

            console.error(error);

        });

}


/* ================= PREVIOUS ================= */

function previousSong() {

    currentIndex--;

    if (currentIndex < 0) {

        currentIndex =
            songs.length - 1;

    }

    loadSong(currentIndex);

    audio.play()
        .then(() => {

            player.classList.add("playing");

            playBtn.textContent = "Ⅱ";

        })
        .catch(error => {

            console.error(error);

        });

}


/* ================= BUTONLAR ================= */

playBtn.addEventListener(
    "click",
    togglePlay
);

nextBtn.addEventListener(
    "click",
    nextSong
);

prevBtn.addEventListener(
    "click",
    previousSong
);


/* ================= TRACKLER ================= */

tracks.forEach(track => {

    track.addEventListener(
        "click",
        () => {

            const index =
                Number(track.dataset.index);

            loadSong(index);

            audio.play()
                .then(() => {

                    player.classList.add("playing");

                    playBtn.textContent = "Ⅱ";

                })
                .catch(error => {

                    console.error(
                        "Şarkı oynatılamadı:",
                        error
                    );

                });

        }
    );

});


/* ================= METADATA ================= */

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(audio.duration);

    }
);


/* ================= İLERLEME ================= */

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {
            return;
        }

        const percentage =
            (audio.currentTime /
            audio.duration) * 100;

        progress.value =
            percentage;

        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


/* ================= PROGRESS ================= */

progress.addEventListener(
    "input",
    () => {

        if (!audio.duration) {
            return;
        }

        audio.currentTime =
            (progress.value / 100) *
            audio.duration;

    }
);


/* ================= SES ================= */

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            volume.value;

        volumeText.textContent =
            Math.round(
                volume.value * 100
            ) + "%";

    }
);


/* ================= ŞARKI BİTİNCE ================= */

audio.addEventListener(
    "ended",
    () => {

        nextSong();

    }
);


/* ================= PLAY STATE ================= */

audio.addEventListener(
    "play",
    () => {

        player.classList.add("playing");

        playBtn.textContent = "Ⅱ";

    }
);


audio.addEventListener(
    "pause",
    () => {

        player.classList.remove("playing");

        playBtn.textContent = "▶";

    }
);


/* ================= BAŞLANGIÇ ================= */

audio.volume = 0.8;

loadSong(0);
