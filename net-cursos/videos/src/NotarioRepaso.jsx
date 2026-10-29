// Lesson 9.1 «Repaso final» of the Maryland course (horizontal 1920×1080, course video, about 5 and a half minutes).
// Same style as 4.3 and 5.1: lesson map, canvas WITHOUT a line, the camera snakes through one panel per idea, chapter by chapter.
// Every fact comes from the published lessons 1.2–8.2 (SG Title 18; COMAR 01.02.08; SOS FAQ). Names and dates are invented examples.
import { AbsoluteFill, Sequence, Audio, Img, staticFile, useCurrentFrame, interpolate, Easing } from 'remotion';
import { TIGHT } from './fuentes';
import datos from './datos/notario-9-1.json';

const P = { tinta: '#111111', grafito: '#4A4A46', blanco: '#FFFFFF', esmeralda: '#0E9F5B', coral: '#FF6B4A', rojo: '#E5484D', azul: '#1E88D6', sol: '#FFC93C', naranja: '#F28C28', morado: '#7B61FF', ocre: '#C08A00', turquesa: '#12A4A0' };
export const FPS_IN = 60; const K = FPS_IN / 30; const W = 1920, H = 1080;
const EXPO = Easing.bezier(0.16, 1, 0.3, 1); const SUAVE = Easing.bezier(0.65, 0, 0.35, 1);
const cl = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const lin = (u, a, b, de, a2, e = EXPO) => interpolate(u, [a, b], [de, a2], { ...cl, easing: e });
const ap = (u, d, dur = 26) => lin(u, d, d + dur, 0, 1);
const useU = () => useCurrentFrame() / K;

