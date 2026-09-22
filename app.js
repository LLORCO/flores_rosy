/* Los textos viven en index.html para que aparezcan aunque el JS falle.
   Aquí solo se ajusta lo que anima. */
const CONFIG = {
  girasolesMovil: 7,
  girasolesEscritorio: 11,
  petalosAlAbrir: 20,
  corazonesAlCanjear: 16,
  vibrarAlAbrir: [18, 40, 28],
  mensajeCanjeado: "Ya quedó apuntado 💛 cóbramelo cuando quieras",
};

const intro = document.getElementById("intro");
const gift = document.getElementById("regalo");
const field = document.getElementById("field");
const petals = document.getElementById("petals");
const coupon = document.getElementById("coupon");
const redeemBtn = document.getElementById("redeem");
const redeemStatus = document.getElementById("redeem-status");

const quietMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const rand = (min, max) => min + Math.random() * (max - min);

/* ---------- Girasoles ---------- */

function row(total, { width, bottom, back }) {
  const flowers = [];

  for (let i = 0; i < total; i++) {
    // Reparto uniforme con un poco de desorden, para que no queden en formación.
    const slot = (100 / total) * (i + 0.5);
    flowers.push({
      x: Math.min(94, Math.max(6, slot + rand(-3.5, 3.5))),
      width: rand(...width), // fracción del ancho del campo
      bottom: rand(...bottom), // fracción de la altura del campo
      delay: rand(0, 1.6),
      dur: rand(3.4, 5.6),
      tilt: rand(1.4, 3.4),
      back,
    });
  }

  // Los más grandes al frente: se pintan al final para que queden encima.
  return flowers.sort((a, b) => a.width - b.width);
}

function plantSunflowers() {
  if (field.childElementCount) return;

  const total = window.innerWidth < 480 ? CONFIG.girasolesMovil : CONFIG.girasolesEscritorio;

  const flowers = [
    ...row(total + 2, { width: [0.08, 0.13], bottom: [24, 46], back: true }),
    ...row(total, { width: [0.14, 0.24], bottom: [-6, 3], back: false }),
  ];

  field.innerHTML = flowers
    .map((f) =>
      sunflowerSVG().replace(
        '<svg class="sunflower"',
        `<svg class="sunflower${f.back ? " sunflower--back" : ""}" style="` +
          `--x:${f.x.toFixed(1)}%;--w:${(f.width * 100).toFixed(1)}%;--b:${f.bottom.toFixed(1)}%;` +
          `--delay:${f.delay.toFixed(2)}s;--dur:${f.dur.toFixed(2)}s;--tilt:${f.tilt.toFixed(2)}deg"`
      )
    )
    .join("");
}

/* ---------- Pétalos y corazones ---------- */

function drop(total, kind) {
  if (quietMotion.matches) return;

  for (let i = 0; i < total; i++) {
    const el = document.createElement("div");
    el.className = kind === "heart" ? "petal petal--heart" : "petal";
    if (kind === "heart") el.textContent = Math.random() < 0.5 ? "💛" : "❤️";

    const dur = rand(3.6, 6.4);
    const delay = rand(0, kind === "heart" ? 1 : 2.4);
    el.style.cssText = `--x:${rand(-2, 98).toFixed(1)}%;--size:${rand(9, 16).toFixed(0)}px;` +
      `--dur:${dur.toFixed(2)}s;--delay:${delay.toFixed(2)}s;` +
      `--drift:${rand(-60, 60).toFixed(0)}px;--spin:${rand(-520, 520).toFixed(0)}deg`;

    petals.appendChild(el);
    setTimeout(() => el.remove(), (dur + delay) * 1000 + 200);
  }
}

/* ---------- Navegación entre pantallas ---------- */

let giftReady = false;

function openGift() {
  intro.classList.remove("is-active");
  intro.hidden = true;
  gift.hidden = false;
  gift.classList.add("is-active");

  plantSunflowers();

  if (!giftReady) {
    giftReady = true;
    drop(CONFIG.petalosAlAbrir);
  }
}

function showIntro() {
  gift.classList.remove("is-active");
  gift.hidden = true;
  intro.hidden = false;
  intro.classList.remove("is-leaving");
  intro.classList.add("is-active");
}

function route(firstLoad) {
  if (location.hash !== "#regalo") {
    showIntro();
    return;
  }

  if (firstLoad || quietMotion.matches) {
    openGift();
    return;
  }

  try {
    if (navigator.vibrate) navigator.vibrate(CONFIG.vibrarAlAbrir);
  } catch (_) {
    /* iOS no vibra y no pasa nada */
  }

  intro.classList.add("is-leaving");
  setTimeout(openGift, 450);
}

window.addEventListener("hashchange", () => route(false));

redeemBtn.addEventListener("click", () => {
  coupon.classList.add("is-redeemed");
  redeemBtn.disabled = true;
  redeemBtn.textContent = "Beso apartado";
  redeemStatus.textContent = CONFIG.mensajeCanjeado;
  drop(CONFIG.corazonesAlCanjear, "heart");
});

route(true);
