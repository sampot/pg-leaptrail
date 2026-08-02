/**
 * Hand-drawn-style canvas sprites — original cast for 躍階旅人.
 */

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} p
 * @param {number} p.x
 * @param {number} p.y
 * @param {number} p.w
 * @param {number} p.h
 * @param {number} p.facing
 * @param {number} p.walk
 * @param {number} p.vy
 * @param {boolean} p.onGround
 * @param {number} p.invuln
 */
export function drawTraveler(ctx, p) {
  if (p.invuln > 0 && Math.floor(performance.now() / 70) % 2 === 0) return;

  const cx = p.x + p.w / 2;
  const feet = p.y + p.h;
  const facing = p.facing >= 0 ? 1 : -1;
  const air = !p.onGround;
  const run = p.onGround && Math.abs(p.walk) > 0.05;
  const phase = p.walk;
  const legSwing = run ? Math.sin(phase * Math.PI * 2) * 5 : air ? 3 : 0;
  const bob = run ? Math.abs(Math.sin(phase * Math.PI * 2)) * 1.5 : 0;
  const bodyY = feet - 14 - bob;
  const headY = bodyY - 14;

  ctx.save();
  ctx.translate(cx, 0);
  ctx.scale(facing, 1);

  // Soft contact shadow
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(0, feet - 1, 11, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Scarf trail
  const scarf = ctx.createLinearGradient(-4, headY, 18, headY + 16);
  scarf.addColorStop(0, "#f97316");
  scarf.addColorStop(1, "#fdba74");
  ctx.strokeStyle = scarf;
  ctx.lineWidth = 3.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  const scarfWave = air ? -p.vy * 0.4 : Math.sin(phase * 6) * 2;
  ctx.moveTo(4, headY + 4);
  ctx.quadraticCurveTo(12 + scarfWave, headY + 10, 16 + scarfWave * 1.2, headY + 18);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(3, headY + 6);
  ctx.quadraticCurveTo(10 + scarfWave * 0.6, headY + 14, 13, headY + 20);
  ctx.stroke();

  // Boots / legs
  ctx.fillStyle = "#292524";
  roundCapsule(ctx, -7 - legSwing * 0.15, feet - 10, 6, 10, 2);
  ctx.fill();
  roundCapsule(ctx, 1 + legSwing * 0.15, feet - 10, 6, 10, 2);
  ctx.fill();
  // Boot toes
  ctx.fillStyle = "#44403c";
  ctx.beginPath();
  ctx.ellipse(-4 - legSwing * 0.15, feet - 1.5, 4.2, 2.2, 0, 0, Math.PI * 2);
  ctx.ellipse(4 + legSwing * 0.15, feet - 1.5, 4.2, 2.2, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tunic body
  const tunic = ctx.createLinearGradient(-10, bodyY - 12, 10, bodyY + 8);
  tunic.addColorStop(0, "#2dd4bf");
  tunic.addColorStop(0.55, "#0f766e");
  tunic.addColorStop(1, "#115e59");
  ctx.fillStyle = tunic;
  roundCapsule(ctx, -9, bodyY - 12, 18, 20, 7);
  ctx.fill();

  // Belt
  ctx.fillStyle = "#78350f";
  ctx.fillRect(-8, bodyY - 1, 16, 3.5);
  ctx.fillStyle = "#fbbf24";
  roundRectPath(ctx, -2, bodyY - 1.5, 4, 4.5, 1);
  ctx.fill();

  // Arm
  ctx.strokeStyle = "#5eead4";
  ctx.lineWidth = 3.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  const armSwing = run ? Math.sin(phase * Math.PI * 2 + Math.PI) * 4 : air ? -6 : 0;
  ctx.moveTo(6, bodyY - 8);
  ctx.quadraticCurveTo(11, bodyY - 2 + armSwing * 0.3, 10, bodyY + 4 + armSwing * 0.2);
  ctx.stroke();
  // Glove
  ctx.fillStyle = "#fef3c7";
  ctx.beginPath();
  ctx.arc(10, bodyY + 4 + armSwing * 0.2, 2.8, 0, Math.PI * 2);
  ctx.fill();

  // Head
  const skin = ctx.createRadialGradient(-2, headY - 2, 1, 0, headY, 11);
  skin.addColorStop(0, "#ffe8d6");
  skin.addColorStop(1, "#f0b090");
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.ellipse(0, headY, 9.5, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Hair / cap
  const hair = ctx.createLinearGradient(-8, headY - 12, 8, headY);
  hair.addColorStop(0, "#1e3a5f");
  hair.addColorStop(1, "#0f766e");
  ctx.fillStyle = hair;
  ctx.beginPath();
  ctx.ellipse(0, headY - 5, 10, 7.5, 0, Math.PI, 0);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(-9, headY - 2);
  ctx.quadraticCurveTo(-12, headY + 4, -6, headY + 2);
  ctx.fill();

  // Cap brim
  ctx.fillStyle = "#fbbf24";
  ctx.beginPath();
  ctx.ellipse(3, headY - 6, 7, 2.2, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = "#1c1917";
  ctx.beginPath();
  ctx.ellipse(2.5, headY - 0.5, 1.7, 2.1, 0, 0, Math.PI * 2);
  ctx.ellipse(6.2, headY - 0.5, 1.7, 2.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(3.1, headY - 1.2, 0.7, 0, Math.PI * 2);
  ctx.arc(6.8, headY - 1.2, 0.7, 0, Math.PI * 2);
  ctx.fill();

  // Cheek + smile
  ctx.fillStyle = "rgba(251,113,133,0.45)";
  ctx.beginPath();
  ctx.ellipse(7.5, headY + 2.5, 2.2, 1.3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#9a3412";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(4.5, headY + 3.5, 2.8, 0.15, Math.PI - 0.15);
  ctx.stroke();

  ctx.restore();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x:number,y:number,w:number,h:number,vx:number}} f
 * @param {number} t
 */
export function drawFoe(ctx, f, t) {
  const cx = f.x + f.w / 2;
  const cy = f.y + f.h / 2;
  const facing = f.vx >= 0 ? 1 : -1;
  const bounce = Math.sin(t / 120 + f.x) * 1.5;

  ctx.save();
  ctx.translate(cx, cy + bounce);
  ctx.scale(facing, 1);

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.16)";
  ctx.beginPath();
  ctx.ellipse(0, f.h / 2 - bounce, 12, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body shell
  const shell = ctx.createRadialGradient(-4, -4, 2, 0, 0, 16);
  shell.addColorStop(0, "#fda4af");
  shell.addColorStop(0.5, "#e11d48");
  shell.addColorStop(1, "#9f1239");
  ctx.fillStyle = shell;
  ctx.beginPath();
  ctx.ellipse(0, 1, 13, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Shell ridges
  ctx.strokeStyle = "rgba(255,255,255,0.25)";
  ctx.lineWidth = 1.4;
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.ellipse(i * 4, 0, 3.5, 7, 0, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Feet
  ctx.fillStyle = "#881337";
  for (const fx of [-8, -3, 3, 8]) {
    ctx.beginPath();
    ctx.ellipse(fx, 9, 2.4, 2.8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Face plate
  ctx.fillStyle = "#ffe4e6";
  ctx.beginPath();
  ctx.ellipse(2, 1, 6.5, 5.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Eyes (grumpy)
  ctx.fillStyle = "#1c1917";
  ctx.beginPath();
  ctx.ellipse(0.5, 0, 1.5, 2, 0, 0, Math.PI * 2);
  ctx.ellipse(4.5, 0, 1.5, 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#1c1917";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-1.2, -2.5);
  ctx.lineTo(1.5, -1.2);
  ctx.moveTo(6.2, -2.5);
  ctx.lineTo(3.5, -1.2);
  ctx.stroke();

  // Mouth
  ctx.beginPath();
  ctx.arc(2.5, 2.8, 2.2, 0.2, Math.PI - 0.2, true);
  ctx.stroke();

  ctx.restore();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x:number,y:number,r:number,taken:boolean}} c
 * @param {number} t
 */
export function drawCoin(ctx, c, t) {
  if (c.taken) return;
  const pulse = 1 + Math.sin(t / 160 + c.x) * 0.08;
  const r = c.r * pulse;
  const g = ctx.createRadialGradient(c.x - 2, c.y - 2, 1, c.x, c.y, r);
  g.addColorStop(0, "#fef08a");
  g.addColorStop(0.55, "#fbbf24");
  g.addColorStop(1, "#d97706");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(c.x, c.y, r, r * 0.92, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(c.x - 1, c.y - 1, r * 0.45, -0.8, 0.8);
  ctx.stroke();
  ctx.fillStyle = "rgba(180,83,9,0.55)";
  ctx.font = "700 9px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("★", c.x, c.y + 0.5);
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x:number,y:number,w:number,h:number}} goal
 * @param {number} t
 */
export function drawGoal(ctx, goal, t) {
  const x = goal.x + 6;
  const y = goal.y;
  // Pole
  const pole = ctx.createLinearGradient(x, y, x + 4, y);
  pole.addColorStop(0, "#a8a29e");
  pole.addColorStop(1, "#57534e");
  ctx.fillStyle = pole;
  ctx.fillRect(x, y, 4, goal.h);

  // Flag cloth
  const wave = Math.sin(t / 180) * 3;
  const flag = ctx.createLinearGradient(x + 4, y, x + 26, y + 18);
  flag.addColorStop(0, "#f472b6");
  flag.addColorStop(1, "#db2777");
  ctx.fillStyle = flag;
  ctx.beginPath();
  ctx.moveTo(x + 4, y + 2);
  ctx.quadraticCurveTo(x + 18 + wave, y + 8, x + 24 + wave, y + 4);
  ctx.lineTo(x + 22 + wave, y + 16);
  ctx.quadraticCurveTo(x + 14, y + 18, x + 4, y + 14);
  ctx.closePath();
  ctx.fill();

  // Emblem
  ctx.fillStyle = "#fef08a";
  ctx.beginPath();
  ctx.arc(x + 12 + wave * 0.4, y + 9, 2.5, 0, Math.PI * 2);
  ctx.fill();

  // Base
  ctx.fillStyle = "#78716c";
  ctx.beginPath();
  ctx.moveTo(x - 4, y + goal.h);
  ctx.lineTo(x + 10, y + goal.h);
  ctx.lineTo(x + 6, y + goal.h - 6);
  ctx.lineTo(x, y + goal.h - 6);
  ctx.closePath();
  ctx.fill();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x:number,y:number,w:number,h:number,kind?:string}} plat
 */
export function drawPlatform(ctx, plat) {
  const kind = plat.kind || "stone";
  if (kind === "ground") {
    const g = ctx.createLinearGradient(0, plat.y, 0, plat.y + plat.h);
    g.addColorStop(0, "#4d7c0f");
    g.addColorStop(0.35, "#3f6212");
    g.addColorStop(0.36, "#78716c");
    g.addColorStop(1, "#57534e");
    ctx.fillStyle = g;
    ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
    // Grass tufts
    ctx.fillStyle = "#65a30d";
    for (let x = plat.x + 8; x < plat.x + plat.w; x += 18) {
      ctx.beginPath();
      ctx.moveTo(x, plat.y + 2);
      ctx.lineTo(x + 3, plat.y - 5);
      ctx.lineTo(x + 6, plat.y + 2);
      ctx.fill();
    }
    return;
  }

  if (kind === "wood") {
    const g = ctx.createLinearGradient(0, plat.y, 0, plat.y + plat.h);
    g.addColorStop(0, "#d6a06a");
    g.addColorStop(1, "#92400e");
    ctx.fillStyle = g;
    roundRectPath(ctx, plat.x, plat.y, plat.w, plat.h, 4);
    ctx.fill();
    ctx.strokeStyle = "rgba(69,26,3,0.35)";
    ctx.lineWidth = 1;
    for (let i = 1; i < 3; i++) {
      const yy = plat.y + (plat.h * i) / 3;
      ctx.beginPath();
      ctx.moveTo(plat.x + 4, yy);
      ctx.lineTo(plat.x + plat.w - 4, yy);
      ctx.stroke();
    }
    return;
  }

  // stone
  const g = ctx.createLinearGradient(0, plat.y, 0, plat.y + plat.h);
  g.addColorStop(0, "#a8a29e");
  g.addColorStop(1, "#57534e");
  ctx.fillStyle = g;
  roundRectPath(ctx, plat.x, plat.y, plat.w, plat.h, 5);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.fillRect(plat.x + 3, plat.y + 2, plat.w - 6, 3);
  ctx.strokeStyle = "rgba(28,25,23,0.25)";
  ctx.stroke();
}

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {{x:number,y:number,w:number,s:number}} cloud
 */
export function drawCloud(ctx, cloud) {
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  const { x, y, w } = cloud;
  ctx.beginPath();
  ctx.ellipse(x, y, w * 0.35, 10, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.28, y - 4, w * 0.3, 12, 0, 0, Math.PI * 2);
  ctx.ellipse(x + w * 0.55, y, w * 0.32, 9, 0, 0, Math.PI * 2);
  ctx.fill();
}

function roundCapsule(ctx, x, y, w, h, r) {
  roundRectPath(ctx, x, y, w, h, r);
}

function roundRectPath(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}