const INICIO = 76, PAUSA = 22;
const FIN = datos.escenas.length - 1; // closing scene: the camera pulls back to the whole map
const EXTRA = { [FIN]: 40 };
const S = datos.escenas.reduce((acc, e, i) => [...acc, i ? acc[i - 1] + Math.ceil(datos.escenas[i - 1].dura * 30) + PAUSA + (EXTRA[i] || 0) : INICIO], []);
const finVoz = (i) => S[i] + Math.ceil(datos.escenas[i].dura * 30);
// After the closing words: the key numbers of the course, with no voice (FINAL units)
const TF = finVoz(FIN) + 24, FINAL = 450;
const TOT = TF + FINAL;
export const TOTAL_IN = Math.round(TOT * K);
const limpia = (t) => t.toLowerCase().replace(/[¿?¡!.,:;«»"]/g, '');
const palabra = (i, re, n = 0) => datos.escenas[i].palabras.filter((p) => re.test(limpia(p.t)))[n];
const cuando = (i, re, n = 0) => { const w = palabra(i, re, n); return S[i] + (w ? Math.round(w.de * 30) : 0) - 3; };

// Chapter of each scene (0 = review intro or closing) and its color
const CAP = [0, 1, 1, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 8, 0];
const CAP_NOMBRE = ['Repaso final', 'El notario en Maryland', 'La solicitud', 'El juramento y tus herramientas', 'Los actos notariales', 'La notarización correcta', 'Tarifas, ética y límites', 'Cómo mantener tu comisión', 'Tu negocio de notario'];
const CAP_COLOR = [P.esmeralda, P.esmeralda, P.azul, P.naranja, P.morado, P.rojo, P.coral, P.ocre, P.turquesa];

// The panels snake across the map: 5 per row, the direction flips on every row
const NP = FIN; // panels 0..FIN-1
const PUNTOS = Array.from({ length: NP }, (_, k) => {
  const r = Math.floor(k / 5), c0 = k % 5, c = r % 2 ? 4 - c0 : c0;
  return { x: c * 2250, y: r * 1550 + (c % 2 ? 140 : -60) };
});
const MAPA = { x: 4500, y: 2250, z: 0.15 };
const PW = 1340, PH = 620;
const LLEGA = PUNTOS.map((_, k) => (k ? S[k] - 22 : 34));
const camara = (u) => {
  const p0 = lin(u, 28, 70, 0, 1, SUAVE);
  let x = MAPA.x + (PUNTOS[0].x - MAPA.x) * p0, y = MAPA.y + (PUNTOS[0].y - MAPA.y) * p0;
  let z = Math.exp(Math.log(MAPA.z) * (1 - p0));
  for (let k = 1; k < NP; k++) {
    const p = lin(u, S[k] - 22, S[k] + 12, 0, 1, SUAVE);
    if (p > 0) { x = PUNTOS[k - 1].x + (PUNTOS[k].x - PUNTOS[k - 1].x) * p; y = PUNTOS[k - 1].y + (PUNTOS[k].y - PUNTOS[k - 1].y) * p; z = 1 - 0.16 * Math.sin(Math.PI * p); }
  }
  const q = lin(u, S[FIN] - 40, S[FIN] + 20, 0, 1, SUAVE);
  return { x: x + (MAPA.x - x) * q, y: y + (MAPA.y - y) * q, z: Math.exp(Math.log(z) + (Math.log(MAPA.z) - Math.log(z)) * q) };
};

const Ico = ({ n, s = 44, c = P.blanco, w = 2.1 }) => {
  const D = {
    doc: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h7M9 16h5" /></>,
    sello: <><path d="M9 4h6v5a3 3 0 0 0 3 3H6a3 3 0 0 0 3-3z" /><rect x="4" y="12" width="16" height="4" rx="1" /><path d="M5 20h14" /></>,
    firma: <><path d="M3 17c3-6 5-9 7-9 2.5 0-1.5 9 1 9 1.5 0 2.5-4 4-4 1 0 1 2 2 2h4" /><path d="M3 21h18" /></>,
    pluma: <><path d="M4 20l4-1 11-11-3-3L5 16z" /><path d="M14 6l3 3" /></>,
    calendario: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
    persona: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
    mano: <><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V12M14 11.5V6a1.5 1.5 0 0 1 3 0v8c0 4-2.5 7-6.5 7S5 18.5 4 16l-1.5-3.5a1.4 1.4 0 0 1 2.4-1.4L8 14" /></>,
    check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
    equis: <path d="M6 6l12 12M18 6L6 18" />,
    flecha: <path d="M4 12h15M13 6l6 6-6 6" />,
    id: <><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8" cy="11" r="2.4" /><path d="M4.8 16.5c.6-1.8 1.8-2.6 3.2-2.6s2.6.8 3.2 2.6M14 10h5M14 14h4" /></>,
    libro: <><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z" /><path d="M4 17a3 3 0 0 1 3-3h11M8 8h6" /></>,
    testigo: <><circle cx="9" cy="8" r="3.4" /><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5 1.6 0 3 .6 4.2 1.5" /><path d="M14.5 17.5l2.2 2.2 4.8-4.8" /></>,
    balanza: <><path d="M12 3v18M7 21h10M4 7h16" /><path d="M4 7l-2.5 6a3 3 0 0 0 5 0zM20 7l-2.5 6a3 3 0 0 0 5 0z" /></>,
    edificio: <><path d="M3 21h18M4 10h16M12 3l9 5H3z" /><path d="M6 10v9M10 10v9M14 10v9M18 10v9" /></>,
    globo: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" /></>,
    escudo: <path d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6z" />,
    casa: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-5h4v5" /></>,
    bolsa: <><path d="M5 8h14l-1 13H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
    copia: <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M16 8V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h2" /></>,
    alerta: <><path d="M12 3l10 18H2z" /><path d="M12 10v5M12 18h.01" /></>,
    estrella: <path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1 6.3L12 17.5 6.5 20.4l1-6.3L3 9.7l6.2-.9z" />,
    llave: <><circle cx="8" cy="15" r="4" /><path d="M11 12l9-9M17 6l3 3M15 8l2 2" /></>,
    gorro: <><path d="M2 9l10-5 10 5-10 5z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" /></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round">{D[n]}</svg>;
};
const Burbuja = ({ color, children, s = 76, v = 1 }) => <div style={{ width: s, height: s, flex: 'none', borderRadius: s * 0.3, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 12px 26px ${color}55`, transform: `scale(${0.6 + 0.4 * v})` }}>{children}</div>;
const T = ({ children, color = P.tinta, size = 58 }) => <div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: size, lineHeight: 1.04, letterSpacing: -2, color }}>{children}</div>;
const Txt = ({ children, size = 34, color = P.tinta, peso = 900 }) => <div style={{ fontFamily: TIGHT, fontWeight: peso, fontSize: size, color, letterSpacing: -0.8, lineHeight: 1.14 }}>{children}</div>;
const Sub = ({ children, size = 25, color = P.grafito }) => <div style={{ fontFamily: TIGHT, fontWeight: 500, fontSize: size, color, lineHeight: 1.25, marginTop: 6 }}>{children}</div>;
const Entra = ({ u, d, children, style, y = 26 }) => { const v = ap(u, d, 24); return <div style={{ opacity: v, transform: `translateY(${(1 - v) * y}px)`, filter: `blur(${(1 - v) * 6}px)`, ...style }}>{children}</div>; };
const Tarjeta = ({ children, style }) => <div style={{ background: '#F6F9FB', borderRadius: 26, padding: '22px 22px', ...style }}>{children}</div>;
const Marca = ({ u, d, color = '#BDEFD2', children }) => { const p = lin(u, d, d + 20, 0, 1, SUAVE); return (
  <span style={{ backgroundImage: `linear-gradient(${color}, ${color})`, backgroundRepeat: 'no-repeat', backgroundSize: `${p * 100}% 42%`, backgroundPosition: '0 88%', padding: '0 6px', margin: '0 -6px' }}>{children}</span>); };
// Paper certificate (serif, like a real form)
const Hoja = ({ children, style }) => <div style={{ borderRadius: 14, background: '#FFFEF9', border: '2px solid #D8D2C0', boxShadow: '6px 8px 0 #E9E3D2', padding: '24px 30px', fontFamily: 'Georgia, serif', fontSize: 30, color: '#222', lineHeight: 1.55, ...style }}>{children}</div>;
const Llenado = ({ u, d, children, color = P.azul }) => { const v = ap(u, d, 18); return <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700, color, opacity: v, borderBottom: '2px solid #9AA5B1', padding: '0 4px' }}>{children}</span>; };
const color = (k) => CAP_COLOR[CAP[k]];
const Panel = ({ k, u, children, h = PH }) => {
  const v = ap(u, LLEGA[k] + 8, 32);
  return (<>
    <div style={{ position: 'absolute', left: PUNTOS[k].x - PW / 2, top: PUNTOS[k].y - h / 2 + 40, width: PW, height: h, boxSizing: 'border-box', borderRadius: 40, border: '14px dashed #8FB6CC', background: 'rgba(214,234,245,0.55)', opacity: ap(u, (k % 6) * 3, 16) * (1 - Math.min(1, v * 4)), transform: `scale(${0.8 + 0.2 * ap(u, (k % 6) * 3, 16)})` }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 260, height: 260, borderRadius: 130, background: color(k), display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: TIGHT, fontWeight: 900, fontSize: 150, color: P.blanco }}>{CAP[k] || '★'}</div>
    </div>
    <div style={{ position: 'absolute', left: PUNTOS[k].x - PW / 2, top: PUNTOS[k].y - h / 2 + 40, width: PW, height: h, boxSizing: 'border-box', padding: '44px 56px', background: P.blanco, borderRadius: 40,
      boxShadow: '0 44px 100px rgba(20,60,90,0.14)', opacity: v, transform: `scale(${0.95 + 0.05 * v})`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><div style={{ position: 'relative' }}>{children}</div></div>
  </>);
};

// Header of every panel: the chapter it reviews and the idea
const Cab = ({ k, children, size = 54 }) => (<>
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: TIGHT, fontWeight: 800, fontSize: 22, letterSpacing: 3, color: color(k) }}>
    <span style={{ background: color(k), color: P.blanco, borderRadius: 10, padding: '2px 12px', letterSpacing: 1 }}>{CAP[k]}</span>{CAP_NOMBRE[CAP[k]].toUpperCase()}</div>
  <div style={{ marginTop: 10 }}><T size={size}>{children}</T></div>
</>);
const Linea = ({ u, d, ic, c, children, tinta = P.tinta, size = 29, s = 60 }) => (
  <Entra u={u} d={d} style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Burbuja color={c} s={s} v={ap(u, d, 20)}><Ico n={ic} s={s * 0.56} w={ic === 'equis' || ic === 'check' ? 3 : 2.1} /></Burbuja><Txt size={size} color={tinta}>{children}</Txt></Entra>);
const Chip = ({ u, d, c, children, size = 25 }) => <Entra u={u} d={d} y={14}><div style={{ background: P.blanco, border: `3px solid ${c}`, borderRadius: 16, padding: '8px 16px', fontFamily: TIGHT, fontWeight: 800, fontSize: size, color: P.tinta }}>{children}</div></Entra>;
const Dato = ({ u, d, c, n, t, w = 250 }) => (
  <Entra u={u} d={d} y={30} style={{ width: w }}><div style={{ borderRadius: 26, background: `${c}14`, border: `3px solid ${c}`, padding: '18px 18px', textAlign: 'center' }}>
    <div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 62, color: c, letterSpacing: -2, lineHeight: 1 }}>{n}</div>
    <div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 22, color: P.tinta, marginTop: 8, lineHeight: 1.2 }}>{t}</div></div></Entra>);
const Sello = ({ v = 1, rot = -3, s = 1 }) => (
  <div style={{ opacity: v, transform: `scale(${(1.25 - 0.25 * v) * s}) rotate(${rot}deg)`, border: '6px double #1F3A68', borderRadius: 16, padding: '12px 22px', textAlign: 'center', fontFamily: TIGHT, fontWeight: 800, color: '#1F3A68', background: '#F7F9FD', display: 'inline-block' }}>
    <div style={{ fontSize: 24 }}>MARÍA G. HERNÁNDEZ</div><div style={{ fontSize: 18 }}>NOTARY PUBLIC</div><div style={{ fontSize: 18 }}>MONTGOMERY COUNTY</div></div>);
const Flecha = ({ u, d, s = 50 }) => <Entra u={u} d={d} style={{ flex: 'none' }}><Ico n="flecha" s={s} c={P.grafito} w={2.6} /></Entra>;
const Ejemplo = ({ u, d }) => <Entra u={u} d={d} style={{ marginTop: 16 }}><Sub size={19}>Ejemplo con datos inventados.</Sub></Entra>;

// 0 · Intro
const P0 = ({ u }) => (
  <Panel k={0} u={u}>
    <div style={{ display: 'flex', gap: 46, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <Entra u={u} d={40}><div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: P.esmeralda }}>LECCIÓN 9.1 · MARYLAND</div></Entra>
        <Entra u={u} d={cuando(0, /repaso/)} style={{ marginTop: 14 }}><T size={92}>Repaso</T></Entra>
        <Entra u={u} d={cuando(0, /final/)}><T size={92} color={P.esmeralda}>final</T></Entra>
        <Entra u={u} d={cuando(0, /curso/)} style={{ marginTop: 22 }}><Txt size={32} color={P.grafito} peso={700}>Todo el curso, de principio a fin</Txt></Entra>
      </div>
      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(4, 132px)', gap: 16 }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((c, k) => { const d = cuando(0, /principio/) + k * 6; return (
          <Entra key={c} u={u} d={d} y={20}><div style={{ width: 132, height: 132, borderRadius: 34, background: CAP_COLOR[c], display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 14px 30px ${CAP_COLOR[c]}55`, color: P.blanco }}>
            <div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 16, letterSpacing: 2, opacity: 0.9 }}>CAPÍTULO</div>
            <div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 64, lineHeight: 1 }}>{c}</div></div></Entra>); })}
      </div>
    </div>
  </Panel>
);

