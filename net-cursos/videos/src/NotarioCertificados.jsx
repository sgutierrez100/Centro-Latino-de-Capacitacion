// Lesson 4.3 «Los certificados notariales: cómo llenarlos» of the Maryland course (horizontal 1920×1080, course video).
// Same style as 1.2–1.5: lesson map, canvas WITHOUT a line, the camera goes in a different direction for each idea.
// Certificate parts from SG § 18-215; phrases are the short forms of SG § 18-216. All names and dates are invented examples.
import { AbsoluteFill, Sequence, Audio, Img, staticFile, useCurrentFrame, interpolate, Easing } from 'remotion';
import { TIGHT } from './fuentes';
import datos from './datos/notario-4-3.json';

const P = { tinta: '#111111', grafito: '#4A4A46', blanco: '#FFFFFF', esmeralda: '#0E9F5B', coral: '#FF6B4A', rojo: '#E5484D', azul: '#1E88D6', sol: '#FFC93C', naranja: '#F28C28', morado: '#7B61FF' };
export const FPS_IN = 60; const K = FPS_IN / 30; const W = 1920, H = 1080;
const EXPO = Easing.bezier(0.16, 1, 0.3, 1); const SUAVE = Easing.bezier(0.65, 0, 0.35, 1);
const cl = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const lin = (u, a, b, de, a2, e = EXPO) => interpolate(u, [a, b], [de, a2], { ...cl, easing: e });
const ap = (u, d, dur = 26) => lin(u, d, d + dur, 0, 1);
const useU = () => useCurrentFrame() / K;

const INICIO = 76, PAUSA = 22;
const EXTRA = { 7: 20 };
const S = datos.escenas.reduce((acc, e, i) => [...acc, i ? acc[i - 1] + Math.ceil(datos.escenas[i - 1].dura * 30) + PAUSA + (EXTRA[i] || 0) : INICIO], []);
// After the summary: the complete certificate, with no voice (FINAL units)
const FINAL = 300;
const TF = S.at(-1) + Math.ceil(datos.escenas.at(-1).dura * 30) + 26;
const TOT = TF + FINAL;
export const TOTAL_IN = Math.round(TOT * K);
const limpia = (t) => t.toLowerCase().replace(/[¿?¡!.,:;]/g, '');
const palabra = (i, re, n = 0) => datos.escenas[i].palabras.filter((p) => re.test(limpia(p.t)))[n];
const cuando = (i, re, n = 0) => { const w = palabra(i, re, n); return S[i] + (w ? Math.round(w.de * 30) : 0) - 3; };
const finVoz = (i) => S[i] + Math.ceil(datos.escenas[i].dura * 30);

// right, down, left, down, right, up-right, diagonal down
const PUNTOS = [{ x: 0, y: 0 }, { x: 2300, y: 200 }, { x: 2100, y: 1700 }, { x: -200, y: 1500 }, { x: 0, y: 3100 }, { x: 2300, y: 2900 }, { x: 4500, y: 1600 }];
const MAPA = { x: 2150, y: 1550, z: 0.15 };
const PW = 1340, PH = 600;
const LLEGA = PUNTOS.map((_, k) => (k ? S[k] - 22 : 34));
const camara = (u) => {
  const p0 = lin(u, 28, 70, 0, 1, SUAVE);
  let x = MAPA.x + (PUNTOS[0].x - MAPA.x) * p0, y = MAPA.y + (PUNTOS[0].y - MAPA.y) * p0;
  let z = Math.exp(Math.log(MAPA.z) * (1 - p0));
  for (let k = 1; k <= 6; k++) {
    const p = lin(u, S[k] - 22, S[k] + 12, 0, 1, SUAVE);
    if (p > 0) { x = PUNTOS[k - 1].x + (PUNTOS[k].x - PUNTOS[k - 1].x) * p; y = PUNTOS[k - 1].y + (PUNTOS[k].y - PUNTOS[k - 1].y) * p; z = 1 - 0.16 * Math.sin(Math.PI * p); }
  }
  const q = lin(u, S[7] - 20, S[7] + 30, 0, 1, SUAVE);
  return { x: x + (MAPA.x - x) * q, y: y + (MAPA.y - y) * q, z: Math.exp(Math.log(z) + (Math.log(MAPA.z) - Math.log(z)) * q) };
};

