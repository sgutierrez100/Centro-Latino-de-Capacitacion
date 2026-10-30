// Promo of the «Curso de Notario Público para Maryland» (Centro Latino de Capacitación).
// Same animation as the Income Tax promo (TikTok, 22/10/2026): flat city, the camera dives into the office,
// a client story told with chips and cards, then the camera rises to space and ends on the Earth with the contact cards.
// Two formats from the same film: vertical 1080×1920 (TikTok, Instagram, Facebook) and horizontal 1920×1080 (YouTube).
// The voice plays in one piece; everything is timed to its words (datos/promo-md.json). Names and stamp are invented examples.
import { AbsoluteFill, Audio, Sequence, Img, staticFile, useCurrentFrame, useVideoConfig, interpolate, interpolateColors, Easing } from 'remotion';
import { TIGHT } from './fuentes';
import datos from './datos/promo-md.json';

export const FPS_PROMO = 60;
const V0 = 0.6;                                   // the voice starts here (s)
export const DUR_PROMO = V0 + datos.duracion + 2.6; // seconds
const C = {
  crema: '#F8F0E8', crema2: '#FFF8EE', tinta: '#121212', grafito: '#4A4A46', verde: '#0E9F5B', verde2: '#18A957', verdeOsc: '#0B6B3E',
  menta: '#DCEFE4', calle: '#4E4E49', acera: '#EDE3D6', coral: '#EE6C4D', amarillo: '#F2C94C', rosa: '#F4C9C0', cielo: '#8FD0EE', blanco: '#FFFFFF',
};
const EXPO = Easing.bezier(0.16, 1, 0.3, 1); const SUAVE = Easing.bezier(0.65, 0, 0.35, 1);
const cl = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const lin = (t, a, b, de, a2, e = EXPO) => interpolate(t, [a, b], [de, a2], { ...cl, easing: e });
const ap = (t, d, dur = 0.45) => lin(t, d, d + dur, 0, 1);
const logz = (t, a, b, z1, z2, e = SUAVE) => z1 * (z2 / z1) ** lin(t, a, b, 0, 1, e);
// seeded noise (no Math.random)
const rnd = (s) => { let x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// Word times (absolute seconds)
const limpia = (t) => t.toLowerCase().replace(/[¿?¡!.,:;]/g, '');
const P = datos.palabras;
const w = (re, n = 0, desde = 0) => { const m = P.filter((p) => p.de >= desde && re.test(limpia(p.t))); const x = m[n]; return x ? V0 + x.de : null; };
const T = {
  que: w(/^qué$/), notario: w(/^notario$/), publico: w(/^público$/), maryland: w(/^maryland$/), minuto: w(/^minuto$/),
  todos: w(/^todos$/), personas: w(/^personas$/), poderes: w(/^poderes$/), declaraciones: w(/^declaraciones$/), cartas: w(/^cartas$/),
  carlos1: w(/^carlos$/, 0), poder: w(/^poder$/), licencia: w(/^licencia$/), confirma: w(/^confirma$/), el: w(/^él$/), voluntad: w(/^voluntad$/),
  carlos2: w(/^carlos$/, 1), frente: w(/^frente$/), llena: w(/^llena$/), certificado: w(/^certificado$/), sello1: w(/^sello$/, 0), journal1: w(/^journal$/, 0),
  carlos3: w(/^carlos$/, 2), documento: w(/^documento$/), listo: w(/^listo$/), proxima: w(/^próxima$/), regresa: w(/^regresa$/), confianza: w(/^confianza$/),
  para: w(/^para$/), necesitas: w(/^necesitas$/), solicitud: w(/^solicitud$/), clerk: w(/^clerk$/), sello2: w(/^sello$/, 1), journal2: w(/^journal$/, 1),
  aprendelo: w(/^apréndelo$/), espanol: w(/^español$/), linea: w(/^línea$/), ritmo: w(/^ritmo$/), centro: w(/^centro$/), capitulo: w(/^capítulo$/), gratis: w(/^gratis$/),
  escribenos: w(/^escríbenos$/), whatsapp: w(/^whatsapp$/),
};
// the ten digits of the number, in the order they are spoken
const DIGITOS = (() => { const i = P.findIndex((p) => /^whatsapp$/.test(limpia(p.t))); return P.slice(i + 2).map((p) => V0 + p.de); })();
const NUM = '9093440703';

// Scene boundaries
const S = {
  dentro: T.carlos1 - 0.75,   // dive into the office
  sube: T.confianza - 0.1,     // back outside and up to space
  espacio: T.confianza + 1.3,
  fin: DUR_PROMO,
};

// ---------- small pieces ----------
const Entra = ({ t, d, children, style, y = 26 }) => { const v = ap(t, d, 0.42); return <div style={{ opacity: v, transform: `translateY(${(1 - v) * y}px)`, filter: `blur(${(1 - v) * 6}px)`, ...style }}>{children}</div>; };
const Palabras = ({ t, texto, tiempos, color, size }) => (
  <div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: size, lineHeight: 1.02, letterSpacing: -size * 0.035, color }}>
    {texto.split(' ').map((p, i) => { const v = ap(t, tiempos[Math.min(i, tiempos.length - 1)] - 0.08, 0.38); return (
      <span key={i} style={{ display: 'inline-block', opacity: v, transform: `translateY(${(1 - v) * 0.35 * size}px)`, filter: `blur(${(1 - v) * 8}px)`, marginRight: size * 0.22 }}>{p}</span>); })}
  </div>
);
const Check = ({ s = 22, c = C.verde }) => <svg width={s} height={s} viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill={c} /><path d="M7 12.5l3.2 3.2L17.2 8.6" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Chip = ({ t, d, children, size = 30, verde = false }) => { const v = ap(t, d, 0.38); return (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.32, background: verde ? C.verde : C.blanco, color: verde ? C.blanco : C.tinta, borderRadius: 999, padding: `${size * 0.32}px ${size * 0.62}px ${size * 0.32}px ${size * 0.36}px`,
    fontFamily: TIGHT, fontWeight: 800, fontSize: size, boxShadow: '0 10px 24px rgba(20,40,30,0.14)', opacity: v, transform: `translateY(${(1 - v) * 18}px) scale(${0.85 + 0.15 * v})`, transformOrigin: 'left center' }}>
    <Check s={size * 0.95} c={verde ? '#0B6B3E' : C.verde} />{children}</div>); };
