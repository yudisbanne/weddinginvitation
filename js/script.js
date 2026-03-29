/* =========================
   GLOBAL ELEMENT
========================= */
const musik = document.getElementById("musik");


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


/* =========================
   KOMENTAR SYSTEM
   
========================= */
const btnKirim = document.getElementById('btnKirim');
const listKomentar = document.getElementById('listKomentar');
const countKomentar = document.getElementById('count');
const statusKirim = document.getElementById('statusKirim');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageInfo = document.getElementById('pageInfo');

let komentarData = []; // array komentar
let currentPage = 1;
const perPage = 10; // tiap page maksimal 10 komentar
const scrollLimit = 3; // tampilkan 3 komentar pertama, sisanya scroll

btnKirim.addEventListener('click', () => {
  const nama = document.getElementById('inputNama').value.trim();
  const pesan = document.getElementById('inputPesan').value.trim();
  if(!nama || !pesan) {
    statusKirim.textContent = "Nama dan ucapan tidak boleh kosong!";
    return;
  }

  const waktu = new Date().toLocaleString();
  komentarData.push({nama, pesan, waktu});

  document.getElementById('inputNama').value = '';
  document.getElementById('inputPesan').value = '';
  statusKirim.textContent = "Ucapan terkirim!";
  currentPage = Math.ceil(komentarData.length / perPage); // otomatis ke page terakhir
  renderKomentar();
});

function renderKomentar() {
  const totalPage = Math.ceil(komentarData.length / perPage) || 1;
  pageInfo.textContent = `${currentPage} / ${totalPage}`;

  // ambil data sesuai page
  const start = (currentPage-1) * perPage;
  const end = start + perPage;
  const pageKomentar = komentarData.slice(start, end);

  // bikin list HTML
  listKomentar.innerHTML = '';
  pageKomentar.forEach((k, idx) => {
    const div = document.createElement('div');
    div.classList.add('item-komentar');

    div.innerHTML = `
      <div class="nama-komentar">${k.nama}</div>
      <div class="isi-komentar">${k.pesan}</div>
      <div class="waktu-komentar">${k.waktu}</div>
    `;

    // jika lebih dari scrollLimit, beri scroll
    if(idx >= scrollLimit) {
      div.style.display = 'block';
    }
    listKomentar.appendChild(div);
  });

  // batasi tinggi scroll jika komentar > scrollLimit
  if(pageKomentar.length > scrollLimit) {
    listKomentar.style.maxHeight = '220px';
    listKomentar.style.overflowY = 'auto';
  } else {
    listKomentar.style.maxHeight = 'none';
    listKomentar.style.overflowY = 'visible';
  }

  countKomentar.textContent = komentarData.length;
}

prevBtn.addEventListener('click', () => {
  if(currentPage > 1) { currentPage--; renderKomentar(); }
});
nextBtn.addEventListener('click', () => {
  const totalPage = Math.ceil(komentarData.length / perPage);
  if(currentPage < totalPage) { currentPage++; renderKomentar(); }
});

// render pertama
renderKomentar();