const Ico = ({ n, s = 44, c = P.blanco, w = 2.1 }) => {
  const D = {
    doc: <><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 12h7M9 16h5" /></>,
    sello: <><path d="M9 4h6v5a3 3 0 0 0 3 3H6a3 3 0 0 0 3-3z" /><rect x="4" y="12" width="16" height="4" rx="1" /><path d="M5 20h14" /></>,
    firma: <><path d="M3 17c3-6 5-9 7-9 2.5 0-1.5 9 1 9 1.5 0 2.5-4 4-4 1 0 1 2 2 2h4" /><path d="M3 21h18" /></>,
    pluma: <><path d="M4 20l4-1 11-11-3-3L5 16z" /><path d="M14 6l3 3" /></>,
    pin: <><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.6" /></>,
    calendario: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
    persona: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></>,
    reloj: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    mano: <><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V12M14 11.5V6a1.5 1.5 0 0 1 3 0v8c0 4-2.5 7-6.5 7S5 18.5 4 16l-1.5-3.5a1.4 1.4 0 0 1 2.4-1.4L8 14" /></>,
    check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
    equis: <path d="M6 6l12 12M18 6L6 18" />,
    flecha: <path d="M4 12h15M13 6l6 6-6 6" />,
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
const COLORES = [P.esmeralda, P.azul, P.naranja, P.morado, P.rojo, P.coral, P.sol];
const Panel = ({ k, u, children, h = PH }) => {
  const v = ap(u, LLEGA[k] + 8, 32);
  return (<>
    <div style={{ position: 'absolute', left: PUNTOS[k].x - PW / 2, top: PUNTOS[k].y - h / 2 + 40, width: PW, height: h, boxSizing: 'border-box', borderRadius: 40, border: '14px dashed #8FB6CC', background: 'rgba(214,234,245,0.55)', opacity: ap(u, k * 3, 16) * (1 - Math.min(1, v * 4)), transform: `scale(${0.8 + 0.2 * ap(u, k * 3, 16)})` }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 260, height: 260, borderRadius: 130, background: COLORES[k], display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: TIGHT, fontWeight: 900, fontSize: 150, color: P.blanco }}>{['A', 'B', 'C', 'D', 'E', 'F', 'G'][k]}</div>
    </div>
    <div style={{ position: 'absolute', left: PUNTOS[k].x - PW / 2, top: PUNTOS[k].y - h / 2 + 40, width: PW, height: h, boxSizing: 'border-box', padding: '44px 56px', background: P.blanco, borderRadius: 40,
      boxShadow: '0 44px 100px rgba(20,60,90,0.14)', opacity: v, transform: `scale(${0.95 + 0.05 * v})`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}><div style={{ position: 'relative' }}>{children}</div></div>
  </>);
};

// A · Intro
const P0 = ({ u }) => (
  <Panel k={0} u={u}>
    <div style={{ display: 'flex', gap: 50, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <Entra u={u} d={40}><div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: P.esmeralda }}>LECCIÓN 4.3 · MARYLAND</div></Entra>
        <Entra u={u} d={cuando(0, /certificado/)} style={{ marginTop: 14 }}><T size={80}>Los certificados</T></Entra>
        <Entra u={u} d={cuando(0, /certificado/) + 8}><T size={80} color={P.esmeralda}>notariales</T></Entra>
        <Entra u={u} d={cuando(0, /tener/)} style={{ marginTop: 26 }}><Txt size={32} color={P.grafito} peso={700}>Qué debe tener y cómo llenarlo</Txt></Entra>
      </div>
      <Entra u={u} d={cuando(0, /lección/)} style={{ flex: 'none', position: 'relative' }}>
        <Hoja style={{ width: 430, fontSize: 22, lineHeight: 1.7 }}>
          <div><b>State of Maryland</b>, County of ____</div>
          <div>This record was acknowledged before me on ____ by ____.</div>
          <div style={{ marginTop: 18, borderTop: '2px solid #333', width: 220 }} />
          <div style={{ fontSize: 18 }}>Notary Public</div>
        </Hoja>
        <div style={{ position: 'absolute', right: -18, bottom: -22, opacity: ap(u, cuando(0, /errores/), 18) }}><Burbuja color={P.esmeralda} s={84} v={ap(u, cuando(0, /errores/), 18)}><Ico n="check" s={46} w={3} /></Burbuja></div>
      </Entra>
    </div>
  </Panel>
);

// B · Lo llenas, lo firmas y lo sellas
const P1 = ({ u }) => {
  const items = [['pluma', P.azul, 'Lo llenas', 'lugar, fecha y nombre', /llenas/], ['firma', P.naranja, 'Lo firmas', 'con tu firma registrada', /firmas/], ['sello', P.morado, 'Lo sellas', 'con tu sello oficial', /sellas/]];
  return (
    <Panel k={1} u={u}>
      <Entra u={u} d={S[1] - 4}><T size={56}>El certificado: lo que tú escribes</T></Entra>
      <div style={{ display: 'flex', gap: 20, marginTop: 34 }}>
        {items.map(([ic, c, t, s, re]) => { const d = cuando(1, re); return (
          <Entra key={t} u={u} d={d} y={34} style={{ flex: 1, display: 'flex' }}><Tarjeta style={{ flex: 1, textAlign: 'center', padding: '28px 14px' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}><Burbuja color={c} s={92} v={ap(u, d, 20)}><Ico n={ic} s={52} /></Burbuja></div>
            <div style={{ marginTop: 18 }}><Txt size={36}>{t}</Txt></div><Sub size={23}>{s}</Sub></Tarjeta></Entra>); })}
      </div>
      <Entra u={u} d={cuando(1, /todo/)} style={{ marginTop: 26 }}><Txt size={30} color={P.esmeralda} peso={700}>Todo acto notarial lleva su certificado (SG § 18-215).</Txt></Entra>
    </Panel>
  );
};

// C · El lugar
const P2 = ({ u }) => {
  const tS = cuando(2, /state/), tC = cuando(2, /county/), tD = cuando(2, /donde/), tN = cuando(2, /siempre/);
  return (
    <Panel k={2} u={u}>
      <T size={56}>1 · El lugar del acto</T>
      <div style={{ display: 'flex', gap: 40, marginTop: 30, alignItems: 'center' }}>
        <Entra u={u} d={tS} style={{ flex: 'none' }}><Hoja style={{ width: 640 }}>
          <div><Marca u={u} d={tS}>State of <b>Maryland</b></Marca>, <Marca u={u} d={tC} color="#CFE8FA">County of</Marca> <Llenado u={u} d={tD}>Prince George's</Llenado></div>
        </Hoja></Entra>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Entra u={u} d={tD} style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Burbuja color={P.esmeralda} s={70} v={ap(u, tD, 20)}><Ico n="pin" s={40} /></Burbuja><Txt size={30}>El condado donde estás al notarizar</Txt></Entra>
          <Entra u={u} d={tN} style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Burbuja color={P.coral} s={70} v={ap(u, tN, 20)}><Ico n="equis" s={38} w={3} /></Burbuja><Txt size={30} color="#9A3B3B">No siempre el de tu comisión</Txt></Entra>
        </div>
      </div>
    </Panel>
  );
};

// D · Fecha y nombre
const P3 = ({ u }) => {
  const tF = cuando(3, /fecha/), tN = cuando(3, /nombre/), tR = cuando(3, /real/), tB = cuando(3, /blanco/);
  return (
    <Panel k={3} u={u}>
      <T size={56}>2 · La fecha y el nombre</T>
      <Entra u={u} d={tF} style={{ marginTop: 28 }}><Hoja>
        This record was acknowledged before me on the <Llenado u={u} d={tF}>15th</Llenado> day of <Llenado u={u} d={tF + 6}>October</Llenado>, 20<Llenado u={u} d={tF + 10}>26</Llenado> by <Llenado u={u} d={tN}>Carlos A. Ramírez</Llenado>.
      </Hoja></Entra>
      <div style={{ display: 'flex', gap: 22, marginTop: 26 }}>
        <Entra u={u} d={tR} style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Burbuja color={P.azul} s={64} v={ap(u, tR, 20)}><Ico n="calendario" s={36} /></Burbuja><Txt size={28}>La fecha real del acto</Txt></Entra>
        <Entra u={u} d={tB} style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Burbuja color={P.rojo} s={64} v={ap(u, tB, 20)}><Ico n="equis" s={34} w={3} /></Burbuja><Txt size={28}>Ningún espacio en blanco</Txt></Entra>
      </div>
      <Entra u={u} d={finVoz(3) - 26} style={{ marginTop: 14 }}><Sub size={21}>Ejemplo con datos inventados.</Sub></Entra>
    </Panel>
  );
};

// E · La frase de cada acto
const P4 = ({ u }) => {
  const col = (en, es, c, ic, d, frase, df, mc) => (
    <Entra u={u} d={d} y={36} style={{ flex: 1, display: 'flex' }}><div style={{ flex: 1, borderRadius: 28, background: '#F6F9FB', borderTop: `10px solid ${c}`, padding: '24px 26px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Burbuja color={c} s={76} v={ap(u, d, 20)}><Ico n={ic} s={42} /></Burbuja>
        <div><div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 40, color: '#0F2A44' }}>{en}</div><Sub size={23} color={c}>{es}</Sub></div></div>
      <div style={{ marginTop: 20, fontFamily: 'Georgia, serif', fontSize: 30, color: '#222', lineHeight: 1.4 }}>«<Marca u={u} d={df} color={mc}>{frase}</Marca>»</div>
    </div></Entra>);
  return (
    <Panel k={4} u={u}>
      <T size={56}>3 · La frase de cada acto</T>
      <div style={{ display: 'flex', gap: 26, marginTop: 30 }}>
        {col('acknowledgment', 'reconocimiento de firma', P.azul, 'firma', cuando(4, /^acknowledgment$/), 'acknowledged before me', cuando(4, /acknowledged/), '#CFE8FA')}
        {col('jurat', 'verificación bajo juramento', P.esmeralda, 'mano', cuando(4, /jurat/), 'signed and sworn to (or affirmed) before me', cuando(4, /sworn/), '#BDEFD2')}
      </div>
    </Panel>
  );
};

// F · Firma, cargo y sello
const P5 = ({ u }) => {
  const tF = cuando(5, /firma/), tN = cuando(5, /notary/), tS = cuando(5, /sello/), tC = cuando(5, /claro/);
  const vs = ap(u, tS, 18);
  return (
    <Panel k={5} u={u}>
      <T size={56}>4 · Tu firma, tu cargo y tu sello</T>
      <div style={{ display: 'flex', gap: 46, marginTop: 30, alignItems: 'center' }}>
        <Entra u={u} d={tF} style={{ flex: 'none' }}><Hoja style={{ width: 560, position: 'relative' }}>
          <div style={{ height: 64, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 42, color: '#1F3A68', opacity: ap(u, tF + 4, 18) }}>María G. Hernández</div>
          <div style={{ borderTop: '2px solid #333', width: 420 }} />
          <div style={{ fontSize: 24 }}>Signature of notarial officer</div>
          <div style={{ fontSize: 26, marginTop: 6 }}><Marca u={u} d={tN} color="#FFE3B8"><b>Notary Public</b></Marca></div>
        </Hoja></Entra>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <div style={{ opacity: vs, transform: `scale(${1.25 - 0.25 * vs}) rotate(-3deg)`, border: '6px double #1F3A68', borderRadius: 16, padding: '16px 26px', textAlign: 'center', fontFamily: TIGHT, fontWeight: 800, color: '#1F3A68', background: '#F7F9FD' }}>
            <div style={{ fontSize: 26 }}>MARÍA G. HERNÁNDEZ</div><div style={{ fontSize: 20 }}>NOTARY PUBLIC</div><div style={{ fontSize: 20 }}>MONTGOMERY COUNTY</div></div>
          <Entra u={u} d={tC}><Txt size={28} color={P.esmeralda} peso={700}>Claro y sin tapar el texto</Txt></Entra>
          <Entra u={u} d={tC + 10}><Sub size={19}>Ejemplo con datos inventados.</Sub></Entra>
        </div>
      </div>
    </Panel>
  );
};

// G · Vencimiento y el orden
const P6 = ({ u }) => {
  const tC = cuando(6, /commission/), tE = cuando(6, /expires/), tR = cuando(6, /recuerda/), tD = cuando(6, /después/);
  return (
    <Panel k={6} u={u}>
      <T size={56}>5 · El vencimiento y el orden</T>
      <Entra u={u} d={tC} style={{ marginTop: 28 }}><Hoja style={{ display: 'inline-block' }}><Marca u={u} d={tE} color="#FFE3B8">My commission expires:</Marca> <Llenado u={u} d={tE + 10} color={P.naranja}>03/14/2030</Llenado></Hoja></Entra>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 34 }}>
        <Entra u={u} d={tR} style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Burbuja color={P.azul} s={70} v={ap(u, tR, 20)}><Txt size={34} color={P.blanco}>1</Txt></Burbuja><Txt size={32}>Haces el acto</Txt></Entra>
        <Entra u={u} d={tD - 4}><Ico n="flecha" s={60} c={P.grafito} w={2.6} /></Entra>
        <Entra u={u} d={tD} style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Burbuja color={P.esmeralda} s={70} v={ap(u, tD, 20)}><Txt size={34} color={P.blanco}>2</Txt></Burbuja><Txt size={32}>Firmas el certificado</Txt></Entra>
      </div>
    </Panel>
  );
};

const CLAVES = [['lugar', P.azul, /lugar/], ['fecha', P.naranja, /fecha/], ['nombre', P.morado, /nombre/], ['la frase correcta', P.esmeralda, /frase/], ['tu firma', P.coral, /firma/], ['tu sello', P.rojo, /sello/], ['el vencimiento', '#C08A00', /vencimiento/]];
const Resumen = ({ u }) => {
  const v = lin(u, S[7] - 6, S[7] + 30, 0, 1), fuera = 1 - lin(u, TF - 8, TF + 16, 0, 1);
  return (
    <AbsoluteFill style={{ background: `rgba(246,250,253,${0.92 * v})`, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: v * fuera, transform: `scale(${0.96 + 0.04 * v})`, textAlign: 'center', maxWidth: 1500 }}>
        <div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: P.grafito }}>EN RESUMEN, TODO CERTIFICADO LLEVA</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 34 }}>{CLAVES.map(([t, c, re]) => (
          <Entra key={t} u={u} d={cuando(7, re)} y={24}><div style={{ background: c, color: P.blanco, borderRadius: 22, padding: '18px 30px', fontFamily: TIGHT, fontWeight: 900, fontSize: 38, boxShadow: `0 16px 34px ${c}55` }}>{t}</div></Entra>))}</div>
        <Entra u={u} d={cuando(7, /siguiente/)} style={{ marginTop: 56, display: 'inline-flex', alignItems: 'center', gap: 16, background: P.blanco, borderRadius: 999, padding: '18px 34px', boxShadow: '0 20px 50px rgba(20,60,90,0.14)' }}>
          <span style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 30, color: P.grafito }}>Siguiente:</span><span style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 34, color: P.esmeralda }}>4.4 · Casos especiales de firma y apostillas →</span></Entra>
      </div>
    </AbsoluteFill>
  );
};

