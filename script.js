// Tu número en formato internacional sin "+" ni espacios, ej. "573001234567". Vacío: WhatsApp deja elegir a quién enviarlo.
const WHATSAPP = "";
const MENSAJE = "Sí vamos. Aún tengo espacio para ti.";

const $ = (s) => document.querySelector(s);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const touch = matchMedia("(pointer: coarse)").matches;

const screens = { splash: $("#splash"), scene: $("#scene"), pregunta: $("#pregunta") };
let current = "splash";

function show(name) {
  for (const [key, el] of Object.entries(screens)) el.hidden = key !== name;
  current = name;
}

const rand = (a, b) => a + Math.random() * (b - a);

function shuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function makeStars(box, count, maxTop) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("i");
    const size = Math.random() < 0.25 ? 3 : 2;
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * maxTop + "%";
    star.style.width = star.style.height = size + "px";
    box.appendChild(star);
  }
}

// Pizza en píxeles

const PIZZA = [
  [2, 2, 13, "#f2e3b3"],
  [3, 2, 13, "#f2e3b3"],
  [4, 3, 12, "#ffdf00"],
  [5, 3, 12, "#ffdf00"],
  [6, 4, 11, "#ffdf00"],
  [7, 4, 11, "#ffdf00"],
  [8, 5, 10, "#ffdf00"],
  [9, 5, 10, "#ffdf00"],
  [10, 6, 9, "#ffdf00"],
  [11, 6, 9, "#ffdf00"],
  [12, 7, 8, "#ffdf00"],
  [13, 7, 8, "#ffdf00"],
];
const PIZZA_DOTS = [[5, 4], [9, 6], [6, 8]];

function pizzaSVG() {
  const rows = PIZZA.map(([y, x0, x1, c]) =>
    `<rect x="${x0}" y="${y}" width="${x1 - x0 + 1}" height="1" fill="${c}"/>`).join("");
  const dots = PIZZA_DOTS.map(([x, y]) =>
    `<rect x="${x}" y="${y}" width="2" height="2" fill="#006b28"/>`).join("");
  return `<svg viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">${rows}${dots}</svg>`;
}

// Referencias flotantes de fondo

const COPA = `<svg viewBox="0 0 64 90" shape-rendering="crispEdges" aria-hidden="true">
  <polygon points="34,2 40,2 32,52 26,52" fill="#ffdf00"/>
  <polygon points="12,34 52,34 49,82 15,82" fill="#a8e05f"/>
  <rect x="20" y="42" width="11" height="11" fill="#fffbe8" opacity=".85"/>
  <rect x="34" y="52" width="11" height="11" fill="#fffbe8" opacity=".85"/>
  <rect x="22" y="64" width="11" height="11" fill="#fffbe8" opacity=".85"/>
  <polygon points="10,24 54,24 50,84 14,84" fill="none" stroke="#fffbe8" stroke-width="3"/>
  <path d="M42 24 A12 12 0 0 1 66 24Z" fill="#009c3b" stroke="#fffbe8" stroke-width="2"/>
</svg>`;

const PALMA = `<svg viewBox="0 0 100 140" shape-rendering="crispEdges" aria-hidden="true">
  <polygon points="48,140 58,140 60,58 52,58" fill="#006b28"/>
  <path d="M55 58 Q22 28 2 52 Q30 42 55 58Z" fill="#009c3b"/>
  <path d="M55 58 Q18 52 6 84 Q34 62 55 58Z" fill="#006b28"/>
  <path d="M55 58 Q88 28 98 54 Q76 42 55 58Z" fill="#009c3b"/>
  <path d="M55 58 Q92 52 96 86 Q72 62 55 58Z" fill="#006b28"/>
  <path d="M55 58 Q44 22 62 6 Q64 34 55 58Z" fill="#009c3b"/>
</svg>`;