// Title block: lines with their word times; it leaves before the next one comes
const Titulo = ({ t, lineas, desde, hasta, size, chips, chipSize, tinta = C.tinta }) => {
  const fuera = 1 - lin(t, hasta - 0.3, hasta, 0, 1, Easing.in(Easing.quad));
  if (t < desde - 0.2 || t > hasta + 0.05) return null;
  return (<div style={{ opacity: fuera, transform: `translateY(${(1 - fuera) * -20}px)` }}>
    {lineas.map(([txt, tiempos, verde], i) => <Palabras key={i} t={t} texto={txt} tiempos={tiempos} color={verde ? C.verde : tinta} size={size} />)}
    {chips && <div style={{ display: 'flex', flexWrap: 'wrap', gap: chipSize * 0.4, marginTop: chipSize * 0.8, maxWidth: size * 11 }}>{chips}</div>}
  </div>);
};

// ---------- illustration ----------
const Persona = ({ x, y, color, t = 0, anda = 0, fase = 0, brazos = 0, saluda = 0, papel = false, nombre, cabello = '#2B2B2B', corbata, escala = 1, mira = 1 }) => {
  // anda: 0..1 walking amount; brazos: 0..1 both arms up; saluda: 0..1 right arm waving
  const p = Math.sin(t * 9 + fase) * anda;
  const leg = (s) => `M0 0 L${s * 14 * p} 62`;
  const armUp = brazos;
  const ola = Math.sin(t * 12) * 0.35 * saluda;
  return (
    <g transform={`translate(${x},${y}) scale(${escala * mira},${escala})`}>
      <ellipse cx="0" cy="168" rx="40" ry="7" fill="rgba(0,0,0,0.08)" />
      {/* legs */}
      <g transform="translate(-11,104)"><path d={leg(1)} stroke={color} strokeWidth="17" strokeLinecap="round" fill="none" /></g>
      <g transform="translate(11,104)"><path d={leg(-1)} stroke={color} strokeWidth="17" strokeLinecap="round" fill="none" /></g>
      {/* body */}
      <path d="M-30 30 Q-32 10 -14 6 L14 6 Q32 10 30 30 L34 112 L-34 112 Z" fill={color} />
      {corbata && <path d="M0 8 L-6 22 L0 70 L6 22 Z" fill={corbata} />}
      {/* arms */}
      <g transform={`translate(-27,22) rotate(${lin(armUp, 0, 1, 8 + p * 22, 150, Easing.linear)})`}><path d="M0 0 L0 58" stroke={color} strokeWidth="15" strokeLinecap="round" /></g>
      <g transform={`translate(27,22) rotate(${lin(Math.max(armUp, saluda), 0, 1, -8 - p * 22, -150, Easing.linear) + ola * 40})`}><path d="M0 0 L0 58" stroke={color} strokeWidth="15" strokeLinecap="round" />
        {papel && <g transform="translate(-14,52) rotate(8)"><rect x="0" y="0" width="30" height="38" rx="3" fill="#fff" stroke="#D5D0C4" strokeWidth="2" /><path d="M6 10h18M6 17h18M6 24h12" stroke="#B8B3A6" strokeWidth="2" /></g>}</g>
      {/* head */}
      <circle cx="0" cy="-16" r="26" fill="#E9A27F" />
      <path d="M-27 -14 Q-28 -46 0 -46 Q28 -46 27 -14 Q20 -30 0 -31 Q-20 -30 -27 -14 Z" fill={cabello} />
      {nombre && <g transform="translate(0,-66)"><rect x={-nombre.length * 6.5 - 12} y="-15" width={nombre.length * 13 + 24} height="28" rx="14" fill="#4A4A46" transform={`scale(${mira},1)`} />
        <text x="0" y="5" textAnchor="middle" fontFamily="Inter Tight CLC, sans-serif" fontWeight="800" fontSize="15" fill="#fff" transform={`scale(${mira},1)`}>{nombre}</text></g>}
    </g>);
};
const Carro = ({ x, y, color, tipo = 'sedan', t, giro = 1 }) => {
  const r = t * 600 * giro;
  const rueda = (cx) => <g transform={`translate(${cx},0)`}><circle r="27" fill="#2B2B2B" /><circle r="12" fill="#D9D9D9" /><g transform={`rotate(${r})`}><path d="M-12 0H12M0 -12V12" stroke="#8A8A8A" strokeWidth="3" /></g></g>;
  if (tipo === 'van') return (<g transform={`translate(${x},${y})`}>
    <rect x="-150" y="-120" width="300" height="104" rx="18" fill={color} /><path d="M150 -60 L190 -40 L190 -16 L150 -16 Z" fill={color} />
    {[-130, -60, 10, 80].map((wx) => <rect key={wx} x={wx} y="-104" width="56" height="40" rx="6" fill="#FFFFFF" opacity="0.8" />)}
    <rect x="182" y="-34" width="10" height="8" rx="2" fill="#FFF3C4" />{rueda(-95)}{rueda(110)}</g>);
  return (<g transform={`translate(${x},${y})`}>
    <path d="M-140 -20 Q-140 -62 -100 -64 L-70 -64 L-40 -104 L60 -104 L100 -64 L130 -60 Q150 -56 150 -30 L150 -16 L-140 -16 Z" fill={color} />
    <path d="M-30 -96 L-56 -66 L0 -66 L0 -96 Z M10 -96 L10 -66 L84 -66 L56 -96 Z" fill="#FFFFFF" opacity="0.8" />
    <rect x="140" y="-46" width="12" height="9" rx="2" fill="#FFF3C4" />{rueda(-80)}{rueda(90)}</g>);
};
const Toldo = ({ x, y, ancho, n }) => { const a = ancho / n; return (<g transform={`translate(${x},${y})`}>
  <rect x="0" y="0" width={ancho} height="16" fill={C.verde2} />
  {Array.from({ length: n }, (_, i) => <path key={i} d={`M${i * a} 16 h${a} v28 a${a / 2} ${a / 2} 0 0 1 ${-a} 0 Z`} fill={i % 2 ? '#FFFFFF' : C.verde2} />)}</g>); };