// 1 · Qué es el notario
const P1 = ({ u }) => {
  const tT = cuando(1, /testigo/), tI = cuando(1, /imparcial/);
  return (
    <Panel k={1} u={u}>
      <Cab k={1}>El notary public</Cab>
      <div style={{ display: 'flex', gap: 40, marginTop: 30, alignItems: 'center' }}>
        <Entra u={u} d={cuando(1, /funcionario/)} style={{ flex: 'none', width: 470 }}><Tarjeta style={{ textAlign: 'center', padding: '30px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><Burbuja color={P.esmeralda} s={110} v={ap(u, tT, 20)}><Ico n="balanza" s={62} /></Burbuja></div>
          <div style={{ marginTop: 18 }}><Txt size={36}>Funcionario del estado</Txt></div>
          <Sub size={26}>Testigo <Marca u={u} d={tI}><b>imparcial</b></Marca> de firmas</Sub></Tarjeta></Entra>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Linea u={u} d={cuando(1, /abogado/)} ic="equis" c={P.rojo} tinta="#9A3B3B">No es abogado</Linea>
          <Linea u={u} d={cuando(1, /consejos/)} ic="equis" c={P.rojo} tinta="#9A3B3B">No da consejos legales</Linea>
          <Linea u={u} d={cuando(1, /prepara/)} ic="equis" c={P.rojo} tinta="#9A3B3B">No prepara documentos</Linea>
          <Linea u={u} d={cuando(1, /latinoamérica/)} ic="equis" c={P.rojo} tinta="#9A3B3B">No es el «notario» de Latinoamérica</Linea>
        </div>
      </div>
    </Panel>
  );
};

// 2 · El notario en Maryland
const P2 = ({ u }) => {
  const tG = cuando(2, /gobernador/), tS = cuando(2, /senador/), tSE = cuando(2, /secretaría/);
  const caja = (ic, c, t, s, d) => (<Entra u={u} d={d} y={30} style={{ flex: 1 }}><Tarjeta style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '20px 20px' }}>
    <Burbuja color={c} s={78} v={ap(u, d, 20)}><Ico n={ic} s={44} /></Burbuja><div><Txt size={30}>{t}</Txt><Sub size={21}>{s}</Sub></div></Tarjeta></Entra>);
  return (
    <Panel k={2} u={u}>
      <Cab k={2}>Quién te nombra y la ley</Cab>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 26 }}>
        {caja('persona', P.azul, 'Senador estatal', 'o Secretaría de Estado · aprueba', Math.min(tS, tSE))}
        <Flecha u={u} d={tS + 6} />
        {caja('edificio', P.esmeralda, 'Gobernador', 'te nombra', tG)}
      </div>
      <div style={{ display: 'flex', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
        <Chip u={u} d={cuando(2, /título/)} c={P.morado}>SG · Título 18</Chip>
        <Chip u={u} d={cuando(2, /comar/)} c={P.morado}>COMAR 01.02.08</Chip>
        <Chip u={u} d={cuando(2, /cuatro|^4$/)} c={P.naranja}>4 años</Chip>
        <Chip u={u} d={cuando(2, /todo/)} c={P.naranja}>Todo Maryland</Chip>
        <Chip u={u} d={cuando(2, /físicamente/)} c={P.rojo}>Estando físicamente en Maryland</Chip>
      </div>
    </Panel>
  );
};

// 3 · La solicitud
const P4 = ({ u }) => {
  const tV = cuando(3, /veinticinco|^25$/), tA = cuando(3, /antecedentes/);
  return (
    <Panel k={3} u={u}>
      <Cab k={3}>La solicitud en línea</Cab>
      <div style={{ display: 'flex', gap: 44, marginTop: 28, alignItems: 'center' }}>
        <div style={{ flex: 'none', opacity: ap(u, tV, 20), transform: `scale(${0.8 + 0.2 * ap(u, tV, 20)}) rotate(-4deg)`, width: 250, height: 250, borderRadius: 40, background: P.azul, color: P.blanco, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: `0 20px 40px ${P.azul}55` }}>
          <div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 96, letterSpacing: -3 }}>$25</div><div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 24 }}>la solicitud</div></div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Linea u={u} d={cuando(3, /certificados/)} ic="check" c={P.esmeralda} s={52} size={28}>Tus 2 certificados</Linea>
          <Linea u={u} d={cuando(3, /identificación/)} ic="check" c={P.esmeralda} s={52} size={28}>Tu identificación</Linea>
          <Linea u={u} d={cuando(3, /distrito/)} ic="check" c={P.esmeralda} s={52} size={28}>Tu distrito legislativo</Linea>
          <Linea u={u} d={cuando(3, /referencias/)} ic="check" c={P.esmeralda} s={52} size={28}>3 referencias</Linea>
          <Linea u={u} d={tA} ic="alerta" c={P.rojo} s={52} size={28} tinta="#9A3B3B">Declara tus antecedentes con la verdad</Linea>
        </div>
      </div>
    </Panel>
  );
};