const LLANTA = `<svg viewBox="0 0 22 22" shape-rendering="crispEdges" aria-hidden="true">
  <circle cx="11" cy="11" r="10.5" fill="#0b0f1a" stroke="#fffbe8" stroke-width="1"/>
  <circle cx="11" cy="11" r="4" fill="#fffbe8"/>
  <rect x="10" y="2" width="2" height="18" fill="#fffbe8"/>
</svg>`;

const BALON = `<svg viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true">
  <circle cx="16" cy="16" r="14.5" fill="#fffbe8" stroke="#002776" stroke-width="1.5"/>
  <polygon points="16,9 22,13 20,21 12,21 10,13" fill="#002776"/>
  <path d="M16 9V3M22 13l6-3M20 21l4 6M12 21l-4 6M10 13l-6-3" stroke="#002776" stroke-width="1.5"/>
</svg>`;

const SOMBRILLA = `<svg viewBox="0 0 64 64" shape-rendering="crispEdges" aria-hidden="true">
  <path d="M32 34 L4 34 A28 28 0 0 1 12.2 14.2 Z" fill="#ffdf00"/>
  <path d="M32 34 L12.2 14.2 A28 28 0 0 1 32 6 Z" fill="#fffbe8"/>
  <path d="M32 34 L32 6 A28 28 0 0 1 51.8 14.2 Z" fill="#ffdf00"/>
  <path d="M32 34 L51.8 14.2 A28 28 0 0 1 60 34 Z" fill="#fffbe8"/>
  <rect x="30.5" y="34" width="3" height="26" fill="#fffbe8"/>
  <rect x="24" y="60" width="16" height="3" fill="#fffbe8"/>
</svg>`;

const OLA = `<svg viewBox="0 0 64 32" shape-rendering="crispEdges" aria-hidden="true">
  <path d="M0 12 Q8 0 16 12 T32 12 T48 12 T64 12" fill="none" stroke="#fffbe8" stroke-width="3"/>
  <path d="M0 24 Q8 12 16 24 T32 24 T48 24 T64 24" fill="none" stroke="#5b8cff" stroke-width="3"/>
</svg>`;

const ESTRELLA = `<svg viewBox="0 0 32 32" shape-rendering="crispEdges" aria-hidden="true">
  <polygon points="16,2 20,12 30,12 22,19 25,29 16,23 7,29 10,19 2,12 12,12" fill="#ffdf00"/>
  <rect x="15" y="9" width="2" height="2" fill="#fffbe8"/>
  <rect x="9" y="14" width="2" height="2" fill="#fffbe8"/>
  <rect x="21" y="14" width="2" height="2" fill="#fffbe8"/>
  <rect x="12" y="21" width="2" height="2" fill="#fffbe8"/>
  <rect x="18" y="21" width="2" height="2" fill="#fffbe8"/>
</svg>`;

const SELLOS = { "PLAYA": ["sello-a", "-8deg"], "SOL Y MAR": ["sello-b", "6deg"] };

function makeFloater(kind) {
  const el = document.createElement("span");
  el.className = "flota";
  if (SELLOS[kind]) {
    const stamp = document.createElement("span");
    stamp.className = "sello " + SELLOS[kind][0];
    stamp.textContent = kind;
    el.style.rotate = SELLOS[kind][1];
    el.appendChild(stamp);
    return el;
  }
  const art = {
    copa: [COPA, 40, 56],
    palma: [PALMA, 56, 76],
    llanta: [LLANTA, 28, 40],
    pizza: [pizzaSVG(), 30, 46],
    balon: [BALON, 28, 38],
    sombrilla: [SOMBRILLA, 44, 60],
    ola: [OLA, 50, 70],
    estrella: [ESTRELLA, 28, 38],
  }[kind];
  el.innerHTML = art[0];
  el.style.width = rand(art[1], art[2]) + "px";
  return el;
}