const Ciudad = ({ x0, ancho, y, seed = 1 }) => {
  const cols = ['#F4C9C0', '#F6DFA0', '#CFE8D8', '#F2D6B8', '#D9E9F2'];
  const ed = []; let x = x0; let k = 0;
  while (x < x0 + ancho) { const wd = 160 + rnd(seed + k) * 140, ht = 260 + rnd(seed + k * 3.1) * 420; ed.push({ x, wd, ht, c: cols[Math.floor(rnd(seed + k * 7.7) * cols.length)] }); x += wd + 10; k++; }
  return (<g>{ed.map((e, i) => (<g key={i}>
    <rect x={e.x} y={y - e.ht} width={e.wd} height={e.ht} fill={e.c} />
    {Array.from({ length: Math.floor(e.ht / 70) }, (_, r) => Array.from({ length: Math.floor(e.wd / 52) }, (_, q) => (
      <rect key={`${r}-${q}`} x={e.x + 16 + q * 52} y={y - e.ht + 22 + r * 70} width="30" height="40" rx="3" fill="#FFFFFF" opacity="0.6" />)))}
  </g>))}</g>);
};
const Arbustos = ({ x0, ancho, y, color = C.verde2, r = 30, seed = 2 }) => (
  <g>{Array.from({ length: Math.ceil(ancho / (r * 1.4)) }, (_, i) => <circle key={i} cx={x0 + i * r * 1.4} cy={y - rnd(seed + i) * r * 0.4} r={r * (0.85 + rnd(seed + i * 2.3) * 0.3)} fill={color} />)}</g>);

// Street outside the office. World: 3000 × 1800. Office front centered at x=1500.
const XW = 3000;
const Exterior = ({ t }) => {
  const autos = [
    { c: C.verde2, tipo: 'sedan', v: 230, x0: -400, carril: 1 }, { c: C.amarillo, tipo: 'van', v: 190, x0: 900, carril: 1 }, { c: C.coral, tipo: 'sedan', v: 260, x0: 2100, carril: 1 },
    { c: '#FFFFFF', tipo: 'van', v: -210, x0: 2600, carril: 0 }, { c: C.amarillo, tipo: 'sedan', v: -240, x0: 1200, carril: 0 },
  ];
  const gente = [
    { c: C.amarillo, v: 95, x0: 650, f: 0 }, { c: '#9A6A4A', v: 82, x0: 520, f: 1.3 }, { c: C.coral, v: 105, x0: 360, f: 2.1 }, { c: '#3A3A3A', v: -88, x0: 2350, f: 0.6 },
    { c: '#E89AB0', v: -100, x0: 2560, f: 1.9 }, { c: '#F0A03C', v: 90, x0: 180, f: 2.7 }, { c: C.verde2, v: -92, x0: 2820, f: 0.2 },
  ];
  const gv = lin(t, T.todos - 0.4, T.todos + 0.6, 0, 1, Easing.linear); // people arrive with "todos los días"
  return (
    <svg width={XW} height="1800" viewBox={`0 0 ${XW} 1800`} style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <rect x="-3000" y="-6000" width="9000" height="7400" fill={C.crema} />
      <Ciudad x0={-400} ancho={3800} y={1150} seed={3} />
      {/* office building */}
      <rect x="1040" y="250" width="920" height="900" fill={C.crema2} />
      <rect x="1020" y="236" width="960" height="26" fill="#E6DDCF" />
      {[0, 1].map((r) => [0, 1, 2, 3].map((q) => <g key={`${r}${q}`}><rect x={1100 + q * 220} y={310 + r * 190} width="140" height="130" rx="6" fill="#FFFFFF" stroke="#D9D2C4" strokeWidth="4" /><path d={`M${1170 + q * 220} ${310 + r * 190}v130`} stroke="#D9D2C4" strokeWidth="4" /></g>))}
      <rect x="1020" y="700" width="960" height="18" fill="#E6DDCF" />
      {/* sign */}
      <rect x="1080" y="738" width="840" height="64" rx="10" fill={C.verde2} />
      <g transform="translate(1290,770)"><rect x="-17" y="-20" width="34" height="40" rx="5" fill="#FFFFFF" /><path d="M-9 -8h18M-9 0h18M-9 8h11" stroke={C.verde2} strokeWidth="3" /></g>
      <text x="1530" y="784" textAnchor="middle" fontFamily="Inter Tight CLC, sans-serif" fontWeight="900" fontSize="40" letterSpacing="6" fill="#FFFFFF">NOTARY PUBLIC</text>
      {/* door */}
      <Toldo x={1090} y={818} ancho={200} n={5} />
      <rect x="1110" y="870" width="160" height="280" rx="6" fill="#E9F3EE" stroke="#4A4A46" strokeWidth="6" />
      <path d="M1250 990v50" stroke="#4A4A46" strokeWidth="6" strokeLinecap="round" />
      <g transform={`translate(1190,${930}) rotate(${Math.sin(t * 2.2) * 3})`}><path d="M-20 -26 L0 -40 L20 -26" stroke="#4A4A46" strokeWidth="3" fill="none" /><rect x="-48" y="-26" width="96" height="34" rx="6" fill={C.verde2} /><text x="0" y="-4" textAnchor="middle" fontFamily="Inter Tight CLC, sans-serif" fontWeight="900" fontSize="15" fill="#fff">ABIERTO</text></g>
      {/* window with the notary inside */}
      <Toldo x={1340} y={818} ancho={560} n={10} />
      <rect x="1360" y="870" width="520" height="250" rx="6" fill="#F7EFE2" stroke="#4A4A46" strokeWidth="6" />
      <Persona x={1640} y={952} color={C.verde2} corbata={C.verdeOsc} t={t} escala={0.62} />
      <rect x="1540" y="1032" width="230" height="16" fill="#3A3A3A" /><rect x="1600" y="996" width="90" height="38" rx="4" fill="#2E2E2E" /><rect x="1606" y="1000" width="78" height="30" rx="3" fill={C.verde2} />
      <path d="M1620 870v250" stroke="#4A4A46" strokeWidth="5" />
      {[1010, 1990].map((px) => <g key={px}><rect x={px - 30} y="1092" width="60" height="58" rx="6" fill="#3A3A3A" /><circle cx={px} cy="1076" r="34" fill={C.verde2} /></g>)}
      {/* sidewalk, road, bushes */}
      <rect x="-3000" y="1150" width="9000" height="110" fill={C.acera} />
      {Array.from({ length: 70 }, (_, i) => <path key={i} d={`M${-600 + i * 80} 1150v110`} stroke="#E2D6C6" strokeWidth="3" />)}
      <rect x="-3000" y="1260" width="9000" height="190" fill={C.calle} />
      {Array.from({ length: 60 }, (_, i) => <rect key={i} x={-600 + i * 110 - ((t * 0) % 110)} y="1350" width="60" height="9" rx="4" fill="#E9E2D6" />)}
      {gente.map((g, i) => { const x = ((g.x0 + g.v * t) % 3400 + 3400) % 3400 - 200; return <g key={i} opacity={gv}><Persona x={x} y={1052} color={g.c} t={t} anda={1} fase={g.f} papel={i % 2 === 0} mira={g.v > 0 ? 1 : -1} escala={0.72} /></g>; })}
      {autos.map((a, i) => { const x = ((a.x0 + a.v * t) % 3800 + 3800) % 3800 - 400; const y = a.carril ? 1440 : 1340; return <g key={i} transform={a.v < 0 ? `translate(${2 * x},0) scale(-1,1)` : ''}><Carro x={x} y={y} color={a.c} tipo={a.tipo} t={t} giro={1} /></g>; })}
      <rect x="-3000" y="1450" width="9000" height="3000" fill="#BFE3CC" />
      <Arbustos x0={-600} ancho={4200} y={1470} color={C.verde2} r={34} seed={5} />
      <Arbustos x0={-640} ancho={4200} y={1600} color="#CFEBD8" r={60} seed={9} />
      <Arbustos x0={-600} ancho={4200} y={1720} color={C.verde2} r={70} seed={13} />
      {/* sky above the building, up to space */}
      <defs><linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#070A12" /><stop offset="0.4" stopColor="#0E1830" /><stop offset="0.62" stopColor="#7CC3E8" /><stop offset="0.82" stopColor={C.crema} /></linearGradient></defs>
      <rect x="-3000" y="-4200" width="9000" height="4300" fill="url(#cielo)" />
      {Array.from({ length: 220 }, (_, i) => <circle key={i} cx={-1500 + rnd(i * 1.7) * 6000} cy={-4200 + rnd(i * 3.3) * 2400} r={1.2 + rnd(i * 5.1) * 2.4} fill="#FFFFFF" opacity={0.35 + 0.65 * Math.abs(Math.sin(t * 1.3 + i))} />)}
    </svg>);
};

