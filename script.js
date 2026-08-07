/* =====================================================
   CLTR PLAYER
===================================================== */


/* =====================================================
   ŞARKILAR
===================================================== */

const tracks = [

    {
        title: "CLTR TRACK 01",
        artist: "CLTR COMMUNITY",
        src: "music/track01.mp3"
    },

    {
        title: "CLTR TRACK 02",
        artist: "CLTR COMMUNITY",
        src: "music/track02.mp3"
    },

    {
        title: "CLTR TRACK 03",
        artist: "CLTR COMMUNITY",
        src: "music/track03.mp3"
    }

];



/* =====================================================
   ELEMENTLER
===================================================== */

const audio =
    document.getElementById("audio");

const playBtn =
    document.getElementById("playBtn");

const prevBtn =
    document.getElementById("prevBtn");

const nextBtn =
    document.getElementById("nextBtn");

const progress =
    document.getElementById("progress");

const volume =
    document.getElementById("volume");

const currentTime =
    document.getElementById("currentTime");

const duration =
    document.getElementById("duration");

const volumeText =
    document.getElementById("volumeText");

const songTitle =
    document.getElementById("songTitle");

const songArtist =
    document.getElementById("songArtist");

const trackButtons =
    document.querySelectorAll(".track");



/* =====================================================
   DEĞİŞKENLER
===================================================== */

let currentTrack = 0;



/* =====================================================
   ŞARKI YÜKLE
===================================================== */

function loadTrack(index) {

    currentTrack = index;

    const track =
        tracks[currentTrack];


    audio.src =
        track.src;


    songTitle.textContent =
        track.title;


    songArtist.textContent =
        track.artist;


    currentTime.textContent =
        "0:00";


    duration.textContent =
        "0:00";


    progress.value =
        0;


    trackButtons.forEach(
        (button, buttonIndex) => {

            button.classList.toggle(
                "active",
                buttonIndex === currentTrack
            );

        }
    );

}



/* =====================================================
   PLAY
===================================================== */

function playTrack() {

    audio.play()
        .then(() => {

            playBtn.textContent =
                "Ⅱ";

        })
        .catch(error => {

            console.error(
                "Şarkı oynatılamadı:",
                error
            );

        });

}



/* =====================================================
   PAUSE
===================================================== */

function pauseTrack() {

    audio.pause();

    playBtn.textContent =
        "▶";

}



/* =====================================================
   PLAY / PAUSE
===================================================== */

function togglePlay() {

    if (audio.paused) {

        playTrack();

    } else {

        pauseTrack();

    }

}



/* =====================================================
   SONRAKİ
===================================================== */

function nextTrack() {

    currentTrack++;

    if (
        currentTrack >=
        tracks.length
    ) {

        currentTrack = 0;

    }


    loadTrack(
        currentTrack
    );


    playTrack();

}



/* =====================================================
   ÖNCEKİ
===================================================== */

function previousTrack() {

    currentTrack--;

    if (
        currentTrack < 0
    ) {

        currentTrack =
            tracks.length - 1;

    }


    loadTrack(
        currentTrack
    );


    playTrack();

}



/* =====================================================
   ZAMAN FORMAT
===================================================== */

function formatTime(seconds) {

    if (
        !Number.isFinite(seconds)
    ) {

        return "0:00";

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        Math.floor(
            seconds % 60
        )
        .toString()
        .padStart(2, "0");


    return `${minutes}:${secs}`;

}



/* =====================================================
   PLAY BUTTON
===================================================== */

playBtn.addEventListener(
    "click",
    togglePlay
);



/* =====================================================
   NEXT BUTTON
===================================================== */

nextBtn.addEventListener(
    "click",
    nextTrack
);



/* =====================================================
   PREVIOUS BUTTON
===================================================== */

prevBtn.addEventListener(
    "click",
    previousTrack
);



/* =====================================================
   METADATA
===================================================== */

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(
                audio.duration
            );

    }
);



/* =====================================================
   ZAMAN İLERLEMESİ
===================================================== */

audio.addEventListener(
    "timeupdate",
    () => {

        if (
            !audio.duration
        ) {

            return;

        }


        const percentage =
            (
                audio.currentTime /
                audio.duration
            ) * 100;


        progress.value =
            percentage;


        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);



/* =====================================================
   PROGRESS DEĞİŞTİR
===================================================== */

progress.addEventListener(
    "input",
    () => {

        if (
            !audio.duration
        ) {

            return;

        }


        audio.currentTime =
            (
                progress.value / 100
            ) *
            audio.duration;

    }
);



/* =====================================================
   SES
===================================================== */

audio.volume =
    0.8;


volume.addEventListener(
    "input",
    () => {

        audio.volume =
            Number(
                volume.value
            );


        volumeText.textContent =
            Math.round(
                volume.value * 100
            ) + "%";

    }
);



/* =====================================================
   TRACK LIST
===================================================== */

trackButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        button.dataset.index
                    );


                loadTrack(index);

                playTrack();

            }
        );

    }
);



/* =====================================================
   ŞARKI BİTİNCE
===================================================== */

audio.addEventListener(
    "ended",
    () => {

        nextTrack();

    }
);



/* =====================================================
   PLAY / PAUSE DURUMU
===================================================== */

audio.addEventListener(
    "play",
    () => {

        playBtn.textContent =
            "Ⅱ";

    }
);


audio.addEventListener(
    "pause",
    () => {

        playBtn.textContent =
            "▶";

    }
);



/* =====================================================
   İLK ŞARKI
===================================================== */

loadTrack(0);