// 4 · El juramento
const P5 = ({ u }) => {
  const tT = cuando(4, /treinta|^30$/), tC = cuando(4, /clerk/), tO = cuando(4, /once|^11$/), tR = cuando(4, /revocan/);
  return (
    <Panel k={4} u={u}>
      <Cab k={4}>El juramento ante el Clerk</Cab>
      <div style={{ display: 'flex', gap: 30, marginTop: 28, alignItems: 'center' }}>
        <Entra u={u} d={tT} style={{ flex: 'none' }}><div style={{ width: 250, borderRadius: 26, overflow: 'hidden', boxShadow: '0 18px 40px rgba(20,60,90,0.18)', background: P.blanco, border: '3px solid #E6ECF1', textAlign: 'center' }}>
          <div style={{ background: P.naranja, color: P.blanco, fontFamily: TIGHT, fontWeight: 800, fontSize: 22, letterSpacing: 3, padding: '10px 0' }}>TIENES</div>
          <div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 110, color: P.tinta, lineHeight: 1.05, padding: '6px 0 0' }}>30</div>
          <div style={{ fontFamily: TIGHT, fontWeight: 800, fontSize: 28, color: P.grafito, paddingBottom: 14 }}>días</div></div></Entra>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Linea u={u} d={tC} ic="edificio" c={P.naranja}>Jura ante el Clerk of the Circuit Court</Linea>
          <Linea u={u} d={tO} ic="check" c={P.esmeralda}>Paga $11 ($10 + $1 de registro)</Linea>
          <Linea u={u} d={tR} ic="equis" c={P.rojo} tinta="#9A3B3B">Si no vas: te revocan la comisión</Linea>
        </div>
      </div>
    </Panel>
  );
};

// 5 · Sello y journal
const P6 = ({ u }) => {
  const tS = cuando(5, /sello/), tN = cuando(5, /nombre/), tNP = cuando(5, /notary/), tC = cuando(5, /condado/), tJ = cuando(5, /journal/, 1), tD = cuando(5, /diez|^10$/);
  const linea = (t, d, size) => <div style={{ fontSize: size, opacity: ap(u, d, 14) }}>{t}</div>;
  return (
    <Panel k={5} u={u}>
      <Cab k={5}>Tu sello y tu journal</Cab>
      <div style={{ display: 'flex', gap: 40, marginTop: 28, alignItems: 'center' }}>
        <Entra u={u} d={tS} style={{ flex: 'none', textAlign: 'center' }}>
          <div style={{ border: '6px double #1F3A68', borderRadius: 18, padding: '16px 28px', fontFamily: TIGHT, fontWeight: 800, color: '#1F3A68', background: '#F7F9FD', transform: 'rotate(-3deg)', minWidth: 330 }}>
            {linea('MARÍA G. HERNÁNDEZ', tN, 30)}{linea('NOTARY PUBLIC', tNP, 23)}{linea('MONTGOMERY COUNTY', tC, 23)}</div>
          <div style={{ marginTop: 18 }}><Sub size={21}>Tu nombre · Notary Public · tu condado</Sub></div>
          <Entra u={u} d={cuando(5, /solo/)}><Txt size={26} color={P.rojo}>Solo tú lo usas</Txt></Entra>
        </Entra>
        <Entra u={u} d={tJ} style={{ flex: 1 }}><div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ width: 170, height: 210, borderRadius: '10px 22px 22px 10px', background: '#7A3E1D', borderLeft: '16px solid #5A2C13', boxShadow: '0 18px 36px rgba(0,0,0,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F3E3C8', fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 24, letterSpacing: 1 }}>JOURNAL</div>
          <div><Txt size={30}>Cada acto, en el momento</Txt>
            <div style={{ marginTop: 14, display: 'inline-block', opacity: ap(u, tD, 18), transform: `scale(${0.8 + 0.2 * ap(u, tD, 18)})`, background: P.naranja, color: P.blanco, borderRadius: 18, padding: '10px 22px', fontFamily: TIGHT, fontWeight: 900, fontSize: 40 }}>10 años</div>
            <Sub size={21}>lo guardas después del último acto</Sub></div>
        </div></Entra>
      </div>
    </Panel>
  );
};

// 6 · Los actos
const P7 = ({ u }) => {
  const col = (en, es, c, ic, d, lineas) => (
    <Entra u={u} d={d} y={36} style={{ flex: 1, display: 'flex' }}><div style={{ flex: 1, borderRadius: 28, background: '#F6F9FB', borderTop: `10px solid ${c}`, padding: '22px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Burbuja color={c} s={72} v={ap(u, d, 20)}><Ico n={ic} s={40} /></Burbuja>
        <div><div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 38, color: '#0F2A44' }}>{en}</div><Sub size={22} color={c}>{es}</Sub></div></div>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>{lineas.map(([t, dd]) => <Entra key={t} u={u} d={dd} y={14}><Txt size={27} peso={700}>{t}</Txt></Entra>)}</div>
    </div></Entra>);
  return (
    <Panel k={6} u={u}>
      <Cab k={6}>Los actos más comunes</Cab>
      <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
        {col('acknowledgment', 'reconocimiento de firma', P.azul, 'firma', cuando(6, /acknowledgment/), [['Declara que la firma es suya', cuando(6, /declara/)]])}
        {col('jurat', 'verificación bajo juramento', P.esmeralda, 'mano', cuando(6, /jurat/), [['Firma frente a ti', cuando(6, /frente/)], ['Jura o afirma que es verdad', cuando(6, /afirma/)]])}
      </div>
      <div style={{ display: 'flex', gap: 14, marginTop: 20, alignItems: 'center' }}>
        <Entra u={u} d={cuando(6, /también/)}><Sub size={22}>También:</Sub></Entra>
        <Chip u={u} d={cuando(6, /testigo/)} c={P.morado} size={23}>Witnessing · testigo de firma</Chip>
        <Chip u={u} d={cuando(6, /copias/)} c={P.morado} size={23}>Certified copy · copia</Chip>
        <Chip u={u} d={cuando(6, /protesto/)} c={P.morado} size={23}>Protest · protesto</Chip>
      </div>
    </Panel>
  );
};

