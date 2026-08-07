const audio = document.getElementById("audio");

const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("current");
const totalTime = document.getElementById("total");

const volumeNumber =
    document.getElementById("volumeNumber");

const songTitle =
    document.getElementById("songTitle");

const songArtist =
    document.getElementById("songArtist");

const songButtons =
    document.querySelectorAll(".song");


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


let currentSong = 0;


/* ================= SÜRE ================= */

function formatTime(seconds) {

    if (!isFinite(seconds)) {

        return "0:00";

    }

    const minutes =
        Math.floor(seconds / 60);

    const secondsLeft =
        Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return minutes + ":" + secondsLeft;

}


/* ================= ŞARKI YÜKLE ================= */

function loadSong(index) {

    currentSong = index;

    const song = songs[index];

    audio.src = song.file;

    songTitle.textContent =
        song.title;

    songArtist.textContent =
        song.artist;


    songButtons.forEach(button => {

        button.classList.remove("active");

    });


    songButtons[index]
        .classList.add("active");


    progress.value = 0;

    currentTime.textContent =
        "0:00";

    totalTime.textContent =
        "0:00";

}


/* ================= OYNAT ================= */

function playSong() {

    audio.play()

        .then(() => {

            playButton.textContent = "Ⅱ";

        })

        .catch(error => {

            console.error(
                "Şarkı oynatılamadı:",
                error
            );

        });

}


/* ================= DURDUR ================= */

function pauseSong() {

    audio.pause();

    playButton.textContent = "▶";

}


/* ================= PLAY BUTTON ================= */

playButton.addEventListener(
    "click",
    () => {

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


/* ================= NEXT ================= */

nextButton.addEventListener(
    "click",
    () => {

        currentSong++;

        if (
            currentSong >=
            songs.length
        ) {

            currentSong = 0;

        }

        loadSong(currentSong);

        playSong();

    }
);


/* ================= PREVIOUS ================= */

prevButton.addEventListener(
    "click",
    () => {

        currentSong--;

        if (currentSong < 0) {

            currentSong =
                songs.length - 1;

        }

        loadSong(currentSong);

        playSong();

    }
);


/* ================= ŞARKI LİSTESİ ================= */

songButtons.forEach(
    (button, index) => {

        button.addEventListener(
            "click",
            () => {

                loadSong(index);

                playSong();

            }
        );

    }
);


/* ================= SÜRE ================= */

audio.addEventListener(
    "loadedmetadata",
    () => {

        totalTime.textContent =
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

        const percent =
            (
                audio.currentTime /
                audio.duration
            ) * 100;


        progress.value = percent;


        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


/* ================= PROGRESS BAR ================= */

progress.addEventListener(
    "input",
    () => {

        if (!audio.duration) {

            return;

        }

        audio.currentTime =
            (
                progress.value / 100
            ) * audio.duration;

    }
);


/* ================= SES ================= */

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            Number(volume.value);


        volumeNumber.textContent =
            Math.round(
                volume.value * 100
            ) + "%";

    }
);


/* ================= ŞARKI BİTİNCE ================= */

audio.addEventListener(
    "ended",
    () => {

        currentSong++;

        if (
            currentSong >=
            songs.length
        ) {

            currentSong = 0;

        }

        loadSong(currentSong);

        playSong();

    }
);


/* ================= BAŞLANGIÇ ================= */

audio.volume = 0.8;

loadSong(0);
