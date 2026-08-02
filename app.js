import { LeaptrailAudio } from "./audio.js";
import { LeaptrailGame, W, H } from "./game.js";
import {
  drawCloud,
  drawCoin,
  drawFoe,
  drawGoal,
  drawPlatform,
  drawTraveler,
} from "./sprites.js";

const audio = new LeaptrailAudio();
const game = new LeaptrailGame();
globalThis.__leaptrail = game;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const levelEl = document.getElementById("level");
const statusEl = document.getElementById("status");
const btnStart = document.getElementById("btn-start");
const btnMute = document.getElementById("btn-mute");
const btnReset = document.getElementById("btn-reset");

canvas.width = W;
canvas.height = H;

/** @type {Set<string>} */
const keys = new Set();
/** @type {{ left: boolean, right: boolean, jump: boolean }} */
const touch = { left: false, right: false, jump: false };
let jumpLatched = false;
let lastTs = 0;
let running = true;

function cssVar(name, fallback) {
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return v || fallback;
}

function setStatus(msg, tone = "") {
  statusEl.textContent = msg;
  statusEl.dataset.tone = tone;
}

function syncHud() {
  scoreEl.textContent = String(game.score);
  livesEl.textContent = String(game.lives);
  levelEl.textContent = String(game.levelNumber);
  if (game.status === "ready") {
    btnStart.textContent = "出發";
    btnStart.disabled = false;
  } else if (game.status === "playing") {
    btnStart.textContent = "進行中";
    btnStart.disabled = true;
  } else if (game.status === "clear") {
    btnStart.textContent = "下一關";
    btnStart.disabled = false;
  } else if (game.status === "win") {
    btnStart.textContent = "再挑戰";
    btnStart.disabled = false;
  } else {
    btnStart.textContent = "再來一局";
    btnStart.disabled = false;
  }
}

function readInput() {
  const left =
    keys.has("ArrowLeft") || keys.has("a") || keys.has("A") || touch.left;
  const right =
    keys.has("ArrowRight") || keys.has("d") || keys.has("D") || touch.right;
  const jumpHeld =
    keys.has(" ") ||
    keys.has("ArrowUp") ||
    keys.has("w") ||
    keys.has("W") ||
    touch.jump;
  const jump = jumpHeld && !jumpLatched;
  if (jumpHeld) jumpLatched = true;
  else jumpLatched = false;
  return { left, right, jump: jump || jumpHeld };
}

function drawBackground() {
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, "#7dd3fc");
  sky.addColorStop(0.45, "#bae6fd");
  sky.addColorStop(0.75, "#e0f2fe");
  sky.addColorStop(1, "#bbf7d0");
  // Dark-mode-ish board override via soft multiply feel
  const board = cssVar("--board", "#0f141c");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Subtle night wash if dark theme board is very dark
  if (board.startsWith("#0") || board.startsWith("#1")) {
    ctx.fillStyle = "rgba(15,23,42,0.35)";
    ctx.fillRect(0, 0, W, H);
  }

  // Distant hills
  ctx.fillStyle = "rgba(34,197,94,0.25)";
  ctx.beginPath();
  ctx.moveTo(0, 420);
  ctx.quadraticCurveTo(120, 360, 240, 400);
  ctx.quadraticCurveTo(360, 440, 480, 380);
  ctx.lineTo(480, H);
  ctx.lineTo(0, H);
  ctx.fill();

  for (const c of game.clouds) drawCloud(ctx, c);
}

function draw() {
  drawBackground();

  for (const plat of game.plats) drawPlatform(ctx, plat);
  drawGoal(ctx, game.goal, performance.now());

  const t = performance.now();
  for (const c of game.coins) drawCoin(ctx, c, t);
  for (const f of game.foes) drawFoe(ctx, f, t);

  drawTraveler(ctx, game.player);

  // HUD chip on canvas
  ctx.fillStyle = "rgba(15,23,42,0.35)";
  roundRect(ctx, 12, 10, 140, 28, 8);
  ctx.fill();
  ctx.fillStyle = "#fefce8";
  ctx.font = "600 12px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText(`星屑 ${game.coins.length - game.coinsLeft}/${game.coins.length}`, 24, 24);

  if (game.status === "ready") {
    banner("左右移動 · 跳躍出發");
  } else if (game.status === "clear") {
    banner(`第 ${game.levelNumber} 關完成！`);
  } else if (game.status === "win") {
    banner("旅程完成！");
  } else if (game.status === "over") {
    banner("旅途中斷");
  }
}

