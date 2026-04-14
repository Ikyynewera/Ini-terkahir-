function showPage(pageId, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
}

// =========================================
// 🎵 PLAYER
// =========================================
let currentAudio = new Audio();
let isPlaying = false;

const miniPlayBtn = document.getElementById('miniPlayBtn');

function playSong(src, title, artist, img) {
    currentAudio.pause();

    currentAudio = new Audio(src);
    currentAudio.play();

    document.getElementById('miniTitle').innerText = title;
    document.getElementById('miniArtist').innerText = artist;
    document.getElementById('miniImg').src = img;

    document.getElementById('miniPlayer').style.display = 'flex';
    miniPlayBtn.innerText = '⏸';

    isPlaying = true;
}

function togglePlay() {
    if (!currentAudio.src) return;

    if (isPlaying) {
        currentAudio.pause();
        miniPlayBtn.innerText = '▶';
    } else {
        currentAudio.play();
        miniPlayBtn.innerText = '⏸';
    }

    isPlaying = !isPlaying;
}

function stopPlayer() {
    currentAudio.pause();
    currentAudio.currentTime = 0;

    document.getElementById('miniPlayer').style.display = 'none';
    miniPlayBtn.innerText = '▶';

    isPlaying = false;
}

// =========================================
// 📊 PROGRESS BAR
// =========================================
setInterval(() => {
    if (currentAudio && isPlaying) {
        let p = (currentAudio.currentTime / currentAudio.duration) * 100;
        if (!isNaN(p)) {
            document.getElementById('progressBar').style.width = p + "%";
        }
    }
}, 300);

// =========================================
// 🎧 DATA LAGU (FIX TOTAL)
// =========================================
const songs = [
    {
        title: "Monokrom",
        artist: "Tulus",
        img: "tulus.jpeg",
        src: "monokrom.mp3"
    },
    {
        title: "Kota Ini Tak Sama tanpamu",
        artist: "Nadhif Basalamah",
        img: "ntf.jpg",
        src: "senyumi.mp3"
    },
    {
        title: "Sesuatu di Jogja",
        artist: "Mitty Zasia",
        img: "biasa.jpeg",
        src: "sesuatu.mp3"
    },
    {
        title: "Seandainya",
        artist: "Vierra",
        img: "viera.jpg",
        src: "ini.mp3"
    },
    {
        title: "Baik Baik Sayang",
        artist: "Wali",
        img: "wali.jpeg",
        src: "yareu.mp3"
    },
    {
        title: "Bukan Cinta Biasa",
        artist: "Dato Sri Siti Nurhaliza",
        img: "bukan.jpg",
        src: "itu.mp3"
    },
    {
        title: "Cinta Terbaik",
        artist: "Casandra",
        img: "hatiku.jpeg",
        src: "no.mp3"
    },
    {
        title: "Surat Cinta Untuk Starla",
        artist: "Virgoun",
        img: "surat.jpeg",
        src: "yes.mp3"
    },
    {
        title: "Pilihan Hatiku",
        artist: "Lavina",
        img: "pilihan.jpeg",
        src: "terlukis.mp3"
    },
    {
        title: "Everything U Are",
        artist: "Baskara",
        img: "ever.jpeg",
        src: "eve.mp3"
    },
    {
        title: "Jikalau Kau Cinta",
        artist: "Judika",
        img: "jikala.jpeg",
        src: "jikalau.mp3"
    },
    {
        title: "Jakarta Hari Ini",
        artist: "For Revenge",
        img: "jakar.jpeg",
        src: "jakarta.mp3"
    },
    {
        title: "Sekarang Hingga Nanti Kita Tua",
        artist: "Dimas M",
        img: "ingat.jpeg",
        src: "ingatkah.mp3"
    },
    {
        title: "pemuja rahasia",
        artist: "seila on 7",
        img: "seila.jpeg",
        src: "pemuja rahasia.mp3"
    },
    {
        title: "nanti kita seperti ini",
        artist: "batas senjas",
        img: "batas.jpeg",
        src: "nanti kita seperti ini.mp3"
    },
    {
        title: "secukupnya",
        artist: "hindia",
        img: "secukupnya.jpeg",
        src: "secukupnya.mp3"
    },
    {
        title: "yang tlah merelakanmu",
        artist: "seventen",
        img: "yang.jpeg",
        src: "yang tlah merelakamu.mp3" 
    },
    {
        title: "cinta sejati",
        artist: "bcl",
        img: "cinta sejati.jpeg",
        src: "cinta sejati.mp3"
    },
    {
        title: "terpikat senyumu",
        artist: "idgitaf",
        img: "terplkat.jpeg", // DI FOTO KAMU NAMANYA 'terplkat.jpeg' (pakai huruf L)
        src: "terpikat.mp3"
    },
    {
        title: "clbk",
        artist: "gak tau",
        img: "clmk.jpeg",
        src: "clmk.mp3"
    }
];

// =========================================
// 🔥 AUTO LOAD MUSIC
// =========================================
function loadMusic() {
    const container = document.getElementById("musicList");
    if (!container) return;

    container.innerHTML = "";

    songs.forEach(s => {
        container.innerHTML += `
        <div class="player-card" onclick="playSong('${s.src}','${s.title}','${s.artist}','${s.img}')">
            <div class="player-content">
                <div class="logo"><img src="${s.img}"></div>
                <div>
                    <div class="song-title">${s.title}</div>
                    <div class="song-artist">${s.artist}</div>
                </div>
            </div>
        </div>`;
    });
}

window.onload = loadMusic;

// =========================================
// 🔍 SEARCH
// =========================================
function searchSong() {
    const input = document.getElementById("searchInput").value.toLowerCase();
    const result = document.getElementById("searchResult");
    const notFound = document.getElementById("notFoundText");

    result.innerHTML = "";

    if (!input) {
        notFound.style.display = "none";
        return;
    }

    const found = songs.filter(s =>
        s.title.toLowerCase().includes(input) ||
        s.artist.toLowerCase().includes(input)
    );

    if (found.length === 0) {
        notFound.style.display = "block";
        return;
    }

    notFound.style.display = "none";

    found.forEach(s => {
        result.innerHTML += `
        <div class="player-card" onclick="playSong('${s.src}','${s.title}','${s.artist}','${s.img}')">
            <div class="player-content">
                <div class="logo"><img src="${s.img}"></div>
                <div>
                    <div class="song-title">${s.title}</div>
                    <div class="song-artist">${s.artist}</div>
                </div>
            </div>
        </div>`;
    });
}
let lastScroll = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScroll) {
        // scroll ke bawah → sembunyi
        navbar.classList.add("hide");
    } else {
        // scroll ke atas → muncul
        navbar.classList.remove("hide");
    }

    lastScroll = currentScroll;
});