// Inside the office. World: 2400 × 1500, key content between x=650 and x=1750.
const Interior = ({ t }) => {
  // Carlos walks in, raises his arms with the document, walks out at "la próxima vez" and comes back at "regresa"
  const cx = lin(t, T.carlos1 - 0.3, T.carlos1 + 1.4, 420, 1080, SUAVE);
  const sale = lin(t, T.proxima - 0.35, T.proxima + 0.45, 0, 1, SUAVE);
  const vuelve = lin(t, T.regresa - 0.25, T.regresa + 0.75, 0, 1, SUAVE);
  const x = cx - 330 * sale + 330 * vuelve;
  const anda = (t > T.carlos1 - 0.3 && t < T.carlos1 + 1.4) || (sale > 0 && sale < 1) || (vuelve > 0 && vuelve < 1) ? 1 : 0;
  const mira = sale > 0 && vuelve === 0 ? -1 : 1;
  const brazos = lin(t, T.listo - 0.15, T.listo + 0.25, 0, 1) * (1 - lin(t, T.proxima - 0.45, T.proxima - 0.2, 0, 1));
  const notBrazo = lin(t, T.confianza - 0.4, T.confianza, 0, 1);
  return (
    <svg width="2400" height="1500" viewBox="0 0 2400 1500" style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }}>
      <rect x="-2000" y="-2000" width="6400" height="3000" fill={C.crema} />
      <rect x="-2000" y="640" width="6400" height="300" fill={C.menta} />
      <rect x="-2000" y="630" width="6400" height="14" fill="#EAE2D4" />
      {/* clock, wall cards, calendar, window */}
      <g transform="translate(1530,566)"><circle r="38" fill="#FFFFFF" stroke="#4A4A46" strokeWidth="6" /><path d={`M0 0L0 -22M0 0L${16 * Math.cos(t)} ${16 * Math.sin(t)}`} stroke="#4A4A46" strokeWidth="5" strokeLinecap="round" /></g>
      {[1070, 1210].map((wx) => <g key={wx}><rect x={wx} y="520" width="120" height="84" rx="8" fill="#FFFFFF" stroke="#E0D8CA" strokeWidth="3" /><path d={`M${wx + 16} 550h88M${wx + 16} 572h60`} stroke="#D9D2C4" strokeWidth="6" strokeLinecap="round" /><circle cx={wx + 100} cy="588" r="7" fill={C.verde2} /></g>)}
      <g transform="translate(1360,500)"><rect width="96" height="106" rx="10" fill="#FFFFFF" stroke="#E0D8CA" strokeWidth="3" /><rect width="96" height="27" rx="8" fill={C.verde2} /><text x="48" y="20" textAnchor="middle" fontFamily="Inter Tight CLC, sans-serif" fontWeight="800" fontSize="14" fill="#fff">OCT</text><text x="48" y="86" textAnchor="middle" fontFamily="Inter Tight CLC, sans-serif" fontWeight="900" fontSize="48" fill="#121212">30</text></g>
      <rect x="1620" y="330" width="220" height="290" rx="8" fill="#E8F1F5" stroke="#D9D2C4" strokeWidth="6" />{[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M1632 ${366 + i * 42}h196`} stroke="#D3DFE6" strokeWidth="10" />)}
      {/* floor, sidewalk and road in front of the window */}
      <rect x="-2000" y="940" width="6400" height="200" fill="#EFE4D6" />
      {Array.from({ length: 50 }, (_, i) => <path key={i} d={`M${-400 + i * 90} 940v200`} stroke="#E4D7C6" strokeWidth="3" />)}
      <rect x="-2000" y="1140" width="6400" height="180" fill={C.calle} />
      {Array.from({ length: 50 }, (_, i) => <rect key={i} x={-400 + i * 120} y="1226" width="64" height="9" rx="4" fill="#E9E2D6" />)}
      <rect x="-2000" y="1320" width="6400" height="2000" fill="#BFE3CC" />
      <Arbustos x0={-600} ancho={4200} y={1340} color={C.verde2} r={32} seed={21} />
      {/* desk with the notary */}
      <Persona x={1340} y={760} color={C.verde2} corbata={C.verdeOsc} t={t} saluda={notBrazo} nombre={lin(t, T.confianza - 0.4, T.confianza, 0, 1) > 0.5 ? 'Notario' : undefined} />
      <rect x="1180" y="860" width="420" height="22" fill="#2E2E2E" /><path d="M1200 882v70M1580 882v70" stroke="#2E2E2E" strokeWidth="12" />
      <rect x="1290" y="790" width="130" height="72" rx="6" fill="#2E2E2E" /><rect x="1298" y="797" width="114" height="58" rx="4" fill={C.verde2} />
      <path d="M1500 860 L1520 800 L1560 780" stroke="#2E2E2E" strokeWidth="8" fill="none" strokeLinecap="round" /><path d="M1548 766 l30 10 -14 24 Z" fill="#2E2E2E" />
      <rect x="1640" y="760" width="110" height="190" rx="6" fill="#3A3A3A" />{[0, 1, 2].map((i) => <path key={i} d={`M1660 ${800 + i * 56}h70`} stroke="#5A5A54" strokeWidth="6" />)}
      <g transform="translate(1810,880)"><rect x="-24" y="20" width="48" height="56" rx="6" fill="#3A3A3A" /><circle r="44" fill={C.verde2} /></g>
      {/* Carlos */}
      <Persona x={x} y={770} color={C.coral} t={t} anda={anda} papel nombre="Carlos" brazos={brazos} mira={mira} />
    </svg>);
};

// The document card (power of attorney) with the signature, the certificate, the stamp and the journal
const Documento = ({ t, s }) => {
  const v = ap(t, T.carlos2 - 0.2, 0.5);
  const fuera = lin(t, T.carlos3 - 0.1, T.carlos3 + 0.6, 0, 1, SUAVE);
  if (v <= 0 || fuera >= 1) return null;
  const firma = lin(t, T.frente - 0.1, T.frente + 1.0, 0, 1, Easing.linear);
  const cert = lin(t, T.certificado - 0.2, T.certificado + 0.6, 0, 1, Easing.linear);
  const sel = ap(t, T.sello1 - 0.12, 0.22);
  const jv = ap(t, T.journal1 - 0.25, 0.4);
  const fila = lin(t, T.journal1, T.journal1 + 0.8, 0, 1, Easing.linear);
  return (
    <div style={{ display: 'flex', gap: 22 * s, alignItems: 'flex-start', opacity: v * (1 - fuera), transform: `translateY(${(1 - v) * 30 * s + fuera * 60 * s}px) scale(${1 - fuera * 0.3})`, transformOrigin: 'left top' }}>
      <div style={{ width: 430 * s, background: '#FFFFFF', borderRadius: 18 * s, boxShadow: '0 18px 40px rgba(20,40,30,0.16)', padding: `${24 * s}px ${26 * s}px`, position: 'relative' }}>
        <div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 28 * s, color: C.tinta }}>Power of Attorney</div>
        {[1, 0.92, 0.8, 0.95, 0.6].map((k, i) => <div key={i} style={{ height: 9 * s, width: `${k * 100}%`, background: '#E7E2D8', borderRadius: 5, marginTop: 12 * s }} />)}
        <svg width={260 * s} height={70 * s} viewBox="0 0 260 70" style={{ marginTop: 10 * s }}>
          <path d="M8 50 C30 10 46 12 40 40 C36 62 70 8 84 30 C96 50 104 20 120 34 C136 48 150 22 170 30 C190 38 210 26 240 32" fill="none" stroke="#1F3A68" strokeWidth="4.5" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - firma} />
          <path d="M4 62H250" stroke="#4A4A46" strokeWidth="2" />
        </svg>
        <div style={{ marginTop: 8 * s, padding: `${10 * s}px ${12 * s}px`, borderRadius: 10 * s, background: '#F6F9F7', border: `${2 * s}px dashed ${cert > 0 ? C.verde : '#DDD'}` }}>
          <div style={{ fontFamily: TIGHT, fontWeight: 800, fontSize: 15 * s, color: C.verde, letterSpacing: 1.5 }}>NOTARIAL CERTIFICATE</div>
          {[0.9, 0.7].map((k, i) => <div key={i} style={{ height: 8 * s, width: `${k * 100 * Math.min(1, cert * 1.4 - i * 0.4)}%`, background: '#9CCDB3', borderRadius: 4, marginTop: 9 * s }} />)}
        </div>
        <div style={{ position: 'absolute', right: 20 * s, bottom: 26 * s, opacity: sel, transform: `scale(${1.6 - 0.6 * sel}) rotate(-8deg)`, border: `${4 * s}px double #1F3A68`, borderRadius: 12 * s, padding: `${6 * s}px ${10 * s}px`, textAlign: 'center', fontFamily: TIGHT, fontWeight: 900, color: '#1F3A68', background: 'rgba(247,249,253,0.92)' }}>
          <div style={{ fontSize: 13 * s }}>JOSÉ L. MARTÍNEZ</div><div style={{ fontSize: 11 * s }}>NOTARY PUBLIC</div><div style={{ fontSize: 11 * s }}>MONTGOMERY COUNTY</div></div>
      </div>
      <div style={{ opacity: jv, transform: `translateX(${(1 - jv) * 40}px)`, width: 190 * s, background: '#7A3E1D', borderRadius: `${8 * s}px ${18 * s}px ${18 * s}px ${8 * s}px`, borderLeft: `${12 * s}px solid #5A2C13`, padding: `${16 * s}px ${14 * s}px`, boxShadow: '0 18px 36px rgba(0,0,0,0.2)' }}>
        <div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 20 * s, color: '#F3E3C8', letterSpacing: 1 }}>JOURNAL</div>
        <div style={{ background: '#FFF8EC', borderRadius: 6 * s, marginTop: 10 * s, padding: `${8 * s}px` }}>
          {[1, 2, 3].map((i) => <div key={i} style={{ height: 7 * s, width: `${(i === 3 ? fila : 1) * 100}%`, background: i === 3 ? C.verde : '#D9CFBC', borderRadius: 4, marginTop: i > 1 ? 8 * s : 0 }} />)}
        </div>
      </div>
    </div>);
};
// Driver's license card next to Carlos
const Licencia = ({ t, s }) => {
  const v = ap(t, T.licencia - 0.15, 0.4); const fuera = lin(t, T.carlos2 - 0.4, T.carlos2, 0, 1);
  if (v <= 0 || fuera >= 1) return null;
  return (<div style={{ display: 'inline-flex', gap: 14 * s, alignItems: 'center', background: '#FFFFFF', borderRadius: 16 * s, padding: `${12 * s}px ${18 * s}px ${12 * s}px ${12 * s}px`, boxShadow: '0 14px 32px rgba(20,40,30,0.16)', opacity: v * (1 - fuera), transform: `scale(${0.8 + 0.2 * v})`, transformOrigin: 'left center' }}>
    <div style={{ width: 64 * s, height: 64 * s, borderRadius: 10 * s, background: '#E9F3EE', display: 'grid', placeItems: 'center' }}><svg width={44 * s} height={44 * s} viewBox="0 0 24 24"><circle cx="12" cy="9" r="4" fill={C.coral} /><path d="M4 21c1.2-4 4.4-6 8-6s6.8 2 8 6" fill={C.coral} /></svg></div>
    <div><div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 24 * s, color: C.tinta }}>Licencia de manejo</div>
      <div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 17 * s, color: C.grafito }}>Carlos A. Ramírez · Maryland</div></div></div>);
};

