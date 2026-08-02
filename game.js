/**
 * Short-form platform hopper. Original levels & cast — not a clone of any commercial title.
 */

export const W = 480;
export const H = 640;

const GRAVITY = 0.42;
const MOVE = 0.55;
const MAX_VX = 3.6;
const JUMP_V = -9.2;
const FRICTION = 0.82;

/**
 * @typedef {{ x: number, y: number, w: number, h: number, kind?: 'ground'|'stone'|'wood'|'goal' }} Plat
 * @typedef {{ x: number, y: number, w: number, h: number, vx: number, minX: number, maxX: number }} Foe
 * @typedef {{ x: number, y: number, r: number, taken: boolean }} Coin
 * @typedef {{ plats: Plat[], foes: Foe[], coins: Coin[], spawn: {x:number,y:number}, goal: {x:number,y:number,w:number,h:number} }} Level
 */

/** @type {Level[]} */
const LEVELS = [
  {
    spawn: { x: 56, y: 520 },
    goal: { x: 400, y: 96, w: 28, h: 48 },
    plats: [
      { x: 0, y: 600, w: 480, h: 40, kind: "ground" },
      { x: 120, y: 520, w: 100, h: 16, kind: "stone" },
      { x: 260, y: 450, w: 110, h: 16, kind: "wood" },
      { x: 80, y: 380, w: 90, h: 16, kind: "stone" },
      { x: 220, y: 300, w: 120, h: 16, kind: "wood" },
      { x: 360, y: 230, w: 90, h: 16, kind: "stone" },
      { x: 200, y: 160, w: 100, h: 16, kind: "wood" },
      { x: 360, y: 140, w: 100, h: 16, kind: "stone" },
    ],
    foes: [
      { x: 280, y: 426, w: 28, h: 22, vx: 1.1, minX: 260, maxX: 350 },
      { x: 230, y: 276, w: 28, h: 22, vx: -1.0, minX: 220, maxX: 320 },
    ],
    coins: [
      { x: 170, y: 490, r: 8, taken: false },
      { x: 310, y: 420, r: 8, taken: false },
      { x: 120, y: 350, r: 8, taken: false },
      { x: 270, y: 270, r: 8, taken: false },
      { x: 400, y: 200, r: 8, taken: false },
      { x: 240, y: 130, r: 8, taken: false },
    ],
  },
  {
    spawn: { x: 40, y: 540 },
    goal: { x: 48, y: 72, w: 28, h: 48 },
    plats: [
      { x: 0, y: 600, w: 480, h: 40, kind: "ground" },
      { x: 40, y: 520, w: 70, h: 14, kind: "wood" },
      { x: 160, y: 470, w: 70, h: 14, kind: "stone" },
      { x: 290, y: 420, w: 80, h: 14, kind: "wood" },
      { x: 390, y: 350, w: 70, h: 14, kind: "stone" },
      { x: 260, y: 290, w: 90, h: 14, kind: "wood" },
      { x: 120, y: 230, w: 80, h: 14, kind: "stone" },
      { x: 40, y: 170, w: 90, h: 14, kind: "wood" },
      { x: 200, y: 120, w: 100, h: 14, kind: "stone" },
      { x: 40, y: 120, w: 70, h: 14, kind: "wood" },
    ],
    foes: [
      { x: 300, y: 396, w: 28, h: 22, vx: 1.25, minX: 290, maxX: 360 },
      { x: 270, y: 266, w: 28, h: 22, vx: -1.15, minX: 260, maxX: 340 },
      { x: 130, y: 206, w: 28, h: 22, vx: 1.0, minX: 120, maxX: 190 },
    ],
    coins: [
      { x: 70, y: 490, r: 8, taken: false },
      { x: 190, y: 440, r: 8, taken: false },
      { x: 330, y: 390, r: 8, taken: false },
      { x: 420, y: 320, r: 8, taken: false },
      { x: 300, y: 260, r: 8, taken: false },
      { x: 150, y: 200, r: 8, taken: false },
      { x: 70, y: 140, r: 8, taken: false },
      { x: 250, y: 90, r: 8, taken: false },
    ],
  },
  {
    spawn: { x: 420, y: 540 },
    goal: { x: 220, y: 64, w: 28, h: 48 },
    plats: [
      { x: 0, y: 600, w: 480, h: 40, kind: "ground" },
      { x: 340, y: 520, w: 100, h: 14, kind: "stone" },
      { x: 200, y: 460, w: 80, h: 14, kind: "wood" },
      { x: 60, y: 400, w: 90, h: 14, kind: "stone" },
      { x: 180, y: 330, w: 70, h: 14, kind: "wood" },
      { x: 320, y: 280, w: 100, h: 14, kind: "stone" },
      { x: 160, y: 220, w: 80, h: 14, kind: "wood" },
      { x: 40, y: 160, w: 90, h: 14, kind: "stone" },
      { x: 180, y: 110, w: 120, h: 14, kind: "wood" },
    ],
    foes: [
      { x: 360, y: 496, w: 28, h: 22, vx: -1.2, minX: 340, maxX: 420 },
      { x: 70, y: 376, w: 28, h: 22, vx: 1.3, minX: 60, maxX: 140 },
      { x: 330, y: 256, w: 28, h: 22, vx: -1.1, minX: 320, maxX: 400 },
      { x: 50, y: 136, w: 28, h: 22, vx: 1.05, minX: 40, maxX: 120 },
    ],
    coins: [
      { x: 380, y: 490, r: 8, taken: false },
      { x: 230, y: 430, r: 8, taken: false },
      { x: 100, y: 370, r: 8, taken: false },
      { x: 210, y: 300, r: 8, taken: false },
      { x: 360, y: 250, r: 8, taken: false },
      { x: 190, y: 190, r: 8, taken: false },
      { x: 80, y: 130, r: 8, taken: false },
      { x: 240, y: 80, r: 8, taken: false },
    ],
  },
];