function banner(msg) {
  ctx.fillStyle = "rgba(15,23,42,0.5)";
  ctx.fillRect(40, H / 2 - 30, W - 80, 60);
  ctx.fillStyle = cssVar("--neon", "#fbbf24");
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(msg, W / 2, H / 2);
}

function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

function handleEvents(events) {
  for (const e of events) {
    if (e === "jump") audio.jump();
    else if (e === "coin") audio.coin();
    else if (e === "stomp") {
      audio.stomp();
      setStatus(`踩扁！分數 ${game.score}`, "win");
    } else if (e === "hurt") {
      audio.hurt();
      setStatus(`受傷 · 剩 ${game.lives} 條命`, "warn");
    } else if (e === "clear") {
      audio.clear();
      setStatus(`過關！分數 ${game.score}`, "win");
    } else if (e === "win") {
      audio.win();
      setStatus(`全通關 · 分數 ${game.score}`, "win");
    } else if (e === "over") {
      audio.gameOver();
      setStatus(`結束 · 分數 ${game.score}`, "lose");
    }
  }
}

function frame(ts) {
  if (!running) return;
  const dt = Math.min(2, (ts - lastTs) / (1000 / 60) || 1);
  lastTs = ts;

  const input = readInput();
  const { events } = game.update(input, dt);
  if (events.length) handleEvents(events);

  draw();
  syncHud();
  requestAnimationFrame(frame);
}

async function tryStart() {
  await audio.unlock();
  if (game.status === "playing") return;
  if (game.status === "win") {
    game.resetAll();
  }
  const ok = game.start();
  if (!ok && game.status === "win") {
    setStatus(`全通關 · 分數 ${game.score}`, "win");
    syncHud();
    return;
  }
  audio.startBeep();
  setStatus(`第 ${game.levelNumber} 關 · 抵達旗幟！`);
  syncHud();
}

btnStart.addEventListener("click", () => {
  void tryStart();
});

btnReset.addEventListener("click", async () => {
  await audio.unlock();
  game.resetAll();
  setStatus("已重來 · 出發起跳");
  syncHud();
});

btnMute.addEventListener("click", async () => {
  await audio.unlock();
  audio.setEnabled(!audio.enabled);
  btnMute.textContent = audio.enabled ? "音效開" : "音效關";
  btnMute.setAttribute("aria-pressed", audio.enabled ? "true" : "false");
});

function pointerToLocal(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((e.clientX - rect.left) / rect.width) * W,
    y: ((e.clientY - rect.top) / rect.height) * H,
  };
}

canvas.addEventListener("pointerdown", (e) => {
  canvas.setPointerCapture?.(e.pointerId);
  const { x } = pointerToLocal(e);
  if (game.status !== "playing") void tryStart();
  if (x < W * 0.55) {
    touch.left = x < W * 0.28;
    touch.right = x >= W * 0.28 && x < W * 0.55;
    touch.jump = false;
  } else {
    touch.jump = true;
  }
});

canvas.addEventListener("pointermove", (e) => {
  if (e.buttons === 0 && !e.pressure) return;
  const { x } = pointerToLocal(e);
  if (x < W * 0.55) {
    touch.left = x < W * 0.28;
    touch.right = x >= W * 0.28 && x < W * 0.55;
    touch.jump = false;
  }
});

canvas.addEventListener("pointerup", () => {
  touch.left = false;
  touch.right = false;
  touch.jump = false;
});

canvas.addEventListener("pointercancel", () => {
  touch.left = false;
  touch.right = false;
  touch.jump = false;
});

window.addEventListener("keydown", (e) => {
  keys.add(e.key);
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
    e.preventDefault();
  }
  if (e.key === "Enter" && game.status !== "playing") void tryStart();
});

window.addEventListener("keyup", (e) => {
  keys.delete(e.key);
});

document.body.addEventListener(
  "pointerdown",
  () => {
    void audio.unlock();
  },
  { once: true },
);

setStatus("左右移動 · 跳躍出發");
syncHud();
requestAnimationFrame((ts) => {
  lastTs = ts;
  requestAnimationFrame(frame);
});