// The same example the video fills piece by piece, now complete (acknowledgment, SG § 18-216)
const Completo = ({ u }) => {
  const v = ap(u, TF + 6, 30), d = (k) => TF + 34 + k * 9, ts = d(7) + 6, vs = ap(u, ts, 18);
  return (
    <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: v, transform: `translateY(${(1 - v) * 30}px)`, width: 1240 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: P.esmeralda }}>ASÍ QUEDA EL CERTIFICADO COMPLETO</div>
          <Sub size={22}>Acknowledgment · ejemplo con datos inventados</Sub></div>
        <Hoja style={{ marginTop: 22, padding: '40px 54px', fontSize: 33, lineHeight: 1.75, position: 'relative' }}>
          <div>State of <b>Maryland</b>, County of <Llenado u={u} d={d(0)} color={P.azul}>Prince George's</Llenado></div>
          <div style={{ marginTop: 10 }}>This record was acknowledged before me on the <Llenado u={u} d={d(1)} color={P.naranja}>15th</Llenado> day of <Llenado u={u} d={d(1) + 4} color={P.naranja}>October</Llenado>, 20<Llenado u={u} d={d(1) + 8} color={P.naranja}>26</Llenado> by <Llenado u={u} d={d(2)} color={P.morado}>Carlos A. Ramírez</Llenado>.</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 34 }}>
            <div>
              <div style={{ height: 62, fontStyle: 'italic', fontSize: 44, color: '#1F3A68', opacity: ap(u, d(4), 18) }}>María G. Hernández</div>
              <div style={{ borderTop: '2px solid #333', width: 460 }} />
              <div style={{ fontSize: 25 }}>Signature of notarial officer</div>
              <div style={{ fontSize: 28, marginTop: 4 }}><b>Notary Public</b></div>
              <div style={{ fontSize: 28, marginTop: 14 }}>My commission expires: <Llenado u={u} d={d(6)} color="#C08A00">03/14/2030</Llenado></div>
            </div>
            <div style={{ opacity: vs, transform: `scale(${1.25 - 0.25 * vs}) rotate(-3deg)`, border: '6px double #1F3A68', borderRadius: 16, padding: '16px 26px', textAlign: 'center', fontFamily: TIGHT, fontWeight: 800, color: '#1F3A68', background: '#F7F9FD', marginRight: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 26 }}>MARÍA G. HERNÁNDEZ</div><div style={{ fontSize: 20 }}>NOTARY PUBLIC</div><div style={{ fontSize: 20 }}>MONTGOMERY COUNTY</div></div>
          </div>
        </Hoja>
        <Entra u={u} d={ts + 30} style={{ marginTop: 22 }}><Txt size={26} color={P.grafito} peso={700}>La notaria está comisionada en Montgomery, pero hizo el acto en Prince George's.</Txt></Entra>
      </div>
    </AbsoluteFill>
  );
};