// Coloca cada referencia donde quepa, sin pisar el contenido ni a las demás.
function flotar(box, evitar) {
  const W = box.clientWidth, H = box.clientHeight;
  const b = box.getBoundingClientRect();
  const av = evitar.getBoundingClientRect();
  const ocupado = [
    { l: av.left - b.left - 10, t: av.top - b.top - 10, r: av.right - b.left + 10, b: av.bottom - b.top + 10 },
    { l: W - 130, t: 0, r: W, b: 70 },
  ];
  const choca = (l, t, r, bt) => ocupado.some((z) => l < z.r && r > z.l && t < z.b && bt > z.t);

  const base = ["copa", "palma", "sombrilla", "pizza", "llanta", "PLAYA", "ola", "balon",
    "estrella", "SOL Y MAR", "pizza", "palma"];
  const tipos = shuffle(Array.from({ length: W < 600 ? 14 : 24 }, (_, i) => base[i % base.length]));

  for (const tipo of tipos) {
    const el = makeFloater(tipo);
    el.style.visibility = "hidden";
    box.appendChild(el);
    const w = el.offsetWidth, h = el.offsetHeight;
    let puesto = false;
    for (let k = 0; k < 40 && !puesto; k++) {
      const l = rand(4, Math.max(5, W - w - 4));
      const t = rand(4, Math.max(5, H - h - 4));
      if (choca(l - 8, t - 8, l + w + 8, t + h + 8)) continue;
      el.style.left = l + "px";
      el.style.top = t + "px";
      ocupado.push({ l, t, r: l + w, b: t + h });
      puesto = true;
    }
    if (puesto) {
      el.style.animationDuration = rand(5, 9) + "s";
      el.style.animationDelay = -rand(0, 6) + "s";
      el.style.visibility = "";
    } else {
      el.remove();
    }
  }
}

// Música con Web Audio, sin archivos: samba a 120 bpm.

