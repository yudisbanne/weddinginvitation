/* =========================
   GLOBAL ELEMENT
========================= */
const musik = document.getElementById("musik");
// pemanggilan link ucapan
const API_URL = "https://script.google.com/macros/s/AKfycbzJsHO_VlUhzt-gipYnzcu_X3J3cVXNRpl1ofGNHECFuhUgaPRiwSnb9tAoZD9Pf0U3/exec";
// end pemanggilan

/* =========================
   RESET SAAT LOAD
========================= */
window.addEventListener("load", () => {
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  window.scrollTo(0, 0);

  const cover = document.querySelector(".cover");
  if (cover) cover.classList.remove("hide");

  document.body.classList.add("lock-scroll");
});


/* =========================
   BUKA UNDANGAN
========================= */
function bukaUndangan() {
  const halaman2 = document.getElementById("halaman2");
  const cover = document.querySelector(".cover");

  document.body.classList.remove("lock-scroll");

  setTimeout(() => {
    const y = halaman2.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, 50);

  setTimeout(() => {
    if (cover) cover.style.display = "none";
  }, 800);

  if (musik && musik.paused) {
    musik.play().catch(() => {});
  }

  setTimeout(() => {
    triggerHalaman2Animasi();
  }, 500);
}


/* =========================
   FALLBACK MUSIK
========================= */
document.addEventListener("click", () => {
  if (musik && musik.paused) {
    musik.play().catch(() => {});
  }
}, { once: true });


/* =========================
   SLIDE HALAMAN 2
========================= */
const slides2 = document.querySelectorAll(".bg-slide");
let index2 = 0;

if (slides2.length > 0) {
  setInterval(() => {
    slides2[index2].classList.remove("active");
    index2 = (index2 + 1) % slides2.length;
    slides2[index2].classList.add("active");
  }, 2000);
}

function triggerHalaman2Animasi() {
  document.querySelectorAll(".zoom-out").forEach(el => {
    el.classList.add("show");
  });
}


/* =========================
   SLIDE HALAMAN 3
========================= */
const slide3 = document.querySelectorAll(".slide3");
let index3 = 0;

if (slide3.length > 0) {
  setInterval(() => {
    slide3[index3].classList.remove("active");
    index3 = (index3 + 1) % slide3.length;
    slide3[index3].classList.add("active");
  }, 3000);
}


/* =========================
   SLIDE HALAMAN 4
========================= */
const slide4 = document.querySelectorAll(".slide4");
let index4 = 0;

if (slide4.length > 0) {
  setInterval(() => {
    slide4[index4].classList.remove("active");
    index4 = (index4 + 1) % slide4.length;
    slide4[index4].classList.add("active");
  }, 800);
}


/* =========================
   COUNTDOWN
========================= */
const targetDate = new Date(2027, 6, 26, 10, 0, 0).getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) return;

  document.getElementById("hari").innerText =
    Math.floor(distance / (1000 * 60 * 60 * 24));

  document.getElementById("jam").innerText =
    Math.floor((distance / (1000 * 60 * 60)) % 24);

  document.getElementById("menit").innerText =
    Math.floor((distance / 1000 / 60) % 60);

  document.getElementById("detik").innerText =
    Math.floor((distance / 1000) % 60);
}, 1000);


/* =========================
   NAMA TAMU DARI URL
========================= */
const params = new URLSearchParams(window.location.search);
const nama = params.get("to");

if (nama) {
  const el = document.getElementById("namaTamu");
  if (el) el.innerText = nama.replace(/\+/g, " ");
}


/* =========================
   ANIMASI SCROLL
========================= */
const fadeEls = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.3 });

fadeEls.forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  fadeEls.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 50) {
      el.classList.add("show");
    }
  });
});
// halaman 3
// animasi teks
const elements = document.querySelectorAll('.scroll-animate');

function checkScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach(el => {
    const boxTop = el.getBoundingClientRect().top;

    if (boxTop < triggerBottom) {
      el.classList.add('show');
    }
  });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Animasi slide gambar halaman3
let index = 0;
const slides = document.querySelectorAll('.cinematic-slider img');

setInterval(() => {
  slides[index].classList.remove('active');

  index = (index + 1) % slides.length;

  slides[index].classList.add('active');
}, 4400); 


