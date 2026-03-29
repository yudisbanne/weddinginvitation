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
document.addEventListener("DOMContentLoaded", function () {
  const statusKirim = document.getElementById("status-kirim");
  let currentPage = 1;
const perPage = 10;
let allData = [];

  const URL = "https://script.google.com/macros/s/AKfycbxhnt3RkxOO2N4enbI0hghpesV79PnKpz6LabHQBtiOoTNwXvlevrkjYcppQNmlmg_l/exec";

  const tombol = document.querySelector(".btn-kirim");
  const listKomentar = document.getElementById("list-komentar");
  const count = document.getElementById("count");

  if (!tombol || !listKomentar || !count) {
    console.error("Elemen komentar tidak ditemukan");
    return;
  }

  /* =========================
     FORMAT WAKTU
  ========================= */
  function formatWaktu(waktu) {
    const now = new Date();
    const past = new Date(waktu);
    const diff = (now - past) / 1000;

    if (diff < 60) return "Baru saja";
    if (diff < 3600) return Math.floor(diff / 60) + " menit lalu";
    if (diff < 86400) return Math.floor(diff / 3600) + " jam lalu";
    if (diff < 604800) return Math.floor(diff / 86400) + " hari lalu";
    if (diff < 2592000) return Math.floor(diff / 604800) + " minggu lalu";
    if (diff < 31536000) return Math.floor(diff / 2592000) + " bulan lalu";

    return Math.floor(diff / 31536000) + " tahun lalu";
  }

  /* =========================
     LOAD KOMENTAR
  ========================= */
  function loadKomentar() {
  fetch(URL)
    .then(res => res.json())
    .then(data => {

      allData = data.reverse();
      renderKomentar();

      count.innerText = allData.length;
    });
}
function renderKomentar() {
  listKomentar.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  const pageData = allData.slice(start, end);

  pageData.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("item-komentar");

    const waktu = formatWaktu(item.waktu);

    div.innerHTML = `
      <div class="nama-komentar"><strong>${item.nama}</strong></div>
      <div class="isi-komentar">${item.pesan}</div>
      <div class="waktu-komentar">🕒 ${waktu}</div>
    `;

    listKomentar.appendChild(div);
  });

  document.getElementById("page-info").innerText = currentPage;
}
document.getElementById("next").addEventListener("click", () => {
  if (currentPage * perPage < allData.length) {
    currentPage++;
    renderKomentar();
  }
});

document.getElementById("prev").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderKomentar();
  }
});
  /* =========================
     KIRIM KOMENTAR
  ========================= */
tombol.addEventListener("click", function () {

  const inputNama = document.querySelector('input[placeholder="Nama"]');
  const inputPesan = document.querySelector('textarea');

  if (!inputNama || !inputPesan) {
    alert("Form tidak ditemukan");
    return;
  }

  const nama = inputNama.value.trim();
  const pesan = inputPesan.value.trim();

  if (nama === "" || pesan === "") {
    alert("Isi dulu ya 😊");
    return;
  }

  const formData = new FormData();
  formData.append("nama", nama);
  formData.append("pesan", pesan);

  // 🔥 tampilkan loading dulu
  statusKirim.innerHTML = '<span class="loading">Mengirim</span>';

  fetch(URL, {
    method: "POST",
    body: formData
  })
  .then(() => {

    statusKirim.innerHTML = '<span class="success">Thanks for your comment! 🤍</span>';

    inputNama.value = "";
    inputPesan.value = "";

    loadKomentar();

    setTimeout(() => {
      statusKirim.innerHTML = "";
    }, 3000);

  })
  .catch(err => {
    console.error("Post error:", err);
    statusKirim.innerHTML = '<span style="color:red;">Gagal mengirim</span>';
  });

});

  loadKomentar();

});