// 7 · El certificado
const P8 = ({ u }) => {
  const tCo = cuando(7, /condado/), tF = cuando(7, /fecha/), tN = cuando(7, /nombre/), tFi = cuando(7, /firma/), tNP = cuando(7, /notary/), tS = cuando(7, /sello/), tV = cuando(7, /vence/), tD = cuando(7, /después/);
  return (
    <Panel k={7} u={u}>
      <Cab k={7}>Todo lo que lleva el certificado</Cab>
      <Entra u={u} d={S[7] + 14} style={{ marginTop: 22 }}><Hoja style={{ fontSize: 25, lineHeight: 1.55, display: 'flex', gap: 28, alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <div>State of Maryland, County of <Llenado u={u} d={tCo}>Montgomery</Llenado></div>
          <div>This record was acknowledged before me on <Llenado u={u} d={tF} color={P.naranja}>10/15/2026</Llenado> by <Llenado u={u} d={tN} color={P.morado}>Carlos A. Ramírez</Llenado>.</div>
          <div style={{ height: 46, marginTop: 4, fontStyle: 'italic', fontSize: 34, color: '#1F3A68', opacity: ap(u, tFi, 18) }}>María G. Hernández</div>
          <div style={{ borderTop: '2px solid #333', width: 360 }} />
          <div style={{ fontSize: 21 }}><Marca u={u} d={tNP} color="#FFE3B8">Notary Public</Marca> · My commission expires: <Llenado u={u} d={tV} color={P.ocre}>03/14/2030</Llenado></div>
        </div>
        <div style={{ flex: 'none' }}><Sello v={ap(u, tS, 18)} s={0.9} /></div>
      </Hoja></Entra>
      <div style={{ display: 'flex', gap: 26, marginTop: 20, alignItems: 'center' }}>
        <Linea u={u} d={cuando(7, /adjuntas/)} ic="doc" c={P.morado} s={52} size={25}>Sin certificado: adjuntas uno</Linea>
        <Linea u={u} d={tD} ic="pluma" c={P.rojo} s={52} size={25}>Firmas solo después del acto</Linea>
      </div>
      <Ejemplo u={u} d={tV + 10} />
    </Panel>
  );
};

// 8 · Casos especiales y apostilla
const P9 = ({ u }) => {
  const tN = cuando(8, /^nota$/), tX = cuando(8, /marca/), tA = cuando(8, /apostilla/), tC = cuando(8, /clerk/), tS = cuando(8, /secretaría/);
  const paso = (ic, c, t, d) => (<Entra u={u} d={d} y={20} style={{ textAlign: 'center', width: 150 }}><div style={{ display: 'flex', justifyContent: 'center' }}><Burbuja color={c} s={70} v={ap(u, d, 20)}><Ico n={ic} s={38} /></Burbuja></div><div style={{ marginTop: 8 }}><Txt size={21}>{t}</Txt></div></Entra>);
  return (
    <Panel k={8} u={u}>
      <Cab k={8}>Casos especiales y apostillas</Cab>
      <div style={{ display: 'flex', gap: 34, marginTop: 24 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Entra u={u} d={tN}><Hoja style={{ fontSize: 21, lineHeight: 1.45, padding: '14px 20px' }}>Signature affixed by <b>Luis M. Ortega</b> at the direction of <b>Rosa E. Ortega</b>.</Hoja></Entra>
          <Entra u={u} d={tX} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 74, fontWeight: 700, color: '#1F3A68', lineHeight: 1 }}>X</div>
            <Txt size={26}>Una marca también puede ser firma</Txt></Entra>
          <Ejemplo u={u} d={tX + 8} />
        </div>
        <div style={{ flex: 'none', width: 560 }}>
          <Entra u={u} d={tA}><Txt size={27} color={P.rojo}>La apostilla no la da el notario</Txt></Entra>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 18 }}>
            {paso('sello', P.morado, 'Notarizas', tA + 8)}<Flecha u={u} d={tC - 4} s={36} />
            {paso('edificio', P.naranja, 'Clerk del condado', tC)}<Flecha u={u} d={tS - 4} s={36} />
            {paso('globo', P.azul, 'Secretaría de Estado', tS)}
          </div>
        </div>
      </div>
    </Panel>
  );
};

// 9 · Los seis pasos
const PASOS = [['Presencia', 'persona', /presencia/], ['Revisión', 'doc', /revisión/], ['Identificación', 'id', /identificación/], ['El acto', 'mano', /acto/], ['El certificado', 'pluma', /certificado/], ['El journal', 'libro', /journal/]];
const PCOL = [P.esmeralda, P.azul, P.naranja, P.morado, P.rojo, P.coral];
const P10 = ({ u }) => (
  <Panel k={9} u={u}>
    <Cab k={9}>Los seis pasos de toda notarización</Cab>
    <div style={{ display: 'flex', gap: 12, marginTop: 34, alignItems: 'flex-start' }}>
      {PASOS.map(([t, ic, re], k) => { const d = cuando(9, re); return (
        <Entra key={t} u={u} d={d} y={30} style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><Burbuja color={PCOL[k]} s={104} v={ap(u, d, 20)}><Ico n={ic} s={56} /></Burbuja></div>
          <div style={{ marginTop: 10, fontFamily: TIGHT, fontWeight: 900, fontSize: 30, color: PCOL[k] }}>{k + 1}</div>
          <Txt size={25}>{t}</Txt></Entra>); })}
    </div>
    <div style={{ marginTop: 34 }}><Linea u={u} d={cuando(9, /saltas/)} ic="alerta" c={P.rojo} tinta="#9A3B3B">Si te saltas uno, el acto queda mal hecho</Linea></div>
  </Panel>
);

