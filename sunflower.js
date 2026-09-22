/* Dibuja un girasol en SVG: pesa poco, se ve nítido en cualquier pantalla
   y no depende de ninguna imagen externa. Lo usan index.html y tools/og.html. */
function sunflowerSVG() {
  const petalCount = 13;
  const outer = [];
  const inner = [];

  for (let i = 0; i < petalCount; i++) {
    const angle = (360 / petalCount) * i;
    outer.push(
      `<ellipse cx="50" cy="42" rx="9.5" ry="27" fill="url(#petalBack)"
        transform="rotate(${angle + 13} 50 72)"/>`
    );
    inner.push(
      `<ellipse cx="50" cy="48" rx="8.5" ry="24" fill="url(#petalFront)"
        transform="rotate(${angle} 50 72)"/>`
    );
  }

  // Semillas en anillos, para que el centro no se vea como un círculo plano.
  const seeds = [];
  for (let ring = 1; ring <= 3; ring++) {
    const count = ring * 6;
    for (let i = 0; i < count; i++) {
      const a = ((Math.PI * 2) / count) * i + ring * 0.4;
      const r = ring * 4.6;
      seeds.push(
        `<circle cx="${(50 + Math.cos(a) * r).toFixed(1)}"
          cy="${(72 + Math.sin(a) * r).toFixed(1)}" r="1.5" fill="#4a2d14" opacity=".55"/>`
      );
    }
  }

  return `
<svg class="sunflower" viewBox="0 0 100 300" preserveAspectRatio="xMidYMax meet" role="presentation">
  <defs>
    <linearGradient id="petalFront" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffe07a"/>
      <stop offset="1" stop-color="#f6a800"/>
    </linearGradient>
    <linearGradient id="petalBack" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffc93c"/>
      <stop offset="1" stop-color="#e08e00"/>
    </linearGradient>
    <radialGradient id="seedHead">
      <stop offset="0" stop-color="#7d4f22"/>
      <stop offset="1" stop-color="#57351a"/>
    </radialGradient>
  </defs>

  <path d="M50 300 C 46 230 54 180 50 120" stroke="#4e8c3c" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M50 214 C 26 210 14 224 10 240 C 30 244 46 236 50 214Z" fill="#57a03f"/>
  <path d="M50 178 C 74 174 86 186 90 202 C 70 206 54 200 50 178Z" fill="#4b8f37"/>

  <g>
    ${outer.join("")}
    ${inner.join("")}
    <circle cx="50" cy="72" r="21" fill="url(#seedHead)"/>
    ${seeds.join("")}
    <circle cx="50" cy="72" r="21" fill="none" stroke="#f6a800" stroke-width="2.5" opacity=".7"/>
  </g>
</svg>`;
}
