/* =========================
   GLOBAL ELEMENT
========================= */
const musik = document.getElementById("musik");


/* =========================
   RESET SAAT LOAD (WAJIB)
========================= */
window.addEventListener("load", () => {

  // disable restore posisi scroll (HP fix)
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // paksa ke atas
  window.scrollTo(0, 0);

  // tampilkan cover
  const cover = document.querySelector(".cover");
  if (cover) cover.classList.remove("hide");

  // lock scroll
  document.body.classList.add("lock-scroll");

});


/* =========================
   BUKA UNDANGAN
========================= */
function bukaUndangan() {
  const halaman2 = document.getElementById("halaman2");
  const cover = document.querySelector(".cover");

  // buka scroll
  document.body.classList.remove("lock-scroll");

  // delay biar tidak lompat
  setTimeout(() => {
    const y = halaman2.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth"
    });
  }, 50);

  // hilangkan cover
  setTimeout(() => {
    if (cover) cover.style.display = "none";
  }, 800);

  // play musik
  const musik = document.getElementById("musik");
  if (musik && musik.paused) {
    musik.play().catch(() => {});
  }
  setTimeout(() => {
  triggerHalaman2Animasi();
  }, 500);
}

/* =========================
   FALLBACK MUSIK (HP)
========================= */
document.addEventListener("click", () => {
  if (musik && musik.paused) {
    musik.play().catch(() => {});
  }
}, { once: true });


/* =========================
   SLIDE HALAMAN 2 (BG)
========================= */
const slides2 = document.querySelectorAll(".bg-slide");
let index2 = 0;

if (slides2.length > 0) {
  setInterval(() => {
    slides2[index2].classList.remove("active");
    index2 = (index2 + 1) % slides2.length;
    slides2[index2].classList.add("active");
  }, 3000);
}

function triggerHalaman2Animasi() {
  const els = document.querySelectorAll(".zoom-out");

  els.forEach(el => {
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
  }, 4000);
}


/* =========================
   SLIDE HALAMAN 4 (JIKA ADA)
========================= */
const slide4 = document.querySelectorAll(".slide4");
let index4 = 0;

if (slide4.length > 0) {
  setInterval(() => {
    slide4[index4].classList.remove("active");
    index4 = (index4 + 1) % slide4.length;
    slide4[index4].classList.add("active");
  }, 4000);
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
   ANIMASI HALAMAN 4 (FIX HP)
========================= */
const fadeEls = document.querySelectorAll(".fade-up");

// observer utama
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.3 });

fadeEls.forEach(el => observer.observe(el));

// fallback scroll (biar 100% jalan di HP)
window.addEventListener("scroll", () => {
  fadeEls.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < window.innerHeight - 50) {
      el.classList.add("show");
    }
  });
});

// komentar
document.addEventListener("DOMContentLoaded", function () {

  const URL = "https://script.google.com/macros/s/AKfycbxhnt3RkxOO2N4enbI0hghpesV79PnKpz6LabHQBtiOoTNwXvlevrkjYcppQNmlmg_l/exec";

  const tombol = document.querySelector(".btn-kirim");
  const listKomentar = document.getElementById("list-komentar");
  const count = document.getElementById("count");

  if (!tombol || !listKomentar || !count) {
    console.error("Elemen komentar tidak ditemukan");
    return;
  }

  function loadKomentar() {
    fetch(URL)
      .then(res => res.json())
      .then(data => {

        listKomentar.innerHTML = "";

        data.reverse().forEach(item => {
          const div = document.createElement("div");
          div.classList.add("item-komentar");

          div.innerHTML = `
            <div class="nama-komentar">${item.nama}</div>
            <div class="isi-komentar">${item.pesan}</div>
          `;

          listKomentar.appendChild(div);
        });

        count.innerText = data.length;
      })
      .catch(err => console.error("Load error:", err));
  }

  tombol.addEventListener("click", function () {

    const inputNama = document.querySelector('input[placeholder="Nama"]');
    const inputPesan = document.querySelector('textarea');

    if (!inputNama || !inputPesan) {
      alert("Form tidak ditemukan");
      return;
    }

    const nama = inputNama.value;
    const pesan = inputPesan.value;

    if (nama === "" || pesan === "") {
      alert("Isi dulu ya 😊");
      return;
    }

const formData = new FormData();
formData.append("nama", nama);
formData.append("pesan", pesan);

fetch(URL, {
  method: "POST",
  body: formData
})
.then(() => {
  alert("Berhasil dikirim 🤍");

  inputNama.value = "";
  inputPesan.value = "";

  loadKomentar();
})
.catch(err => console.error("Post error:", err));

}); // ✅ tutup event klik

loadKomentar();

}); // ✅ tutup DOMContentLoaded