const Music = (() => {
  const STEP = 60 / 120 / 4;

  const PROG = ["C", "C", "A7", "A7", "Dm7", "Dm7", "G7", "G7",
                "F", "F", "G7", "G7", "Em7", "A7", "Dm7", "G7"];
  const CH = {
    C:   { root: 130.81, notes: [261.63, 329.63, 392.0, 523.25] },
    A7:  { root: 110.0,  notes: [277.18, 329.63, 392.0, 440.0] },
    Dm7: { root: 146.83, notes: [293.66, 349.23, 440.0, 523.25] },
    G7:  { root: 98.0,   notes: [293.66, 349.23, 392.0, 493.88] },
    F:   { root: 87.31,  notes: [261.63, 349.23, 440.0, 523.25] },
    Em7: { root: 82.41,  notes: [293.66, 329.63, 392.0, 493.88] },
  };

  const NOTE = {
    B4: 493.88, C5: 523.25, Cs5: 554.37, D5: 587.33, E5: 659.25, F5: 698.46,
    G5: 783.99, A5: 880.0, B5: 987.77, C6: 1046.5, Cs6: 1108.73, D6: 1174.66,
  };
  const bar = (...xs) => xs.map((x) => (x ? NOTE[x] : 0));
  const MELODY = [
    ...bar("E5", 0, 0, "G5", "C6", 0, "B5", "G5", "A5", 0, 0, "G5", "E5", 0, "D5", 0),
    ...bar("E5", 0, 0, "A5", "Cs6", 0, "A5", "G5", "E5", 0, 0, "Cs5", "E5", 0, "G5", 0),
    ...bar("F5", 0, 0, "A5", "D6", 0, "C6", "A5", "F5", 0, 0, "D5", "F5", 0, "A5", 0),
    ...bar("G5", 0, 0, "B5", "D6", 0, "B5", "G5", "F5", 0, 0, "D5", "B4", 0, "D5", 0),
    ...bar("A5", 0, 0, "C6", "A5", 0, "G5", "F5", "A5", 0, 0, "C6", "A5", 0, "F5", 0),
    ...bar("B5", 0, 0, "D6", "B5", 0, "G5", "B5", "D6", 0, 0, "B5", "G5", 0, "F5", 0),
    ...bar("G5", 0, 0, "B5", "G5", 0, "E5", 0, "Cs6", 0, "A5", 0, "E5", 0, "Cs5", 0),
    ...bar("D6", 0, 0, "C6", "A5", 0, "F5", "A5", "B5", 0, "D6", 0, "G5", 0, 0, 0),
  ];

  const TAMBORIM = new Set([0, 3, 6, 8, 11, 14]);
  const CAVACO = new Set([0, 3, 4, 6, 8, 11, 12, 14]);
  const AGOGO = { 0: 1318.5, 3: 987.77, 6: 1318.5, 10: 987.77, 12: 1318.5 };

  let ctx, master, noise, timer, step = 0, next = 0, muted = false;

  function voice(type, freq, t, dur, vol, cutoff) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    filter.type = "lowpass";
    filter.frequency.value = cutoff;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  function surdo(t, vol) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.setValueAtTime(115, t);
    osc.frequency.exponentialRampToValueAtTime(55, t + 0.14);
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t);
    osc.stop(t + 0.32);
  }

  function hit(t, vol, filterType, freq, q, dur) {
    const src = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();
    src.buffer = noise;
    filter.type = filterType;
    filter.frequency.value = freq;
    filter.Q.value = q;
    gain.gain.setValueAtTime(vol, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    src.start(t);
    src.stop(t + dur + 0.01);
  }

  function play(i, t) {
    const s = i % 16;
    const h8 = i % 8;
    const chord = CH[PROG[Math.floor(i / 8) % 16]];

    if (s === 4 || s === 12) surdo(t, 0.6);
    else if (s === 0 || s === 8) surdo(t, 0.26);

    if (h8 === 0 || h8 === 3) {
      voice("triangle", chord.root, t, 0.22, 0.34, 900);
      voice("triangle", chord.root * 2, t, 0.16, 0.12, 1400);
    } else if (h8 === 6) {
      voice("triangle", chord.root * 1.5, t, 0.22, 0.28, 900);
    }

    if (CAVACO.has(s)) {
      const vol = s === 4 || s === 12 ? 0.05 : 0.032;
      chord.notes.forEach((f, k) => voice("sawtooth", f, t + k * 0.011, 0.1, vol, 3200));
    }

    hit(t, 0.03, "highpass", 7000, 0.7, 0.045);
    if (TAMBORIM.has(s)) hit(t, 0.1, "bandpass", 3300, 3, 0.05);
    if (s === 4 || s === 12) hit(t, 0.08, "bandpass", 1500, 0.8, 0.08);

    if (AGOGO[s]) {
      voice("triangle", AGOGO[s], t, 0.12, 0.04, 6000);
      voice("sine", AGOGO[s] * 2.76, t, 0.07, 0.015, 8000);
    }

    const lead = MELODY[i % 128];
    if (lead) {
      voice("square", lead, t, 0.2, 0.034, 4200);
      voice("triangle", lead, t, 0.22, 0.05, 4200);
    }
  }

  // Programa notas con 150 ms de adelanto para que el ritmo no se corte.
  function tick() {
    while (next < ctx.currentTime + 0.15) {
      play(step, next);
      next += STEP;
      step = (step + 1) % 128;
    }
  }

  function start() {
    if (ctx) return;
    try {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      master = ctx.createGain();
      master.gain.value = 0.55;
      const comp = ctx.createDynamicsCompressor();
      master.connect(comp);
      comp.connect(ctx.destination);
      noise = ctx.createBuffer(1, Math.round(ctx.sampleRate * 0.1), ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
      next = ctx.currentTime + 0.05;
      timer = setInterval(tick, 30);
    } catch {
      ctx = null; // sin audio disponible, la página sigue igual
    }
  }

  function setMuted(value) {
    muted = value;
    if (!ctx) return;
    master.gain.setTargetAtTime(muted ? 0 : 0.55, ctx.currentTime, 0.05);
    if (muted) setTimeout(() => muted && ctx.suspend(), 250);
    else ctx.resume();
  }

  // Safari en iPhone deja el audio suspendido hasta un toque que termine (touchend o click).
  function resume() {
    if (ctx && !muted && ctx.state !== "running") ctx.resume();
  }
  ["touchend", "click", "keydown"].forEach((e) => document.addEventListener(e, resume));

  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend();
    else if (!muted) ctx.resume();
  });

  return { start, setMuted, get muted() { return muted; } };
})();