const Hud = ({ u }) => {
  const ent = ap(u, 0, 24);
  return (<>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 170, background: 'linear-gradient(#EDF6FC 55%, rgba(237,246,252,0))' }} />
    <div style={{ position: 'absolute', left: 120, top: 56, display: 'flex', alignItems: 'center', gap: 14, fontFamily: TIGHT, fontWeight: 700, fontSize: 22, letterSpacing: 4, color: P.grafito, opacity: ent }}>
      <Img src={staticFile('logo-globo.png')} style={{ width: 40, height: 40 }} />NOTARIO PÚBLICO · MARYLAND · LECCIÓN 4.3</div>
    <div style={{ position: 'absolute', left: 120, right: 120, top: 110, height: 3, background: 'rgba(0,0,0,0.07)', borderRadius: 2, opacity: ent }}>
      <div style={{ height: 3, borderRadius: 2, background: P.esmeralda, width: `${(u / TOT) * 100}%` }} /></div>
  </>);
};

// Effect files already peak at −13 dBFS (sonidos.py), so they play at full volume.
const efectos = () => {
  const fx = [['swoosh', 28], ...[1, 2, 3, 4, 5, 6, 7].map((k) => ['swoosh', S[k] - 24])];
  fx.push(['papel', cuando(0, /lección/)], ['ui-pop', cuando(0, /certificado/)], ['check', cuando(0, /errores/)]);
  [/llenas/, /firmas/, /sellas/].forEach((re) => fx.push(['ui-pop', cuando(1, re)]));
  fx.push(['pluma', cuando(2, /donde/)], ['ui-pop', cuando(2, /donde/)], ['negativo', cuando(2, /siempre/)]);
  fx.push(['pluma', cuando(3, /fecha/)], ['pluma', cuando(3, /nombre/)], ['negativo', cuando(3, /blanco/)]);
  fx.push(['ui-pop', cuando(4, /^acknowledgment$/)], ['ui-pop', cuando(4, /jurat/)], ['tick', cuando(4, /acknowledged/)], ['tick', cuando(4, /sworn/)]);
  fx.push(['pluma', cuando(5, /firma/)], ['sello', cuando(5, /sello/)], ['check', cuando(5, /claro/)]);
  fx.push(['pluma', cuando(6, /expires/) + 10], ['ui-pop', cuando(6, /recuerda/)], ['check', cuando(6, /después/)]);
  CLAVES.forEach(([, , re]) => fx.push(['tick', cuando(7, re)])); fx.push(['chime', cuando(7, /siguiente/)]);
  fx.push(['papel', TF + 6], ['pluma', TF + 34], ['pluma', TF + 52], ['pluma', TF + 70], ['sello', TF + 34 + 63 + 6]);
  return fx;
};
const Sonido = ({ musica, solo }) => {
  const voz = datos.escenas.map((e, i) => [S[i], finVoz(i)]);
  const enVoz = (u) => voz.reduce((m, [a, b]) => Math.max(m, interpolate(u, [a - 10, a, b, b + 14], [0, 1, 1, 0], cl)), 0);
  const vol = (fr) => { const u = fr / K; return (0.24 - 0.15 * enVoz(u)) * lin(u, 0, 15, 0, 1, Easing.linear) * (1 - lin(u, TOT - 50, TOT, 0, 1, Easing.linear)); };
  return (<>
    {!solo && <Audio src={staticFile(musica)} volume={vol} loop />}
    {solo !== 'efectos' && datos.escenas.map((_, i) => <Sequence key={i} from={Math.round(S[i] * K)}><Audio src={staticFile(`notario-4-3/escena-${i + 1}.mp3`)} /></Sequence>)}
    {solo !== 'voz' && efectos().map(([nm, en], k) => <Sequence key={`fx${k}`} from={Math.round(Math.max(0, en) * K)} durationInFrames={150}><Audio src={staticFile(`sfx/${nm}.mp3`)} /></Sequence>)}
  </>);
};

export const NotarioCertificados = ({ musica = 'musica-clc.mp3', solo }) => {
  const u = useU(); const c = camara(u);
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(160deg, #EAF6FD 0%, #F8FCFE 50%, #EEF8F2 100%)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: `translate(${W / 2}px, ${H / 2}px) scale(${c.z}) translate(${-c.x}px, ${-c.y}px)` }}>
        <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width="1" height="1">
          <defs><pattern id="pi" width="56" height="56" patternUnits="userSpaceOnUse"><circle cx="28" cy="28" r="2.6" fill="#1E88D6" opacity="0.14" /></pattern></defs>
          <rect x="-5000" y="-5000" width="15000" height="13000" fill="url(#pi)" />
        </svg>
        <P0 u={u} /><P1 u={u} /><P2 u={u} /><P3 u={u} /><P4 u={u} /><P5 u={u} /><P6 u={u} />
      </div>
      {u > S[7] - 8 && <Resumen u={u} />}
      {u > TF && <Completo u={u} />}
      <Hud u={u} />
      <Sonido musica={musica} solo={solo} />
    </AbsoluteFill>
  );
};
