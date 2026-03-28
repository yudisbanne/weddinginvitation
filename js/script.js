window.addEventListener("load", function () {

  // disable restore posisi scroll
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // paksa kembali ke atas
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);

  // munculkan cover lagi
  const cover = document.querySelector(".cover");
  cover.classList.remove("hide");

  // kunci scroll
  document.body.classList.add("lock-scroll");

});
// SLIDE HALAMAN 3 (TANPA ZOOM)
let slide3 = document.querySelectorAll(".slide3");
let indexSlide3 = 0;

setInterval(() => {
  slide3[indexSlide3].classList.remove("active");

  indexSlide3 = (indexSlide3 + 1) % slide3.length;

  slide3[indexSlide3].classList.add("active");
}, 4000);

// =======================
// HALAMAN 2 (SLIDESHOW BG)
// =======================
let slides2 = document.querySelectorAll(".bg-slide");
let index2 = 0;

setInterval(() => {
  slides2[index2].classList.remove("active");

  index2 = (index2 + 1) % slides2.length;

  slides2[index2].classList.add("active");
}, 2000);


let slide4 = document.querySelectorAll(".slide4");
let index4 = 0;

setInterval(() => {
  slide4[index4].classList.remove("active");

  index4 = (index4 + 1) % slide4.length;

  slide4[index4].classList.add("active");
}, 3000);

// =======================
// BUTTON BUKA UNDANGAN
// =======================
function bukaUndangan() {
  // buka scroll
  document.body.classList.remove("lock-scroll");

  // play musik (kalau sudah ada)
  const musik = document.getElementById("musik");
  if (musik) musik.play();

  // scroll ke halaman 2
  document.getElementById("halaman2").scrollIntoView({
    behavior: "smooth"
  });

  // HILANGKAN HALAMAN 1 SETELAH 1 DETIK
  setTimeout(() => {
    document.querySelector(".cover").classList.add("hide");
  }, 800);
}

// =======================
// COUNTDOWN
// =======================
const targetDate = new Date(2027, 6, 26, 10, 0, 0).getTime();

setInterval(function() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  const hari = Math.floor(distance / (1000 * 60 * 60 * 24));
  const jam = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const menit = Math.floor((distance / 1000 / 60) % 60);
  const detik = Math.floor((distance / 1000) % 60);

  document.getElementById("hari").innerText = hari;
  document.getElementById("jam").innerText = jam;
  document.getElementById("menit").innerText = menit;
  document.getElementById("detik").innerText = detik;
}, 1000);


// =======================
// NAMA TAMU DARI URL
// =======================
const params = new URLSearchParams(window.location.search);
const nama = params.get("to");

if (nama) {
  document.getElementById("namaTamu").innerText = nama.replace(/\+/g, " ");
}

// scrool
document.addEventListener("DOMContentLoaded", function() {
  document.body.classList.add("lock-scroll");
});