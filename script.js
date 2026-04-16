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
let currentIndex = 0;

const miniPlayBtn = document.getElementById('miniPlayBtn');

// ▶ PLAY LAGU
function playSong(src, title, artist, img, index) {
    // Berhenti dulu kalau ada lagu yang lagi jalan
    currentAudio.pause();

    // Set sumber lagu baru
    currentAudio.src = src;
    currentAudio.load();

    currentAudio.play().then(() => {
        console.log("Play sukses:", src);
        isPlaying = true;
        miniPlayBtn.innerText = '⏸';
    }).catch(err => {
        console.log("Play error:", err);
    });

    currentIndex = index;

    // Update UI Mini Player
    document.getElementById('miniTitle').innerText = title;
    document.getElementById('miniArtist').innerText = artist;
    document.getElementById('miniImg').src = img;

    document.getElementById('miniPlayer').style.display = 'flex';

    // 🔥 FITUR AUTO NEXT
    currentAudio.onended = () => {
        nextSong();
    };
}

// ⏭ NEXT LAGU
function nextSong() {
    currentIndex++;

    // Kalau sudah lagu terakhir, balik ke lagu pertama
    if (currentIndex >= songs.length) {
        currentIndex = 0; 
    }

    const s = songs[currentIndex];
    playSong(s.src, s.title, s.artist, s.img, currentIndex);
}

// ⏮ PREV LAGU
function prevSong() {
    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = songs.length - 1;
    }

    const s = songs[currentIndex];
    playSong(s.src, s.title, s.artist, s.img, currentIndex);
}

// ▶⏸ TOGGLE PLAY/PAUSE
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

// ⏹ STOP
function stopPlayer() {
    currentAudio.pause();
    currentAudio.currentTime = 0;

    document.getElementById('miniPlayer').style.display = 'none';
    miniPlayBtn.innerText = '▶';

    isPlaying = false;
}

// 📊 PROGRESS BAR
setInterval(() => {
    if (currentAudio && !currentAudio.paused) {
        let p = (currentAudio.currentTime / currentAudio.duration) * 100;
        if (!isNaN(p)) {
            document.getElementById('progressBar').style.width = p + "%";
        }
    }
}, 500);

// =========================================
// 🎧 DATA LAGU (FIXED: Added missing comma)
// =========================================
const songs = [
    { title: "Monokrom", artist: "Tulus", img: "tulus.jpeg", src: "monokrom.mp3" },
    { title: "Kota Ini Tak Sama tanpamu", artist: "Nadhif Basalamah", img: "ntf.jpg", src: "senyumi.mp3" },
    { title: "Sesuatu di Jogja", artist: "Mitty Zasia", img: "biasa.jpeg", src: "sesuatu.mp3" },
    { title: "Seandainya", artist: "Vierra", img: "viera.jpg", src: "ini.mp3" },
    { title: "Baik Baik Sayang", artist: "Wali", img: "wali.jpeg", src: "yareu.mp3" },
    { title: "Bukan Cinta Biasa", artist: "Dato Sri Siti Nurhaliza", img: "bukan.jpg", src: "itu.mp3" },
    { title: "Cinta Terbaik", artist: "Casandra", img: "hatiku.jpeg", src: "no.mp3" },
    { title: "Surat Cinta Untuk Starla", artist: "Virgoun", img: "surat.jpeg", src: "yes.mp3" },
    { title: "Pilihan Hatiku", artist: "Lavina", img: "pilihan.jpeg", src: "terlukis.mp3" },
    { title: "Everything U Are", artist: "Baskara", img: "ever.jpeg", src: "eve.mp3" },
    { title: "Jikalau Kau Cinta", artist: "Judika", img: "jikala.jpeg", src: "jikalau.mp3" },
    { title: "Jakarta Hari Ini", artist: "For Revenge", img: "jakar.jpeg", src: "jakarta.mp3" },
    { title: "Sekarang Hingga Nanti Kita Tua", artist: "Dimas M", img: "ingat.jpeg", src: "ingatkah.mp3" },
    { title: "pemuja rahasia", artist: "seila on 7", img: "seila.jpeg", src: "pemuja rahasia.mp3" },
    { title: "nanti kita seperti ini", artist: "batas senjas", img: "batas.jpeg", src: "nanti kita seperti ini.mp3" },
    { title: "secukupnya", artist: "hindia", img: "secukupnya.jpeg", src: "secukupnya.mp3" },
    { title: "yang tlah merelakanmu", artist: "seventen", img: "yang.jpeg", src: "yang tlah merelakamu.mp3"  },
    { title: "cinta sejati", artist: "bcl", img: "cinta sejati.jpeg", src: "cinta sejati.mp3" },
    { title: "terpikat senyumu", artist: "idgitaf", img: "terpikat.jpeg", src: "terpikat.mp3" },
    { title: "clbk", artist: "gak tau", img: "clmk.jpeg", src: "clmk.mp3" }, // <-- Koma di sini tadi hilang
    { title: "taman bunga (lihat kebunku)", artist: "aku jeje", img: "images.jpeg", src: "kebunku.mp3" },
    { title: "kemana ku harus pulang", artist: "dimas m", img: "dimas.jpeg",
    src: "dimas.mp3" },
    { title : "masing masing", artist: "ag and nabila", img: "masing.jpeg", src: "masing.mp3"},
    { title: "mix", artist: "mix", img: "sad.jpeg", src:"sad.mp3"},
    { title:"jaga slalu hatimu", artist :"seventen", img:"seven.jpeg", src:"seven.mp3"}
];

// =========================================
// 🔥 AUTO LOAD MUSIC
// =========================================
function loadMusic() {
    const container = document.getElementById("musicList");
    if (!container) return;

    container.innerHTML = "";

    songs.forEach((s, i) => {
        container.innerHTML += `
        <div class="player-card" onclick="playSong('${s.src}','${s.title}','${s.artist}','${s.img}', ${i})">
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
// 🔍 SEARCH (FIXED FOR AUTO NEXT)
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

    // Filter lagu dan simpan index aslinya agar auto-next jalan
    const found = songs
        .map((song, index) => ({ ...song, originalIndex: index }))
        .filter(s =>
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
        <div class="player-card" onclick="playSong('${s.src}','${s.title}','${s.artist}','${s.img}', ${s.originalIndex})">
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

// =========================================
// 📱 NAVBAR ANIMATION
// =========================================
let lastScroll = 0;
const navbar = document.querySelector("nav");

window.addEventListener("scroll", () => {
    let currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 50) {
        navbar.classList.add("hide");
    } else {
        navbar.classList.remove("hide");
    }

    lastScroll = currentScroll;
});