/* =========================
   KOMENTAR SYSTEM
   
========================= */
function formatWaktuRelative(date) {
  const now = new Date();
  const selisih = now - date;

  const detik = Math.floor(selisih / 1000);
  const menit = Math.floor(detik / 60);
  const jam = Math.floor(menit / 60);
  const hari = Math.floor(jam / 24);
  const bulan = Math.floor(hari / 30);
  const tahun = Math.floor(bulan / 12);

  if (tahun > 0) return `${tahun} year${tahun > 1 ? 's' : ''} ago`;

  if (bulan > 0) {
    const sisaHari = hari % 30;
    return `${bulan} month${bulan > 1 ? 's' : ''}${sisaHari > 0 ? ' ' + sisaHari + ' day' + (sisaHari > 1 ? 's' : '') : ''} ago`;
  }

  if (hari > 0) return `${hari} day${hari > 1 ? 's' : ''} ago`;
  if (jam > 0) return `${jam} hour${jam > 1 ? 's' : ''} ago`;
  if (menit > 0) return `${menit} minute${menit > 1 ? 's' : ''} ago`;

  return `just now`;
}

// ambil element
const btnKirim = document.getElementById('btnKirim');
const listKomentar = document.getElementById('listKomentar');
const countKomentar = document.getElementById('count');
const statusKirim = document.getElementById('statusKirim');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageInfo = document.getElementById('pageInfo');

let komentarData = [];
let currentPage = 1;
const perPage = 10;

// 🔥 JANGAN JALANKAN JIKA ELEMENT TIDAK ADA
if (listKomentar) {

 function renderKomentar() {
  listKomentar.innerHTML = '';

  const totalPage = Math.ceil(komentarData.length / perPage) || 1;
  pageInfo.textContent = `${currentPage} / ${totalPage}`;

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageKomentar = komentarData.slice(start, end);

  pageKomentar.forEach((k) => {
    const div = document.createElement('div');
    div.classList.add('item-komentar');

    div.innerHTML = `
      <div class="nama-komentar"><b>${k.nama}</b></div>
      <div class="isi-komentar">${k.pesan}</div>
      <div class="waktu-komentar">${formatWaktuRelative(new Date(k.waktu))}</div>
    `;

    listKomentar.appendChild(div);
  });

  // 🔥 KUNCI UTAMA DI SINI
  if (pageKomentar.length > 2) {
    listKomentar.style.maxHeight = '140px'; // kira2 tinggi 2 komentar
    listKomentar.style.overflowY = 'auto';
  } else {
    listKomentar.style.maxHeight = 'none';
    listKomentar.style.overflowY = 'visible';

    listKomentar.classList.remove('scroll-active');
  }

  countKomentar.textContent = komentarData.length;
}

  function loadKomentar() {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        komentarData = data.reverse();
        renderKomentar();
      })
      .catch(() => console.log("Gagal load komentar"));
  }

  // tombol kirim
  if (btnKirim) {
    btnKirim.addEventListener('click', () => {
      const nama = document.getElementById('inputNama').value.trim();
      const pesan = document.getElementById('inputPesan').value.trim();

      if (!nama || !pesan) {
        statusKirim.textContent = "Nama dan ucapan tidak boleh kosong!";
        return;
      }

      statusKirim.textContent = "Sending...";
      statusKirim.className = "status-kirim sending";

      fetch(API_URL, {
        method: "POST",
        body: JSON.stringify({ nama, pesan })
      })
      .then(() => {
        statusKirim.textContent = "Thanks for your comment!";
        statusKirim.className = "status-kirim success";

        document.getElementById('inputNama').value = '';
        document.getElementById('inputPesan').value = '';

        loadKomentar();
      })
      .catch(() => {
        statusKirim.textContent = "Gagal kirim!";
      });
    });
  }

  // pagination
  if (prevBtn) {
    prevBtn.onclick = () => {
      if (currentPage > 1) {
        currentPage--;
        renderKomentar();
      }
    };
  }

  if (nextBtn) {
    nextBtn.onclick = () => {
      const totalPage = Math.ceil(komentarData.length / perPage);
      if (currentPage < totalPage) {
        currentPage++;
        renderKomentar();
      }
    };
  }

  loadKomentar();
  setInterval(loadKomentar, 5000);
}