// Space: the Earth rising from the bottom. Continents are smooth closed curves in units of the radius.
const suave = (pts) => {
  const n = pts.length; let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let k = 0; k < n; k++) {
    const p0 = pts[(k - 1 + n) % n], p1 = pts[k], p2 = pts[(k + 1) % n], p3 = pts[(k + 2) % n];
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
  }
  return d + 'Z';
};
const CONTINENTES = [
  [[-0.62, -0.78], [-0.36, -0.9], [-0.05, -0.86], [0.12, -0.72], [0.06, -0.56], [-0.04, -0.46], [-0.08, -0.32], [-0.2, -0.2], [-0.33, -0.26], [-0.46, -0.4], [-0.66, -0.55]],
  [[-0.14, -0.12], [0.06, -0.08], [0.22, 0.02], [0.24, 0.18], [0.14, 0.38], [0.03, 0.6], [-0.05, 0.54], [-0.08, 0.34], [-0.16, 0.12]],
  [[0.42, -0.6], [0.64, -0.66], [0.82, -0.5], [0.88, -0.22], [0.78, 0.04], [0.64, 0.22], [0.56, 0.06], [0.5, -0.16], [0.4, -0.38]],
  [[-0.98, -0.2], [-0.78, -0.3], [-0.7, -0.1], [-0.82, 0.08], [-0.98, 0.02]],
];
const Tierra = ({ t, W, H, vertical }) => {
  const v = lin(t, S.espacio - 0.5, S.espacio + 1.3, 0, 1, EXPO);
  const R = vertical ? W * 0.92 : W * 0.6;
  const cxp = vertical ? W * 0.5 : W * 0.68;
  const cy = (vertical ? H * 0.53 : H * 0.42) + R + (1 - v) * R * 0.8;
  const giro = -8 + (t - S.espacio) * 1.6;
  return (
    <svg width={W} height={H} style={{ position: 'absolute', left: 0, top: 0 }}>
      <defs>
        <radialGradient id="atm" cx="50%" cy="50%" r="50%"><stop offset="0.9" stopColor="#7FD3F5" stopOpacity="0.5" /><stop offset="1" stopColor="#7FD3F5" stopOpacity="0" /></radialGradient>
        <radialGradient id="mar" cx="38%" cy="22%" r="85%"><stop offset="0" stopColor="#8ED6F3" /><stop offset="1" stopColor="#3B93CC" /></radialGradient>
        <radialGradient id="sombra" cx="35%" cy="25%" r="75%"><stop offset="0.6" stopColor="#0B1F3A" stopOpacity="0" /><stop offset="1" stopColor="#0B1F3A" stopOpacity="0.35" /></radialGradient>
        <clipPath id="esfera"><circle cx={cxp} cy={cy} r={R} /></clipPath>
      </defs>
      <circle cx={cxp} cy={cy} r={R * 1.06} fill="url(#atm)" opacity={v} />
      <circle cx={cxp} cy={cy} r={R} fill="url(#mar)" />
      <g clipPath="url(#esfera)"><g transform={`translate(${cxp} ${cy}) rotate(${giro}) scale(${R})`}>
        {CONTINENTES.map((c, k) => <path key={k} d={suave(c)} fill={k === 2 ? '#4FBE63' : '#5CC86B'} />)}
      </g></g>
      <circle cx={cxp} cy={cy} r={R} fill="url(#sombra)" />
    </svg>);
};