const soundBtn = $("#sonido");
soundBtn.addEventListener("click", () => {
  Music.setMuted(!Music.muted);
  soundBtn.textContent = Music.muted ? "Sonido: no" : "Sonido: sí";
  soundBtn.setAttribute("aria-pressed", String(!Music.muted));
});

// Transición

const stage = $("#stage");
const corsa = $("#corsa");
const ella = $("#ella");
const bubble = $("#burbuja");
const caption = $("#caption");
const captionSr = $("#caption-sr");
let timers = [];
let typeTimer;

const later = (fn, ms) => timers.push(setTimeout(fn, ms));

function say(text) {
  clearInterval(typeTimer);
  captionSr.textContent = text;
  if (reduce) { caption.textContent = text; return; }
  let i = 0;
  caption.textContent = "";
  typeTimer = setInterval(() => {
    caption.textContent = text.slice(0, ++i);
    if (i >= text.length) clearInterval(typeTimer);
  }, 38);
}

const PASOS = [
  { at: 300, texto: "Pasando por ti.", run() { corsa.classList.add("llega"); } },
  {
    at: 2700,
    texto: "Ya estoy abajo.",
    run() {
      stage.classList.add("halt");
      corsa.classList.add("luces");
      bubble.classList.add("on");
      ella.classList.add("saluda");
    },
  },
  { at: 4300, run() { ella.classList.add("gone"); bubble.classList.remove("on"); } },
  {
    at: 4800,
    texto: "Rumbo a la pizza.",
    run() {
      stage.classList.remove("halt");
      corsa.classList.remove("llega", "luces");
      corsa.classList.add("sale");
    },
  },
];
const FIN = 6700;

function playScene() {
  show("scene");
  for (const { at, texto, run } of PASOS) {
    later(() => { if (texto) say(texto); run(); }, at);
  }
  later(goQuestion, FIN);
}

function goQuestion() {
  timers.forEach(clearTimeout);
  timers = [];
  clearInterval(typeTimer);
  show("pregunta");
  const box = $("#pregunta .float");
  if (!box.childElementCount) flotar(box, $("#card"));
  $("#si").focus({ preventScroll: true });
}

$("#skip").addEventListener("click", goQuestion);

function start() {
  if (current !== "splash") return;
  Music.start();
  soundBtn.hidden = false;
  playScene();
}

document.addEventListener("keydown", (e) => {
  if (current === "splash" && !["Shift", "Control", "Alt", "Meta"].includes(e.key)) start();
  else if (current === "scene" && e.key === "Escape") goQuestion();
});
screens.splash.addEventListener("pointerdown", start);
$("#start").addEventListener("click", start);

// Pregunta

const card = $("#card");
const si = $("#si");
const no = $("#no");
const botones = $("#botones");
const burla = $("#burla");

const BURLAS = [
  "Ese botón te regateó como Ney.",
  "Elástico. ¡Qué clase!",
  "Ese botón tiene menos agarre que la llanta de ese InDriver.",
  "Hasta Neymar diría que sí.",
  "La playa queda más cerca que este botón.",
  "Caño al dedo.",
  "Ni con VAR te dejo marcar “No”.",
  "Esto no se arregla con una caipirinha, se arregla con pizza.",
  "Tarjeta amarilla por insistir.",
  "Cae más rápido que Ney en el área, pero no cae el “No”.",
  "Última oportunidad antes de penal: ¿SÍ?",
  "Ok, ya, ese botón tiene más ginga que tú.",
];
const ETIQUETAS_NO = ["¿Segura?", "Piénsalo", "Nop", "Jamás", "Ni de a gratis"];