export class LeaptrailGame {
  constructor() {
    this.resetAll();
  }

  resetAll() {
    this.levelIndex = 0;
    this.score = 0;
    this.lives = 3;
    this.status = "ready"; // ready | playing | clear | over | win
    this.loadLevel(0);
  }

  loadLevel(idx) {
    const src = LEVELS[idx % LEVELS.length];
    this.levelIndex = idx;
    this.plats = src.plats.map((p) => ({ ...p }));
    this.foes = src.foes.map((f) => ({ ...f }));
    this.coins = src.coins.map((c) => ({ ...c, taken: false }));
    this.goal = { ...src.goal };
    this.player = {
      x: src.spawn.x,
      y: src.spawn.y,
      w: 26,
      h: 34,
      vx: 0,
      vy: 0,
      onGround: false,
      facing: 1,
      walk: 0,
      coyote: 0,
      jumpBuf: 0,
      invuln: 0,
    };
    this.clouds = Array.from({ length: 6 }, (_, i) => ({
      x: (i * 97 + 40) % W,
      y: 40 + (i * 37) % 120,
      s: 0.3 + (i % 3) * 0.15,
      w: 50 + (i % 3) * 18,
    }));
  }

  start() {
    if (this.status === "over" || this.status === "win") this.resetAll();
    if (this.status === "clear") {
      if (this.levelIndex + 1 >= LEVELS.length) {
        this.status = "win";
        return false;
      }
      this.loadLevel(this.levelIndex + 1);
    }
    this.status = "playing";
    return true;
  }