// 10 · La identificación
const P11 = ({ u }) => {
  const tC = cuando(10, /conoces/), tG = cuando(10, /gobierno/), tT = cuando(10, /testigo/);
  const ids = [['Pasaporte', /pasaporte/], ['Licencia de manejo', /licencia/], ['Matrícula consular', /matrícula/]];
  const col = (ic, c, t, d, extra) => (
    <Entra u={u} d={d} y={34} style={{ flex: extra ? 1.5 : 1, display: 'flex' }}><div style={{ flex: 1, borderRadius: 28, background: '#F6F9FB', borderTop: `10px solid ${c}`, padding: '22px 22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Burbuja color={c} s={66} v={ap(u, d, 20)}><Ico n={ic} s={38} /></Burbuja><Txt size={29}>{t}</Txt></div>
      {extra}</div></Entra>);
  return (
    <Panel k={10} u={u}>
      <Cab k={10}>Cómo identificas a la persona</Cab>
      <div style={{ display: 'flex', gap: 18, marginTop: 26 }}>
        {col('persona', P.esmeralda, 'La conoces personalmente', tC)}
        {col('id', P.naranja, 'Identificación del gobierno con foto y firma', tG, <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>{ids.map(([t, re]) => <Chip key={t} u={u} d={cuando(10, re)} c={P.naranja} size={22}>{t}</Chip>)}</div>)}
        {col('testigo', P.morado, 'Un testigo creíble que jura o afirma', tT)}
      </div>
      <div style={{ marginTop: 24 }}><Linea u={u} d={cuando(10, /dudas/)} ic="check" c={P.azul}>¿Dudas? Pide más información</Linea></div>
    </Panel>
  );
};

// 11 · Cuándo negarte
const P12 = ({ u }) => (
  <Panel k={11} u={u}>
    <Cab k={11}>Cuándo puedes negarte</Cab>
    <div style={{ display: 'flex', gap: 40, marginTop: 26 }}>
      <div style={{ flex: 1.3, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <Linea u={u} d={cuando(11, /entiende/)} ic="equis" c={P.rojo} s={54} size={27} tinta="#9A3B3B">No entiende o no firma por su voluntad</Linea>
        <Linea u={u} d={cuando(11, /identificar/)} ic="equis" c={P.rojo} s={54} size={27} tinta="#9A3B3B">No la puedes identificar</Linea>
        <Linea u={u} d={cuando(11, /presión/)} ic="equis" c={P.rojo} s={54} size={27} tinta="#9A3B3B">Está bajo presión</Linea>
        <Linea u={u} d={cuando(11, /fraude/)} ic="equis" c={P.rojo} s={54} size={27} tinta="#9A3B3B">Sabes que hay fraude</Linea>
      </div>
      <Entra u={u} d={cuando(11, /respeto/)} style={{ flex: 1 }}><Tarjeta style={{ padding: '24px 24px' }}>
        <Txt size={28} color={P.esmeralda}>Cómo negarte bien</Txt>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
          <Linea u={u} d={cuando(11, /respeto/)} ic="check" c={P.esmeralda} s={48} size={25}>Con respeto</Linea>
          <Linea u={u} d={cuando(11, /razón/)} ic="check" c={P.esmeralda} s={48} size={25}>Explica la razón</Linea>
          <Linea u={u} d={cuando(11, /cobres/)} ic="check" c={P.esmeralda} s={48} size={25}>No cobras</Linea>
        </div></Tarjeta></Entra>
    </div>
  </Panel>
);

// 12 · Las tarifas
const P13 = ({ u }) => {
  const tN = cuando(12, /nunca/);
  const fila = (n, t, d, c) => (<Entra u={u} d={d} y={20} style={{ display: 'flex', alignItems: 'center', gap: 22, padding: '12px 0', borderTop: '2px solid #EEF2F5' }}>
    <div style={{ width: 170, fontFamily: TIGHT, fontWeight: 900, fontSize: 52, color: c, letterSpacing: -1 }}>{n}</div><Txt size={28} peso={700}>{t}</Txt></Entra>);
  return (
    <Panel k={12} u={u}>
      <Cab k={12}>Lo máximo que cobras</Cab>
      <div style={{ display: 'flex', gap: 34, marginTop: 18, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          {fila('$8', 'por cada acto notarial', cuando(12, /ocho|^8$/), P.esmeralda)}
          {fila('$4', 'por firma en cada copia adicional', cuando(12, /cuatro|^4$/), P.azul)}
          {fila('+$5', 'de viaje, más el millaje del IRS', cuando(12, /cinco|^5$/), P.naranja)}
        </div>
        <div style={{ flex: 'none', width: 300, textAlign: 'center' }}>
          <div style={{ display: 'inline-block', opacity: ap(u, tN, 18), transform: `scale(${1.3 - 0.3 * ap(u, tN, 18)}) rotate(-6deg)`, border: `6px solid ${P.rojo}`, borderRadius: 18, padding: '10px 22px', fontFamily: TIGHT, fontWeight: 900, fontSize: 40, color: P.rojo, letterSpacing: 2 }}>NUNCA MÁS</div>
          <Entra u={u} d={cuando(12, /menos/)} style={{ marginTop: 18 }}><Sub size={23}>Puedes cobrar menos o no cobrar</Sub></Entra>
          <Entra u={u} d={cuando(12, /journal/)} style={{ marginTop: 10 }}><Txt size={24} color={P.esmeralda}>Anota la tarifa en tu journal</Txt></Entra>
        </div>
      </div>
    </Panel>
  );
};

// 13 · Lo que no puedes hacer
const P14 = ({ u }) => {
  const tNo = cuando(13, /notario/), tNP = cuando(13, /notary/), tAv = cuando(13, /aviso/);
  const letrero = (t, ok, d) => (<Entra u={u} d={d} y={20} style={{ position: 'relative' }}><div style={{ border: `4px solid ${ok ? P.esmeralda : P.rojo}`, borderRadius: 18, padding: '14px 24px', textAlign: 'center', background: ok ? '#EAF8F0' : '#FDECEC', fontFamily: TIGHT, fontWeight: 900, fontSize: 36, color: ok ? '#0B6B3E' : '#9A3B3B', textDecoration: ok ? 'none' : 'line-through' }}>{t}</div>
    <div style={{ position: 'absolute', right: -16, top: -16 }}><Burbuja color={ok ? P.esmeralda : P.rojo} s={46} v={ap(u, d, 16)}><Ico n={ok ? 'check' : 'equis'} s={26} w={3} /></Burbuja></div></Entra>);
  return (
    <Panel k={13} u={u}>
      <Cab k={13}>Lo que no puedes hacer</Cab>
      <div style={{ display: 'flex', gap: 40, marginTop: 24, alignItems: 'center' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Linea u={u} d={cuando(13, /consejos/)} ic="equis" c={P.rojo} s={54} size={27} tinta="#9A3B3B">Dar consejos legales</Linea>
          <Linea u={u} d={cuando(13, /preparar/)} ic="equis" c={P.rojo} s={54} size={27} tinta="#9A3B3B">Preparar documentos</Linea>
          <Linea u={u} d={cuando(13, /inmigración/)} ic="equis" c={P.rojo} s={54} size={27} tinta="#9A3B3B">Hacer trámites de inmigración</Linea>
        </div>
        <div style={{ flex: 'none', width: 470, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {letrero('NOTARIO', false, tNo)}
          {letrero('NOTARY PUBLIC', true, tNP)}
          <Entra u={u} d={tAv}><Sub size={22}>+ el <b>aviso obligatorio</b> de que no eres abogado, en cada idioma de tu anuncio</Sub></Entra>
        </div>
      </div>
    </Panel>
  );
};

// 14 · Conflictos y sanciones
const P15 = ({ u }) => {
  const tE = cuando(14, /esposo/), tB = cuando(14, /beneficio/), tR = cuando(14, /revocación/);
  return (
    <Panel k={14} u={u}>
      <Cab k={14}>Conflictos y sanciones</Cab>
      <div style={{ display: 'flex', gap: 34, marginTop: 24 }}>
        <Entra u={u} d={tE} style={{ flex: 1 }}><Tarjeta style={{ padding: '22px 24px', borderLeft: `10px solid ${P.rojo}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Burbuja color={P.rojo} s={62} v={ap(u, tE, 20)}><Ico n="equis" s={34} w={3} /></Burbuja><Txt size={28}>Nunca notarices si…</Txt></div>
          <div style={{ marginTop: 14 }}><Txt size={26} peso={700}>tú o tu esposo o esposa son <Marca u={u} d={tE + 8} color="#FBD3D3">parte</Marca></Txt></div>
          <div style={{ marginTop: 8 }}><Txt size={26} peso={700}>o reciben un <Marca u={u} d={tB} color="#FBD3D3">beneficio</Marca></Txt></div></Tarjeta></Entra>
        <div style={{ flex: 1 }}>
          <Entra u={u} d={cuando(14, /cuida/)}><Txt size={26} color={P.grafito}>Te pueden sancionar por…</Txt></Entra>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
            <Linea u={u} d={cuando(14, /identificar/)} ic="alerta" c={P.coral} s={48} size={25}>No identificar bien</Linea>
            <Linea u={u} d={cuando(14, /cobrar/)} ic="alerta" c={P.coral} s={48} size={25}>Cobrar de más</Linea>
            <Linea u={u} d={cuando(14, /publicidad/)} ic="alerta" c={P.coral} s={48} size={25}>Publicidad engañosa</Linea>
          </div>
          <Entra u={u} d={tR} style={{ marginTop: 16 }}><div style={{ display: 'inline-block', background: P.rojo, color: P.blanco, borderRadius: 16, padding: '10px 20px', fontFamily: TIGHT, fontWeight: 900, fontSize: 28 }}>Suspensión o revocación</div></Entra>
        </div>
      </div>
    </Panel>
  );
};

// 15 · Cuida tu comisión
const P16 = ({ u }) => {
  const card = (n, t, s, c, d) => (<Entra u={u} d={d} y={34} style={{ flex: 1, display: 'flex' }}><div style={{ flex: 1, borderRadius: 28, background: `${c}12`, border: `3px solid ${c}`, padding: '24px 22px', textAlign: 'center' }}>
    <div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 58, color: c, letterSpacing: -2, lineHeight: 1.05 }}>{n}</div>
    <div style={{ marginTop: 10 }}><Txt size={27}>{t}</Txt></div><Sub size={21}>{s}</Sub></div></Entra>);
  return (
    <Panel k={15} u={u}>
      <Cab k={15}>Cuida tu comisión</Cab>
      <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
        {card('30 días', 'Para avisar un cambio', 'de nombre, dirección o email', P.ocre, cuando(15, /treinta|^30$/))}
        {card('¡Ya!', 'Si pierdes el sello o el journal', 'avisa de inmediato a la Secretaría', P.rojo, cuando(15, /inmediato/))}
        {card('60 días', 'Antes de que venza', 'ya puedes renovar', P.esmeralda, cuando(15, /sesenta|^60$/))}
      </div>
    </Panel>
  );
};

// 16 · Tu negocio
const P17 = ({ u }) => {
  const tile = (ic, c, t, d) => (<Entra u={u} d={d} y={30} style={{ flex: 1, textAlign: 'center' }}><div style={{ display: 'flex', justifyContent: 'center' }}><Burbuja color={c} s={96} v={ap(u, d, 20)}><Ico n={ic} s={52} /></Burbuja></div><div style={{ marginTop: 12 }}><Txt size={26}>{t}</Txt></div></Entra>);
  return (
    <Panel k={16} u={u}>
      <Cab k={16}>Tu negocio de notario</Cab>
      <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
        {tile('edificio', P.turquesa, 'En tu oficina', cuando(16, /oficina/))}
        {tile('casa', P.azul, 'A domicilio', cuando(16, /domicilio/))}
        {tile('copia', P.morado, 'Copias certificadas', cuando(16, /copias/))}
        {tile('firma', P.naranja, 'Notario de firmas hipotecarias', cuando(16, /hipotecarias/))}
      </div>
      <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
        <Linea u={u} d={cuando(16, /seguro/)} ic="escudo" c={P.esmeralda} s={56} size={27}>Seguro E&amp;O</Linea>
        <Linea u={u} d={cuando(16, /tienda/)} ic="bolsa" c={P.coral} s={56} size={27}>La Tienda del Notario</Linea>
      </div>
    </Panel>
  );
};

const PANELES = [P0, P1, P2, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15, P16, P17];

// Closing: the whole map behind, and the three things to do now
const Cierre = ({ u }) => {
  const a = S[FIN] + 26, v = lin(u, a, a + 30, 0, 1), fuera = 1 - lin(u, TF - 10, TF + 14, 0, 1);
  const accion = (ic, c, t, d) => (<Entra u={u} d={d} y={24}><div style={{ display: 'flex', alignItems: 'center', gap: 14, background: P.blanco, borderRadius: 22, padding: '16px 26px', boxShadow: '0 16px 36px rgba(20,60,90,0.12)' }}>
    <Burbuja color={c} s={58} v={ap(u, d, 20)}><Ico n={ic} s={32} /></Burbuja><Txt size={30}>{t}</Txt></div></Entra>);
  return (
    <AbsoluteFill style={{ background: `rgba(246,250,253,${0.9 * v})`, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: v * fuera, transform: `scale(${0.96 + 0.04 * v})`, textAlign: 'center', maxWidth: 1600 }}>
        <div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: P.esmeralda }}>¡TERMINASTE EL CURSO!</div>
        <div style={{ marginTop: 12 }}><T size={74}>Ahora, prepárate</T></div>
        <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginTop: 36 }}>
          {accion('libro', P.azul, 'Repasa las lecciones', cuando(FIN, /repasa/))}
          {accion('check', P.morado, 'Haz los ejercicios', cuando(FIN, /ejercicios/))}
          {accion('gorro', P.naranja, 'Prepárate para tu examen', cuando(FIN, /examen/))}
        </div>
        <Entra u={u} d={cuando(FIN, /capacitación/)} style={{ marginTop: 46, display: 'inline-flex', alignItems: 'center', gap: 18, background: P.blanco, borderRadius: 999, padding: '16px 34px', boxShadow: '0 20px 50px rgba(20,60,90,0.14)' }}>
          <Img src={staticFile('logo-globo.png')} style={{ width: 54, height: 54 }} />
          <span style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 32, color: P.tinta }}>Centro Latino de Capacitación</span>
          <span style={{ fontFamily: TIGHT, fontWeight: 800, fontSize: 30, color: P.esmeralda }}>· ¡Mucho éxito!</span></Entra>
      </div>
    </AbsoluteFill>
  );
};

// Final, with no voice: the numbers of the course (same list as the lesson page)
const NUMEROS = [['3', 'referencias', P.azul], ['$25', 'la solicitud', P.azul],
  ['30 días', 'para jurar ante el Clerk', P.naranja], ['$11', 'al Clerk ($10 + $1)', P.naranja], ['4 años', 'dura tu comisión', P.naranja], ['10 años', 'guardas tu journal', P.naranja],
  ['$8', 'máximo por acto', P.coral], ['$4', 'por firma en copia adicional', P.coral], ['$5', 'de viaje · y por apostilla', P.coral],
  ['30 días', 'para avisar un cambio', P.ocre], ['10 días', 'para avisar una condena', P.ocre], ['60 días', 'antes, ya puedes renovar', P.ocre]];
const Numeros = ({ u }) => {
  const v = ap(u, TF + 4, 30), d = (k) => TF + 30 + k * 7;
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: v, transform: `translateY(${(1 - v) * 30}px)`, width: 1600, textAlign: 'center' }}>
        <div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: P.esmeralda }}>LOS NÚMEROS QUE DEBES RECORDAR</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, marginTop: 28 }}>
          {NUMEROS.map(([n, t, c], k) => (
            <Entra key={k} u={u} d={d(k)} y={24} style={{ width: 296 }}><div style={{ background: P.blanco, borderRadius: 24, padding: '18px 12px', boxShadow: '0 14px 34px rgba(20,60,90,0.10)', borderTop: `8px solid ${c}`, height: 150, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 52, color: c, letterSpacing: -1.5, lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 21, color: P.tinta, marginTop: 10, lineHeight: 1.2 }}>{t}</div></div></Entra>))}
          <Entra u={u} d={d(NUMEROS.length) + 10} y={24} style={{ width: 296 }}><div style={{ background: P.esmeralda, borderRadius: 24, padding: '18px 12px', height: 150, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Img src={staticFile('logo-globo.png')} style={{ width: 54, height: 54 }} />
            <div style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 22, color: P.blanco, lineHeight: 1.15 }}>Centro Latino de Capacitación</div></div></Entra>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const Hud = ({ u }) => {
  const ent = ap(u, 0, 24);
  const actual = S.reduce((m, s, i) => (u >= s - 22 ? i : m), 0);
  const cap = u >= S[FIN] - 22 ? 9 : CAP[actual];
  return (<>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 170, background: 'linear-gradient(#EDF6FC 55%, rgba(237,246,252,0))' }} />
    <div style={{ position: 'absolute', left: 120, top: 56, display: 'flex', alignItems: 'center', gap: 14, fontFamily: TIGHT, fontWeight: 700, fontSize: 22, letterSpacing: 4, color: P.grafito, opacity: ent }}>
      <Img src={staticFile('logo-globo.png')} style={{ width: 40, height: 40 }} />NOTARIO PÚBLICO · MARYLAND · REPASO FINAL</div>
    <div style={{ position: 'absolute', right: 120, top: 52, display: 'flex', gap: 8, opacity: ent }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((c) => { const on = c === cap, paso = cap > c; return (
        <div key={c} style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: TIGHT, fontWeight: 900, fontSize: 22,
          background: on ? CAP_COLOR[c] : paso ? `${CAP_COLOR[c]}33` : 'rgba(0,0,0,0.05)', color: on ? P.blanco : paso ? CAP_COLOR[c] : '#9AA3AB', transform: `scale(${on ? 1.12 : 1})`, boxShadow: on ? `0 8px 18px ${CAP_COLOR[c]}55` : 'none' }}>{c}</div>); })}
    </div>
    <div style={{ position: 'absolute', left: 120, right: 120, top: 110, height: 3, background: 'rgba(0,0,0,0.07)', borderRadius: 2, opacity: ent }}>
      <div style={{ height: 3, borderRadius: 2, background: P.esmeralda, width: `${(u / TOT) * 100}%` }} /></div>
  </>);
};

// Effect files already peak at −13 dBFS (sonidos.py), so they play at full volume.
const efectos = () => {
  const fx = [['swoosh', 28], ...Array.from({ length: FIN }, (_, k) => ['swoosh', S[k + 1] - 24])];
  const pop = (i, re, nm = 'ui-pop') => fx.push([nm, cuando(i, re)]);
  pop(0, /repaso/); for (let k = 0; k < 8; k++) fx.push(['tick', cuando(0, /principio/) + k * 6]);
  pop(1, /testigo/); [/abogado/, /consejos/, /prepara/, /latinoamérica/].forEach((re) => pop(1, re, 'negativo'));
  pop(2, /senador/); pop(2, /gobernador/); [/título/, /comar/, /cuatro|^4$/, /todo/].forEach((re) => pop(2, re, 'tick'));
  pop(3, /veinticinco|^25$/); [/certificados/, /identificación/, /distrito/, /referencias/].forEach((re) => pop(3, re, 'tick')); pop(3, /antecedentes/, 'negativo');
  pop(4, /treinta|^30$/); pop(4, /clerk/); pop(4, /once|^11$/, 'check'); pop(4, /revocan/, 'negativo');
  pop(5, /sello/, 'sello'); pop(5, /journal/, 'papel'); pop(5, /diez|^10$/, 'ui-pop');
  pop(6, /acknowledgment/); pop(6, /jurat/); pop(6, /afirma/, 'check'); [/testigo/, /copias/, /protesto/].forEach((re) => pop(6, re, 'tick'));
  pop(7, /condado/, 'pluma'); pop(7, /nombre/, 'pluma'); pop(7, /firma/, 'pluma'); pop(7, /sello/, 'sello'); pop(7, /después/, 'check');
  pop(8, /^nota$/, 'papel'); pop(8, /marca/, 'pluma'); pop(8, /apostilla/, 'negativo'); pop(8, /clerk/); pop(8, /secretaría/);
  PASOS.forEach(([, , re]) => pop(9, re, 'tick')); pop(9, /saltas/, 'negativo');
  pop(10, /conoces/); pop(10, /gobierno/); [/pasaporte/, /licencia/, /matrícula/].forEach((re) => pop(10, re, 'tick')); pop(10, /testigo/);
  [/entiende/, /identificar/, /presión/, /fraude/].forEach((re) => pop(11, re, 'negativo')); pop(11, /respeto/, 'check');
  pop(12, /ocho|^8$/); pop(12, /cuatro|^4$/); pop(12, /cinco|^5$/); pop(12, /nunca/, 'sello');
  [/consejos/, /preparar/, /inmigración/].forEach((re) => pop(13, re, 'negativo')); pop(13, /notario/, 'negativo'); pop(13, /notary/, 'check');
  pop(14, /esposo/, 'negativo'); [/identificar/, /cobrar/, /publicidad/].forEach((re) => pop(14, re, 'tick')); pop(14, /revocación/, 'sello');
  pop(15, /treinta|^30$/); pop(15, /inmediato/, 'negativo'); pop(15, /sesenta|^60$/, 'check');
  [/oficina/, /domicilio/, /copias/, /hipotecarias/].forEach((re) => pop(16, re, 'tick')); pop(16, /seguro/, 'check'); pop(16, /tienda/);
  [/repasa/, /ejercicios/, /examen/].forEach((re) => pop(FIN, re)); pop(FIN, /capacitación/, 'chime');
  fx.push(['swoosh', TF]); NUMEROS.forEach((_, k) => fx.push(['tick', TF + 30 + k * 7])); fx.push(['chime', TF + 30 + NUMEROS.length * 7 + 10]);
  return fx;
};
const Sonido = ({ musica, solo }) => {
  const voz = datos.escenas.map((e, i) => [S[i], finVoz(i)]);
  const enVoz = (u) => voz.reduce((m, [a, b]) => Math.max(m, interpolate(u, [a - 10, a, b, b + 14], [0, 1, 1, 0], cl)), 0);
  const vol = (fr) => { const u = fr / K; return (0.24 - 0.15 * enVoz(u)) * lin(u, 0, 15, 0, 1, Easing.linear) * (1 - lin(u, TOT - 60, TOT, 0, 1, Easing.linear)); };
  return (<>
    {!solo && <Audio src={staticFile(musica)} volume={vol} loop />}
    {solo !== 'efectos' && datos.escenas.map((e, i) => <Sequence key={i} from={Math.round(S[i] * K)}><Audio src={staticFile(`notario-9-1/${e.audio}`)} /></Sequence>)}
    {solo !== 'voz' && efectos().map(([nm, en], k) => <Sequence key={`fx${k}`} from={Math.round(Math.max(0, en) * K)} durationInFrames={150}><Audio src={staticFile(`sfx/${nm}.mp3`)} /></Sequence>)}
  </>);
};

export const NotarioRepaso = ({ musica = 'musica-clc.mp3', solo }) => {
  const u = useU(); const c = camara(u);
  // Only the panels near the camera are drawn: 18 panels at once would slow down the render
  const cerca = (k) => u > S[FIN] - 60 || Math.abs(PUNTOS[k].x - c.x) < 3200 / c.z && Math.abs(PUNTOS[k].y - c.y) < 2200 / c.z;
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(160deg, #EAF6FD 0%, #F8FCFE 50%, #EEF8F2 100%)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: `translate(${W / 2}px, ${H / 2}px) scale(${c.z}) translate(${-c.x}px, ${-c.y}px)` }}>
        <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width="1" height="1">
          <defs><pattern id="pi" width="56" height="56" patternUnits="userSpaceOnUse"><circle cx="28" cy="28" r="2.6" fill="#1E88D6" opacity="0.14" /></pattern></defs>
          <rect x="-4000" y="-4000" width="18000" height="13000" fill="url(#pi)" />
        </svg>
        {PANELES.map((Pk, k) => (cerca(k) ? <Pk key={k} u={u} /> : null))}
      </div>
      {u > S[FIN] && <Cierre u={u} />}
      {u > TF - 4 && <Numeros u={u} />}
      <Hud u={u} />
      <Sonido musica={musica} solo={solo} />
    </AbsoluteFill>
  );
};