let intentos = 0;
let confirmado = false;
let ultimoSalto = 0;

// Marcador para que el layout no salte cuando el botón "No" sale a pasear.
const hueco = document.createElement("span");
hueco.hidden = true;
botones.appendChild(hueco);

function rastro(from, to) {
  const pasos = 7;
  for (let i = 0; i < pasos; i++) {
    const dot = document.createElement("i");
    const f = i / pasos;
    dot.className = "rastro";
    dot.style.left = from.x + (to.x - from.x) * f + "px";
    dot.style.top = from.y + (to.y - from.y) * f + "px";
    dot.style.animationDelay = i * 25 + "ms";
    dot.addEventListener("animationend", () => dot.remove());
    document.body.appendChild(dot);
  }
}

function huir(ev) {
  if (confirmado) return;
  // En iPhone, cancelar touchstart evita que el toque termine en un clic sobre el "Sí".
  if (ev && ev.cancelable) ev.preventDefault();
  const ahora = performance.now();
  if (ahora - ultimoSalto < 180) return;
  ultimoSalto = ahora;

  const antes = no.getBoundingClientRect();
  if (!no.classList.contains("huida")) {
    hueco.hidden = false;
    hueco.style.cssText = `display:inline-block;width:${antes.width}px;height:${antes.height}px`;
    no.classList.add("huida");
    no.style.left = antes.left + "px";
    no.style.top = antes.top + "px";
  }

  intentos++;
  const escala = Math.min(1 + intentos * 0.07, 1.6);
  si.style.transform = `scale(${escala})`;
  si.style.margin = `${(escala - 1) * 14}px ${(escala - 1) * 30}px`;
  if (intentos >= 5) no.textContent = ETIQUETAS_NO[intentos % 5];

  const margen = 12;
  const w = no.offsetWidth, h = no.offsetHeight;
  const maxX = innerWidth - w - margen;
  const maxY = innerHeight - h - margen;
  const sr = si.getBoundingClientRect();
  let x, y, tries = 0;
  do {
    x = margen + Math.random() * Math.max(0, maxX - margen);
    y = margen + Math.random() * Math.max(0, maxY - margen);
    tries++;
  } while (tries < 20 &&
    x < sr.right + 10 && x + w > sr.left - 10 &&
    y < sr.bottom + 10 && y + h > sr.top - 10);

  no.style.left = x + "px";
  no.style.top = y + "px";
  rastro(
    { x: antes.left + w / 2, y: antes.top + h / 2 },
    { x: x + w / 2, y: y + h / 2 }
  );

  burla.textContent = BURLAS[Math.min(intentos - 1, BURLAS.length - 1)];
}

["pointerenter", "pointerdown", "focus"].forEach((e) => no.addEventListener(e, huir));
no.addEventListener("touchstart", huir, { passive: false });
no.addEventListener("click", huir);

screens.pregunta.addEventListener("pointermove", (e) => {
  if (confirmado || e.pointerType !== "mouse" || !no.classList.contains("huida")) return;
  const r = no.getBoundingClientRect();
  const dx = e.clientX - (r.left + r.width / 2);
  const dy = e.clientY - (r.top + r.height / 2);
  if (Math.hypot(dx, dy) < 90) huir(e);
});

// Confeti

const cv = $("#confeti");
const cx = cv.getContext("2d");
let piezas = [];
let animando = false;

function ajustar() {
  const d = devicePixelRatio || 1;
  cv.width = innerWidth * d;
  cv.height = innerHeight * d;
  cx.setTransform(d, 0, 0, d, 0, 0);
}
addEventListener("resize", ajustar);
ajustar();

const COLORES = ["#ffdf00", "#009c3b", "#fffbe8", "#ffdf00"];