  /**
   * @param {{left:boolean,right:boolean,jump:boolean}} input
   * @param {number} dt
   * @returns {{ events: string[] }}
   */
  update(input, dt) {
    /** @type {string[]} */
    const events = [];
    // Drift clouds always
    for (const c of this.clouds) {
      c.x += c.s * dt;
      if (c.x > W + 40) c.x = -c.w;
    }
    if (this.status !== "playing") return { events };

    const p = this.player;
    if (p.invuln > 0) p.invuln -= dt;
    if (input.jump) p.jumpBuf = 8;
    else if (p.jumpBuf > 0) p.jumpBuf -= dt;

    if (input.left) {
      p.vx -= MOVE * dt;
      p.facing = -1;
    } else if (input.right) {
      p.vx += MOVE * dt;
      p.facing = 1;
    } else {
      p.vx *= Math.pow(FRICTION, dt);
    }
    p.vx = Math.max(-MAX_VX, Math.min(MAX_VX, p.vx));

    if (p.onGround) p.coyote = 8;
    else if (p.coyote > 0) p.coyote -= dt;

    if (p.jumpBuf > 0 && p.coyote > 0) {
      p.vy = JUMP_V;
      p.onGround = false;
      p.coyote = 0;
      p.jumpBuf = 0;
      events.push("jump");
    }

    p.vy += GRAVITY * dt;
    if (p.vy > 12) p.vy = 12;

    p.x += p.vx * dt;
    this.resolveX(p);
    p.y += p.vy * dt;
    p.onGround = false;
    this.resolveY(p, events);

    if (Math.abs(p.vx) > 0.3 && p.onGround) p.walk += dt * 0.45;
    else if (!p.onGround) p.walk += dt * 0.15;
    else p.walk *= 0.8;

    // Bounds
    if (p.x < 0) {
      p.x = 0;
      p.vx = 0;
    }
    if (p.x + p.w > W) {
      p.x = W - p.w;
      p.vx = 0;
    }
    if (p.y > H + 40) {
      this.hurt(events);
    }

    // Foes
    for (const f of this.foes) {
      f.x += f.vx * dt;
      if (f.x < f.minX) {
        f.x = f.minX;
        f.vx = Math.abs(f.vx);
      }
      if (f.x + f.w > f.maxX) {
        f.x = f.maxX - f.w;
        f.vx = -Math.abs(f.vx);
      }
      if (p.invuln <= 0 && aabb(p, f)) {
        // Stomp from above
        if (p.vy > 0 && p.y + p.h - f.y < 14) {
          p.vy = JUMP_V * 0.65;
          f.x = -999;
          this.score += 150;
          events.push("stomp");
        } else {
          this.hurt(events);
        }
      }
    }
    this.foes = this.foes.filter((f) => f.x > -100);

    // Coins
    for (const c of this.coins) {
      if (c.taken) continue;
      const dx = p.x + p.w / 2 - c.x;
      const dy = p.y + p.h / 2 - c.y;
      if (dx * dx + dy * dy < (c.r + 12) * (c.r + 12)) {
        c.taken = true;
        this.score += 50;
        events.push("coin");
      }
    }

    // Goal
    if (aabb(p, this.goal)) {
      this.status = "clear";
      this.score += 300;
      events.push("clear");
      if (this.levelIndex + 1 >= LEVELS.length) {
        this.status = "win";
        events.push("win");
      }
    }

    return { events };
  }

  /** @param {typeof this.player} p */
  resolveX(p) {
    for (const plat of this.plats) {
      if (!aabb(p, plat)) continue;
      if (p.vx > 0) p.x = plat.x - p.w;
      else if (p.vx < 0) p.x = plat.x + plat.w;
      p.vx = 0;
    }
  }

  /**
   * @param {typeof this.player} p
   * @param {string[]} events
   */
  resolveY(p, events) {
    for (const plat of this.plats) {
      if (!aabb(p, plat)) continue;
      if (p.vy > 0) {
        p.y = plat.y - p.h;
        p.vy = 0;
        p.onGround = true;
      } else if (p.vy < 0) {
        p.y = plat.y + plat.h;
        p.vy = 0;
        events.push("bonk");
      }
    }
  }

  /** @param {string[]} events */
  hurt(events) {
    const p = this.player;
    if (p.invuln > 0) return;
    this.lives -= 1;
    p.invuln = 70;
    p.vx = -p.facing * 2;
    p.vy = -5;
    events.push("hurt");
    if (this.lives <= 0) {
      this.status = "over";
      events.push("over");
    } else {
      // Soft respawn at spawn of current level
      const src = LEVELS[this.levelIndex % LEVELS.length];
      p.x = src.spawn.x;
      p.y = src.spawn.y;
      p.vx = 0;
      p.vy = 0;
    }
  }

  get coinsLeft() {
    return this.coins.filter((c) => !c.taken).length;
  }

  get levelNumber() {
    return this.levelIndex + 1;
  }
}

/**
 * @param {{x:number,y:number,w:number,h:number}} a
 * @param {{x:number,y:number,w:number,h:number}} b
 */
function aabb(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