// Contact cards (end)
const Tarjetas = ({ t, s }) => {
  const v1 = ap(t, T.centro - 0.15, 0.45), v2 = ap(t, T.escribenos - 0.1, 0.45);
  const n = DIGITOS.filter((d) => t >= d - 0.05).length;
  const txt = NUM.slice(0, n);
  const fmt = txt.length <= 3 ? `(${txt}` + (txt.length === 3 ? ')' : '') : txt.length <= 6 ? `(${txt.slice(0, 3)}) ${txt.slice(3)}` : `(${txt.slice(0, 3)}) ${txt.slice(3, 6)}-${txt.slice(6)}`;
  const cursor = n < 10 && t > T.whatsapp && Math.floor(t * 3) % 2 === 0;
  const tarjeta = (v, hijo) => <div style={{ display: 'flex', alignItems: 'center', gap: 18 * s, background: '#FFFFFF', borderRadius: 20 * s, padding: `${16 * s}px ${22 * s}px`, boxShadow: '0 18px 40px rgba(0,0,0,0.25)', opacity: v, transform: `translateY(${(1 - v) * 30}px)` }}>{hijo}</div>;
  return (<div style={{ display: 'flex', flexDirection: 'column', gap: 16 * s }}>
    {v1 > 0 && tarjeta(v1, <><Img src={staticFile('logo-globo.png')} style={{ width: 56 * s, height: 56 * s }} />
      <div><div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 30 * s, color: C.tinta }}>Centro Latino de Capacitación</div>
        <div style={{ fontFamily: TIGHT, fontWeight: 600, fontSize: 20 * s, color: C.grafito }}>centrolatinodecapacitacion.com</div></div></>)}
    {v2 > 0 && tarjeta(v2, <><div style={{ width: 56 * s, height: 56 * s, borderRadius: '50%', background: '#25D366', display: 'grid', placeItems: 'center' }}>
      <svg width={30 * s} height={30 * s} viewBox="0 0 24 24"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" fill="#fff" /></svg></div>
      <div><div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 19 * s, color: C.grafito }}>Escríbenos por WhatsApp</div>
        <div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 44 * s, color: C.tinta, letterSpacing: -1, minWidth: 320 * s }}>{fmt}<span style={{ opacity: cursor ? 1 : 0, color: C.verde }}>|</span></div></div></>)}
  </div>);
};