function espiral(x, y, n) {
  for (let i = 0; i < n; i++) {
    piezas.push({
      spiral: true, ox: x, oy: y,
      a: (i / n) * Math.PI * 4, r: 0, sp: 5 + Math.random() * 3,
      age: -i * 2, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
      size: 8 + Math.random() * 6,
      color: COLORES[i % COLORES.length],
      pizza: i % 6 === 0,
    });
  }
}

function rafaga(x, y, n, angulo, apertura) {
  for (let i = 0; i < n; i++) {
    const a = angulo + (Math.random() - 0.5) * apertura;
    const v = 9 + Math.random() * 11;
    piezas.push({
      x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 0.24 + Math.random() * 0.08,
      age: 0, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.35,
      size: 7 + Math.random() * 7,
      color: COLORES[(Math.random() * COLORES.length) | 0],
      pizza: Math.random() < 0.12,
    });
  }
}

function dibujar(p) {
  cx.save();
  cx.translate(p.x, p.y);
  cx.rotate(p.rot);
  cx.globalAlpha = Math.max(0, Math.min(1, (300 - p.age) / 60));
  if (p.pizza) {
    const k = (p.size * 2.4) / 16;
    cx.scale(k, k);
    cx.translate(-8, -8);
    for (const [y, x0, x1, c] of PIZZA) { cx.fillStyle = c; cx.fillRect(x0, y, x1 - x0 + 1, 1); }
    cx.fillStyle = "#006b28";
    for (const [x, y] of PIZZA_DOTS) cx.fillRect(x, y, 2, 2);
  } else {
    cx.fillStyle = p.color;
    cx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
  }
  cx.restore();
}

function cuadro() {
  cx.clearRect(0, 0, innerWidth, innerHeight);
  piezas = piezas.filter((p) => p.age < 300 && (p.spiral || p.y < innerHeight + 60));
  for (const p of piezas) {
    p.age++;
    if (p.age < 0) continue;
    if (p.spiral) {
      p.a += 0.09;
      p.r += p.sp;
      p.sp *= 0.985;
      p.x = p.ox + Math.cos(p.a) * p.r;
      p.y = p.oy + Math.sin(p.a) * p.r + Math.max(0, p.age - 60) ** 2 * 0.03;
    } else {
      p.vy += p.g;
      p.vx *= 0.992;
      p.x += p.vx;
      p.y += p.vy;
    }
    p.rot += p.vr;
    dibujar(p);
  }
  if (piezas.length) requestAnimationFrame(cuadro);
  else animando = false;
}

function celebrar(x, y) {
  const n = reduce ? 30 : 110;
  espiral(x, y, reduce ? 12 : 36);
  rafaga(innerWidth * 0.5, innerHeight * 0.62, n, -Math.PI / 2, 1.4);
  rafaga(0, innerHeight * 0.85, n, -Math.PI / 3, 0.9);
  rafaga(innerWidth, innerHeight * 0.85, n, -Math.PI * 2 / 3, 0.9);
  if (!animando) { animando = true; requestAnimationFrame(cuadro); }
}

si.addEventListener("click", (e) => {
  if (confirmado) return;
  confirmado = true;
  const r = si.getBoundingClientRect();
  const x = e.detail ? e.clientX : r.left + r.width / 2;
  const y = e.detail ? e.clientY : r.top + r.height / 2;
  no.style.display = "none";
  hueco.hidden = true;
  card.classList.add("confirmado");
  $("#ok-titulo").focus({ preventScroll: true });
  celebrar(x, y);
  setTimeout(() => celebrar(innerWidth / 2, innerHeight / 3), 500);
});

// Arranque

makeStars($("#splash .stars"), 40, 100);
makeStars($("#stage .stars"), 22, 52);
makeStars($("#pregunta .stars"), 40, 100);
$("#ok-pizza").innerHTML = pizzaSVG();
if (touch) $("#start-text").textContent = "Toca la pantalla para comenzar";
flotar($("#splash .float"), $(".splash-content"));

$("#wa").href = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(MENSAJE);