// ---------- the film ----------
export const PromoNotarioMD = ({ formato = 'vertical', musica = 'musica-clc.mp3' }) => {
  const frame = useCurrentFrame(); const { fps, width: W, height: H } = useVideoConfig();
  const t = frame / fps;
  const vertical = formato === 'vertical';
  const s = vertical ? 1 : 0.86;                 // size of type and cards
  const foco = vertical ? { x: W * 0.5, y: H * 0.6 } : { x: W * 0.62, y: H * 0.56 };

  // Exterior camera: wide street → office front → dive into the window; later back out and up to space
  const zE0 = vertical ? 0.6 : 0.6, zE1 = vertical ? 1.05 : 0.86;
  let ex = { x: 1500, y: 960, z: logz(t, 0.2, 4.8, zE0, zE1) };
  ex.z = ex.z * (1 + 0.02 * Math.sin(t * 0.4));
  const buceo = lin(t, S.dentro, S.dentro + 0.9, 0, 1, SUAVE);
  if (t > S.dentro) ex = { x: 1500 + 120 * buceo, y: 960 + 30 * buceo, z: logz(t, S.dentro, S.dentro + 0.9, zE1, zE1 * 3.4) };
  const sube = lin(t, S.sube + 0.45, S.sube + 1.6, 0, 1, SUAVE);
  if (t > S.sube) ex = { x: 1500, y: 960 - sube * 3700, z: logz(t, S.sube, S.sube + 0.7, zE1 * 2.6, zE1 * 0.9) };
  const verExt = t < S.dentro + 0.9 || t > S.sube;
  const opExt = 1;

  // Interior camera
  const zI = vertical ? 2.0 : 1.5;
  const entra = lin(t, S.dentro + 0.35, S.dentro + 1.0, 0, 1, SUAVE);
  // the camera follows Carlos in, then settles between him and the notary
  const sigue = lin(t, T.carlos1 - 0.3, T.carlos1 + 1.6, 0, 1, SUAVE);
  let inn = { x: 1060 + 150 * sigue, y: vertical ? 850 : 814, z: logz(t, S.dentro + 0.3, S.dentro + 1.1, zI * 0.42, zI) * (1 + 0.03 * lin(t, T.carlos1, T.carlos2, 0, 1, Easing.linear)) };
  const firmaZ = lin(t, T.carlos2 - 0.4, T.carlos2 + 0.6, 0, 1, SUAVE) * (1 - lin(t, T.carlos3 - 0.2, T.carlos3 + 0.8, 0, 1, SUAVE));
  inn = { x: inn.x + 30 * firmaZ, y: inn.y - 40 * firmaZ, z: inn.z * (1 + 0.08 * firmaZ) };
  if (t > S.sube) inn = { ...inn, z: logz(t, S.sube, S.sube + 0.6, zI, zI * 0.45) };
  const verInt = t > S.dentro + 0.3 && t < S.sube + 0.6;
  const opInt = entra * (1 - lin(t, S.sube + 0.05, S.sube + 0.32, 0, 1, Easing.linear));

  const espacio = lin(t, S.sube + 0.75, S.sube + 1.3, 0, 1, Easing.linear); // 0 cream … 1 space (for the HUD colors)
  const cam = (c) => `translate(${foco.x}px, ${foco.y}px) scale(${c.z}) translate(${-c.x}px, ${-c.y}px)`;

  const ts = vertical ? 90 : 80, chs = vertical ? 40 : 32;
  const bloque = { position: 'absolute', left: vertical ? 70 : 110, top: vertical ? 178 : 150, right: vertical ? 50 : W * 0.42 };
  const tinta = interpolateColors(espacio, [0, 1], [C.tinta, '#FFFFFF']);

  const titulos = [
    { desde: T.que, hasta: T.todos - 0.15, lineas: [['¿Qué hace un', [T.que, T.que + 0.2, T.que + 0.35]], ['notario público', [T.notario, T.publico], true], ['en Maryland?', [T.maryland - 0.1, T.maryland]]] },
    { desde: T.todos, hasta: T.carlos1 - 0.2, lineas: [['Todos los días', [T.todos, T.todos + 0.3, T.todos + 0.55], true], ['muchas personas', [T.personas - 0.3, T.personas]]],
      chips: [[T.poderes, 'Poderes'], [T.declaraciones, 'Declaraciones juradas'], [T.cartas, 'Cartas']] },
    { desde: T.carlos1, hasta: T.confirma - 0.15, lineas: [['Carlos llega con', [T.carlos1, T.carlos1 + 0.35, T.carlos1 + 0.6]], ['su poder notarial', [T.poder - 0.15, T.poder, T.poder + 0.35], true]] },
    { desde: T.confirma, hasta: T.carlos2 - 0.2, lineas: [['El notario', [T.confirma - 0.4, T.confirma - 0.2]], ['confirma', [T.confirma], true]],
      chips: [[T.el - 0.1, 'Que es él'], [T.voluntad - 0.3, 'Que firma por su voluntad']] },
    { desde: T.carlos2, hasta: T.llena - 0.15, lineas: [['Carlos firma', [T.carlos2, T.carlos2 + 0.45]], ['frente al notario', [T.frente, T.frente + 0.3, T.frente + 0.5], true]] },
    { desde: T.llena, hasta: T.carlos3 - 0.2, lineas: [['Certificado,', [T.certificado]], ['sello y journal', [T.sello1, T.sello1 + 0.4, T.journal1], true]] },
    { desde: T.carlos3, hasta: T.proxima - 0.25, lineas: [['Carlos sale con', [T.carlos3, T.carlos3 + 0.4, T.carlos3 + 0.7]], ['su documento listo', [T.documento - 0.15, T.documento, T.listo], true]] },
    { desde: T.proxima - 0.15, hasta: S.sube + 0.3, lineas: [['Y la próxima vez', [T.proxima - 0.25, T.proxima - 0.15, T.proxima, T.proxima + 0.3]], ['regresa', [T.regresa], true]] },
    { desde: T.para, hasta: T.aprendelo - 0.2, lineas: [['Para ser notario', [T.para, T.para + 0.25, T.para + 0.45]], ['necesitas:', [T.necesitas], true]],
      chips: [[T.solicitud - 0.2, 'Hacer tu solicitud'], [T.clerk - 0.5, 'Jurar ante el Clerk'], [T.sello2 - 0.3, 'Tu sello y tu journal']], columna: true },
    { desde: T.aprendelo, hasta: S.fin + 1, lineas: [['Apréndelo con', [T.aprendelo, T.aprendelo + 0.35]], ['nosotros', [T.aprendelo + 0.6], true]],
      chips: [[T.espanol - 0.1, 'En español'], [T.linea - 0.1, 'En línea'], [T.ritmo - 0.1, 'A tu ritmo']], extra: true },
  ];

  return (
    <AbsoluteFill style={{ background: C.crema, overflow: 'hidden' }}>
      {verExt && <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: cam(ex), opacity: opExt }}><Exterior t={t} /></div>}
      {verInt && <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: cam(inn), opacity: opInt }}><Interior t={t} /></div>}
      {t > S.espacio - 0.6 && <Tierra t={t} W={W} H={H} vertical={vertical} />}

      {/* cards floating over the office (licencia, documento) */}
      <div style={{ position: 'absolute', left: vertical ? 70 : 110, top: vertical ? 490 : 420 }}>
        <Licencia t={t} s={vertical ? 1.3 : 1} />
      </div>
      <div style={{ position: 'absolute', left: vertical ? 70 : 110, top: vertical ? 395 : 360 }}>
        <Documento t={t} s={vertical ? 1.2 : 0.95} />
      </div>

      {/* titles */}
      <div style={bloque}>
        {titulos.map((b, i) => (
          <Titulo key={i} t={t} desde={b.desde} hasta={b.hasta} size={ts} chipSize={chs} tinta={tinta} lineas={b.lineas.map(([a, tt, v]) => [a, tt, v])}
            chips={b.chips && <div style={{ display: 'flex', flexDirection: b.columna ? 'column' : 'row', flexWrap: 'wrap', gap: chs * 0.4, alignItems: 'flex-start' }}>
              {b.chips.map(([d, txt]) => <Chip key={txt} t={t} d={d} size={chs}>{txt}</Chip>)}
              {b.extra && <div style={{ flexBasis: '100%', height: 0 }} />}
              {b.extra && <Chip t={t} d={T.capitulo - 0.2} size={chs} verde>El primer capítulo es gratis</Chip>}
            </div>} />
        ))}
      </div>

      {/* contact cards */}
      <div style={{ position: 'absolute', left: vertical ? 60 : 110, right: vertical ? 60 : undefined, top: vertical ? undefined : H * 0.56, bottom: vertical ? 300 : undefined, width: vertical ? undefined : 840 }}>
        <Tarjetas t={t} s={vertical ? 1.15 : 1.1} />
      </div>

      {/* HUD */}
      <Hud t={t} W={W} vertical={vertical} tinta={tinta} />
      <Sonido musica={musica} />
    </AbsoluteFill>
  );
};

const Hud = ({ t, W, vertical, tinta }) => {
  const izq = vertical ? 70 : 110;
  return (<>
    <div style={{ position: 'absolute', left: izq, top: vertical ? 92 : 56, fontFamily: TIGHT, fontWeight: 800, fontSize: vertical ? 23 : 19, letterSpacing: 4, color: tinta, opacity: 0.85 }}>NOTARIO PÚBLICO · MARYLAND</div>
    <Img src={staticFile('logo-globo.png')} style={{ position: 'absolute', right: izq, top: vertical ? 80 : 46, width: vertical ? 50 : 40, height: vertical ? 50 : 40 }} />
    <div style={{ position: 'absolute', left: izq, right: izq, top: vertical ? 140 : 96, height: 3, background: 'rgba(128,128,128,0.18)', borderRadius: 2 }}>
      <div style={{ height: 3, borderRadius: 2, background: C.verde, width: `${(t / DUR_PROMO) * 100}%` }} /></div>
  </>);
};

// Effects already peak at −13 dBFS (sonidos.py).
const efectos = () => {
  const fx = [['swoosh', 0.2], ['swoosh', S.dentro], ['swoosh', S.sube], ['swoosh', S.sube + 0.9]];
  [T.poderes, T.declaraciones, T.cartas].forEach((d) => fx.push(['ui-pop', d]));
  fx.push(['papel', T.licencia - 0.15], ['check', T.el - 0.1], ['check', T.voluntad - 0.3]);
  fx.push(['papel', T.carlos2 - 0.2], ['pluma', T.frente], ['pluma', T.certificado - 0.1], ['sello', T.sello1 - 0.05], ['papel', T.journal1 - 0.2]);
  fx.push(['check', T.listo], ['ui-pop', T.regresa]);
  [T.solicitud - 0.2, T.clerk - 0.5, T.sello2 - 0.3].forEach((d) => fx.push(['check', d]));
  [T.espanol, T.linea, T.ritmo].forEach((d) => fx.push(['ui-pop', d - 0.1]));
  fx.push(['papel', T.centro - 0.15], ['check', T.capitulo - 0.2], ['papel', T.escribenos - 0.1]);
  DIGITOS.forEach((d) => fx.push(['tick', d - 0.05]));
  fx.push(['chime', DIGITOS.at(-1) + 0.4]);
  return fx.filter(([, d]) => d != null);
};
const Sonido = ({ musica }) => {
  const { fps } = useVideoConfig();
  const enVoz = (t) => interpolate(t, [V0 - 0.3, V0, V0 + datos.duracion, V0 + datos.duracion + 0.5], [0, 1, 1, 0], cl);
  const vol = (fr) => { const t = fr / fps; return (0.24 - 0.14 * enVoz(t)) * lin(t, 0, 0.6, 0, 1, Easing.linear) * (1 - lin(t, DUR_PROMO - 1.2, DUR_PROMO, 0, 1, Easing.linear)); };
  return (<>
    <Audio src={staticFile(musica)} volume={vol} loop />
    <Sequence from={Math.round(V0 * fps)}><Audio src={staticFile('promo-md/voz.mp3')} /></Sequence>
    {efectos().map(([nm, d], k) => <Sequence key={k} from={Math.max(0, Math.round(d * fps))} durationInFrames={150}><Audio src={staticFile(`sfx/${nm}.mp3`)} /></Sequence>)}
  </>);
};
