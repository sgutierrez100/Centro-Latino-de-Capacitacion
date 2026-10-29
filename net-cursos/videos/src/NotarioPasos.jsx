// Lesson 5.1 «Los pasos de toda notarización» of the Maryland course (horizontal 1920×1080, course video).
// Same style as 4.3: lesson map, canvas WITHOUT a line, the camera goes in a different direction for each step.
// Presence SG § 18-205, identification SG § 18-206, conflict SG § 18-203, certificate SG § 18-215, journal SG § 18-219. Names and dates are invented examples.
import { AbsoluteFill, Sequence, Audio, Img, staticFile, useCurrentFrame, interpolate, Easing } from 'remotion';
import { TIGHT } from './fuentes';
import datos from './datos/notario-5-1.json';

const P = { tinta: '#111111', grafito: '#4A4A46', blanco: '#FFFFFF', esmeralda: '#0E9F5B', coral: '#FF6B4A', rojo: '#E5484D', azul: '#1E88D6', sol: '#FFC93C', naranja: '#F28C28', morado: '#7B61FF' };
export const FPS_IN = 60; const K = FPS_IN / 30; const W = 1920, H = 1080;
const EXPO = Easing.bezier(0.16, 1, 0.3, 1); const SUAVE = Easing.bezier(0.65, 0, 0.35, 1);
const cl = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const lin = (u, a, b, de, a2, e = EXPO) => interpolate(u, [a, b], [de, a2], { ...cl, easing: e });
const ap = (u, d, dur = 26) => lin(u, d, d + dur, 0, 1);
const useU = () => useCurrentFrame() / K;

const INICIO = 76, PAUSA = 22, CIERRE = 90;
const EXTRA = { 7: 20 };
const S = datos.escenas.reduce((acc, e, i) => [...acc, i ? acc[i - 1] + Math.ceil(datos.escenas[i - 1].dura * 30) + PAUSA + (EXTRA[i] || 0) : INICIO], []);
const TOT = S.at(-1) + Math.ceil(datos.escenas.at(-1).dura * 30) + CIERRE;
export const TOTAL_IN = Math.round(TOT * K);
const limpia = (t) => t.toLowerCase().replace(/[¿?¡!.,:;]/g, '');
const palabra = (i, re, n = 0) => datos.escenas[i].palabras.filter((p) => re.test(limpia(p.t)))[n];
const cuando = (i, re, n = 0) => { const w = palabra(i, re, n); return S[i] + (w ? Math.round(w.de * 30) : 0) - 3; };
const finVoz = (i) => S[i] + Math.ceil(datos.escenas[i].dura * 30);

// down, right, up-right, right, down, left, down-left
const PUNTOS = [{ x: 0, y: 0 }, { x: 200, y: 1500 }, { x: 2400, y: 1300 }, { x: 4400, y: 200 }, { x: 6500, y: 400 }, { x: 6300, y: 1900 }, { x: 4200, y: 2000 }];
const MAPA = { x: 3250, y: 1000, z: 0.15 };
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
    video: <><rect x="2" y="6" width="14" height="12" rx="2" /><path d="M16 10l6-3v10l-6-3z" /></>,
    id: <><rect x="2" y="5" width="20" height="14" rx="2" /><circle cx="8" cy="11" r="2.4" /><path d="M4.8 16.5c.6-1.8 1.8-2.6 3.2-2.6s2.6.8 3.2 2.6M14 10h5M14 14h4" /></>,
    libro: <><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z" /><path d="M4 17a3 3 0 0 1 3-3h11M8 8h6" /></>,
    testigo: <><circle cx="9" cy="8" r="3.4" /><path d="M2.5 20c0-3.6 2.9-6.5 6.5-6.5 1.6 0 3 .6 4.2 1.5" /><path d="M14.5 17.5l2.2 2.2 4.8-4.8" /></>,
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

const Paso = ({ n, children, c }) => <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}><Burbuja color={c} s={78}><Txt size={42} color={P.blanco}>{n}</Txt></Burbuja><T size={54}>{children}</T></div>;
const Linea = ({ u, d, ic, c, children, color = P.tinta, size = 30 }) => (
  <Entra u={u} d={d} style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Burbuja color={c} s={66} v={ap(u, d, 20)}><Ico n={ic} s={36} w={ic === 'equis' || ic === 'check' ? 3 : 2.1} /></Burbuja><Txt size={size} color={color}>{children}</Txt></Entra>);
const Ley = ({ u, d, children }) => <Entra u={u} d={d} style={{ marginTop: 22 }}><Sub size={21}>{children}</Sub></Entra>;
const NOMBRES = ['Presencia', 'Revisión', 'Identificación', 'El acto', 'El certificado', 'El journal'];

// A · Intro
const P0 = ({ u }) => (
  <Panel k={0} u={u}>
    <div style={{ display: 'flex', gap: 50, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <Entra u={u} d={40}><div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 26, letterSpacing: 4, color: P.esmeralda }}>LECCIÓN 5.1 · MARYLAND</div></Entra>
        <Entra u={u} d={cuando(0, /notarización/)} style={{ marginTop: 14 }}><T size={78}>Los pasos de toda</T></Entra>
        <Entra u={u} d={cuando(0, /notarización/) + 8}><T size={78} color={P.esmeralda}>notarización</T></Entra>
        <Entra u={u} d={cuando(0, /documento/)} style={{ marginTop: 26 }}><Txt size={32} color={P.grafito} peso={700}>Siempre los mismos, sin importar el documento</Txt></Entra>
      </div>
      <div style={{ flex: 'none', display: 'grid', gridTemplateColumns: 'repeat(3, 120px)', gap: 18 }}>
        {COLORES.slice(0, 6).map((c, k) => { const d = cuando(0, /orden/) + k * 5; return (
          <Entra key={k} u={u} d={d} y={20}><div style={{ width: 120, height: 120, borderRadius: 34, background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 14px 30px ${c}55`, fontFamily: TIGHT, fontWeight: 900, fontSize: 62, color: P.blanco }}>{k + 1}</div></Entra>); })}
      </div>
    </div>
  </Panel>
);

// B · Presencia
const P1 = ({ u }) => {
  const tF = cuando(1, /frente/), tD = cuando(1, /distancia/), tA = cuando(1, /autorizado/), tN = cuando(1, /nunca/);
  const card = (ic, c, t, s, d) => (
    <Entra u={u} d={d} y={34} style={{ flex: 1, display: 'flex' }}><Tarjeta style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 20, padding: '26px 26px' }}>
      <Burbuja color={c} s={92} v={ap(u, d, 20)}><Ico n={ic} s={52} /></Burbuja><div><Txt size={36}>{t}</Txt><Sub size={23}>{s}</Sub></div></Tarjeta></Entra>);
  return (
    <Panel k={1} u={u}>
      <Paso n="1" c={COLORES[0]}>La persona se presenta ante ti</Paso>
      <div style={{ display: 'flex', gap: 22, marginTop: 34 }}>
        {card('persona', P.esmeralda, 'En persona', 'frente a ti', tF)}
        {card('video', P.azul, 'A distancia por video', 'solo si estás autorizado', tD)}
      </div>
      <div style={{ marginTop: 30 }}><Linea u={u} d={tN} ic="equis" c={P.rojo} color="#9A3B3B">Nunca notarizas a alguien que no está</Linea></div>
      <Ley u={u} d={tA}>SG § 18-205</Ley>
    </Panel>
  );
};

// C · Revisión del documento
const P2 = ({ u }) => {
  const tC = cuando(2, /confirma/), tA = cuando(2, /acto/), tE = cuando(2, /esposo/), tB = cuando(2, /beneficio/);
  return (
    <Panel k={2} u={u}>
      <Paso n="2" c={COLORES[1]}>Revisas el documento</Paso>
      <div style={{ display: 'flex', gap: 44, marginTop: 32, alignItems: 'center' }}>
        <Entra u={u} d={S[2] + 20} style={{ flex: 'none' }}><Hoja style={{ width: 560, fontSize: 25, lineHeight: 1.6 }}>
          <div>State of Maryland, County of ____</div>
          <div>This record was <Marca u={u} d={tA} color="#CFE8FA"><b>acknowledged</b></Marca> before me on ____ by ____.</div>
          <div style={{ marginTop: 14, borderTop: '2px solid #333', width: 240 }} /><div style={{ fontSize: 19 }}>Notary Public</div>
        </Hoja></Entra>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
          <Linea u={u} d={tC} ic="check" c={P.azul}>¿Qué acto pide el certificado?</Linea>
          <Linea u={u} d={tE} ic="equis" c={P.rojo} color="#9A3B3B">Ni tú ni tu esposo o esposa son parte</Linea>
          <Linea u={u} d={tB} ic="equis" c={P.rojo} color="#9A3B3B">Ni reciben un beneficio</Linea>
        </div>
      </div>
      <Ley u={u} d={tB + 10}>SG § 18-203</Ley>
    </Panel>
  );
};

// D · Identificación
const P3 = ({ u }) => {
  const tC = cuando(3, /conoces/), tG = cuando(3, /pasaporte/), tT = cuando(3, /testigo/), tF = cuando(3, /foto/);
  const ids = [['Pasaporte', /pasaporte/], ['Licencia de manejo', /licencia/], ['Matrícula consular', /matrícula/], ['Otra del gobierno con foto y firma', /otra/]];
  const col = (ic, c, t, d, extra) => (
    <Entra u={u} d={d} y={34} style={{ flex: extra ? 1.6 : 1, display: 'flex' }}><div style={{ flex: 1, borderRadius: 28, background: '#F6F9FB', borderTop: `10px solid ${c}`, padding: '24px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Burbuja color={c} s={70} v={ap(u, d, 20)}><Ico n={ic} s={40} /></Burbuja><Txt size={32}>{t}</Txt></div>
      {extra}</div></Entra>);
  return (
    <Panel k={3} u={u}>
      <Paso n="3" c={COLORES[2]}>Identificas a la persona</Paso>
      <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
        {col('persona', P.esmeralda, 'La conoces personalmente', tC)}
        {col('id', P.naranja, 'Identificación del gobierno', tG, <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 18 }}>{ids.map(([t, re]) => (
          <Entra key={t} u={u} d={cuando(3, re)} y={14}><div style={{ background: P.blanco, border: `3px solid ${P.naranja}`, borderRadius: 16, padding: '8px 16px', fontFamily: TIGHT, fontWeight: 800, fontSize: 23, color: '#8A4B0A' }}>{t}</div></Entra>))}</div>)}
        {col('testigo', P.morado, 'Un testigo creíble', tT)}
      </div>
      <Ley u={u} d={tF}>SG § 18-206</Ley>
    </Panel>
  );
};

// E · El acto
const P4 = ({ u }) => {
  const col = (en, es, c, ic, d, lineas) => (
    <Entra u={u} d={d} y={36} style={{ flex: 1, display: 'flex' }}><div style={{ flex: 1, borderRadius: 28, background: '#F6F9FB', borderTop: `10px solid ${c}`, padding: '24px 26px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}><Burbuja color={c} s={76} v={ap(u, d, 20)}><Ico n={ic} s={42} /></Burbuja>
        <div><div style={{ fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 40, color: '#0F2A44' }}>{en}</div><Sub size={23} color={c}>{es}</Sub></div></div>
      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>{lineas.map(([t, dd]) => <Entra key={t} u={u} d={dd} y={14}><Txt size={29} peso={700}>{t}</Txt></Entra>)}</div>
    </div></Entra>);
  return (
    <Panel k={4} u={u}>
      <Paso n="4" c={COLORES[3]}>Haces el acto</Paso>
      <div style={{ display: 'flex', gap: 26, marginTop: 30 }}>
        {col('acknowledgment', 'reconocimiento de firma', P.azul, 'firma', cuando(4, /acknowledgment/), [['Declara que la firma es suya', cuando(4, /declara/)]])}
        {col('jurat', 'verificación bajo juramento', P.esmeralda, 'mano', cuando(4, /jurat/), [['Firma frente a ti', cuando(4, /frente/)], ['Le tomas el juramento o la afirmación', cuando(4, /juramento/)]])}
      </div>
    </Panel>
  );
};

// F · El certificado
const P5 = ({ u }) => {
  const tL = cuando(5, /lugar/), tF = cuando(5, /fecha/), tN = cuando(5, /nombre/), tFi = cuando(5, /firmas/), tS = cuando(5, /sello/), tV = cuando(5, /vence/);
  const vs = ap(u, tS, 18);
  return (
    <Panel k={5} u={u}>
      <Paso n="5" c={COLORES[4]}>Llenas, firmas y sellas el certificado</Paso>
      <Entra u={u} d={S[5] + 16} style={{ marginTop: 26 }}><Hoja style={{ fontSize: 26, lineHeight: 1.6, display: 'flex', gap: 30, alignItems: 'flex-end' }}>
        <div style={{ flex: 1 }}>
          <div>State of Maryland, County of <Llenado u={u} d={tL}>Montgomery</Llenado></div>
          <div>This record was acknowledged before me on <Llenado u={u} d={tF} color={P.naranja}>10/15/2026</Llenado> by <Llenado u={u} d={tN} color={P.morado}>Carlos A. Ramírez</Llenado>.</div>
          <div style={{ height: 50, marginTop: 6, fontStyle: 'italic', fontSize: 36, color: '#1F3A68', opacity: ap(u, tFi, 18) }}>María G. Hernández</div>
          <div style={{ borderTop: '2px solid #333', width: 380 }} />
          <div style={{ fontSize: 21 }}>Notary Public · My commission expires: <Llenado u={u} d={tV} color="#C08A00">03/14/2030</Llenado></div>
        </div>
        <div style={{ flex: 'none', opacity: vs, transform: `scale(${1.25 - 0.25 * vs}) rotate(-3deg)`, border: '6px double #1F3A68', borderRadius: 16, padding: '12px 20px', textAlign: 'center', fontFamily: TIGHT, fontWeight: 800, color: '#1F3A68', background: '#F7F9FD' }}>
          <div style={{ fontSize: 22 }}>MARÍA G. HERNÁNDEZ</div><div style={{ fontSize: 17 }}>NOTARY PUBLIC</div><div style={{ fontSize: 17 }}>MONTGOMERY COUNTY</div></div>
      </Hoja></Entra>
      <Ley u={u} d={tV + 8}>SG § 18-215 · Ejemplo con datos inventados.</Ley>
    </Panel>
  );
};

// G · El journal
const P6 = ({ u }) => {
  const filas = [['Fecha y hora', '10/15/2026, 3:40 p.m.', /hora/], ['Tipo de acto', 'Acknowledgment', /tipo/], ['Documento', 'Poder notarial, 4 páginas', /documento/], ['Nombre y dirección', 'Carlos A. Ramírez, Silver Spring, MD', /dirección/], ['Identificación', 'Licencia de manejo de Maryland', /identificaste/], ['Tarifa', 'La que cobraste', /tarifa/]];
  return (
    <Panel k={6} u={u}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}><Paso n="6" c={COLORES[5]}>Lo anotas en tu journal</Paso>
        <Entra u={u} d={cuando(6, /journal/)}><Burbuja color={P.coral} s={64} v={ap(u, cuando(6, /journal/), 20)}><Ico n="libro" s={36} /></Burbuja></Entra></div>
      <Entra u={u} d={cuando(6, /journal/) + 6} style={{ marginTop: 24 }}><div style={{ borderRadius: 18, border: '2px solid #D8D2C0', background: '#FFFEF9', overflow: 'hidden' }}>
        {filas.map(([k, v, re], i) => { const d = cuando(6, re); return (
          <div key={k} style={{ display: 'flex', borderTop: i ? '1px solid #E6E0CF' : 'none', padding: '9px 26px', opacity: 0.35 + 0.65 * ap(u, d, 14), background: ap(u, d, 14) > 0.5 ? 'rgba(255,227,184,0.25)' : 'transparent' }}>
            <div style={{ width: 330, fontFamily: TIGHT, fontWeight: 800, fontSize: 25, color: P.tinta }}>{k}</div>
            <div style={{ flex: 1, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 25, color: '#1F3A68', opacity: ap(u, d, 14) }}>{v}</div></div>); })}
      </div></Entra>
      <Ley u={u} d={cuando(6, /cobraste/)}>SG § 18-219 · COMAR 01.02.08.08 · Ejemplo con datos inventados.</Ley>
    </Panel>
  );
};

const CLAVES = NOMBRES.map((t, k) => [t, COLORES[k], [/presencia/, /revisión/, /identificación/, /acto/, /certificado/, /journal/][k]]);
const Resumen = ({ u }) => {
  const v = lin(u, S[7] - 6, S[7] + 30, 0, 1);
  return (
    <AbsoluteFill style={{ background: `rgba(246,250,253,${0.92 * v})`, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity: v, transform: `scale(${0.96 + 0.04 * v})`, textAlign: 'center', maxWidth: 1600 }}>
        <div style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 28, letterSpacing: 4, color: P.grafito }}>EN RESUMEN, LOS SEIS PASOS</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginTop: 34 }}>{CLAVES.map(([t, c, re], k) => (
          <Entra key={t} u={u} d={cuando(7, re)} y={24}><div style={{ display: 'flex', alignItems: 'center', gap: 12, background: c, color: P.blanco, borderRadius: 22, padding: '16px 26px', fontFamily: TIGHT, fontWeight: 900, fontSize: 36, boxShadow: `0 16px 34px ${c}55` }}>
            <span style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 12, padding: '0 12px' }}>{k + 1}</span>{t}</div></Entra>))}</div>
        <Entra u={u} d={cuando(7, /siguiente/)} style={{ marginTop: 56, display: 'inline-flex', alignItems: 'center', gap: 16, background: P.blanco, borderRadius: 999, padding: '18px 34px', boxShadow: '0 20px 50px rgba(20,60,90,0.14)' }}>
          <span style={{ fontFamily: TIGHT, fontWeight: 700, fontSize: 30, color: P.grafito }}>Siguiente:</span><span style={{ fontFamily: TIGHT, fontWeight: 900, fontSize: 34, color: P.esmeralda }}>5.2 · Cómo identificar al firmante y revisar el documento →</span></Entra>
      </div>
    </AbsoluteFill>
  );
};

const Hud = ({ u }) => {
  const ent = ap(u, 0, 24);
  return (<>
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 170, background: 'linear-gradient(#EDF6FC 55%, rgba(237,246,252,0))' }} />
    <div style={{ position: 'absolute', left: 120, top: 56, display: 'flex', alignItems: 'center', gap: 14, fontFamily: TIGHT, fontWeight: 700, fontSize: 22, letterSpacing: 4, color: P.grafito, opacity: ent }}>
      <Img src={staticFile('logo-globo.png')} style={{ width: 40, height: 40 }} />NOTARIO PÚBLICO · MARYLAND · LECCIÓN 5.1</div>
    <div style={{ position: 'absolute', left: 120, right: 120, top: 110, height: 3, background: 'rgba(0,0,0,0.07)', borderRadius: 2, opacity: ent }}>
      <div style={{ height: 3, borderRadius: 2, background: P.esmeralda, width: `${(u / TOT) * 100}%` }} /></div>
  </>);
};

// Effect files already peak at −13 dBFS (sonidos.py), so they play at full volume.
const efectos = () => {
  const fx = [['swoosh', 28], ...[1, 2, 3, 4, 5, 6, 7].map((k) => ['swoosh', S[k] - 24])];
  fx.push(['ui-pop', cuando(0, /notarización/)]); for (let k = 0; k < 6; k++) fx.push(['tick', cuando(0, /orden/) + k * 5]);
  fx.push(['ui-pop', cuando(1, /frente/)], ['ui-pop', cuando(1, /distancia/)], ['negativo', cuando(1, /nunca/)]);
  fx.push(['papel', S[2] + 20], ['check', cuando(2, /confirma/)], ['negativo', cuando(2, /esposo/)]);
  fx.push(['ui-pop', cuando(3, /conoces/)], ['ui-pop', cuando(3, /pasaporte/)], ['tick', cuando(3, /licencia/)], ['tick', cuando(3, /matrícula/)], ['tick', cuando(3, /otra/)], ['ui-pop', cuando(3, /testigo/)]);
  fx.push(['ui-pop', cuando(4, /acknowledgment/)], ['ui-pop', cuando(4, /jurat/)], ['check', cuando(4, /juramento/)]);
  fx.push(['pluma', cuando(5, /lugar/)], ['pluma', cuando(5, /nombre/)], ['pluma', cuando(5, /firmas/)], ['sello', cuando(5, /sello/)]);
  [/hora/, /tipo/, /documento/, /dirección/, /identificaste/, /tarifa/].forEach((re) => fx.push(['tick', cuando(6, re)])); fx.push(['papel', cuando(6, /journal/)]);
  CLAVES.forEach(([, , re]) => fx.push(['tick', cuando(7, re)])); fx.push(['chime', cuando(7, /siguiente/)]);
  return fx;
};
const Sonido = ({ musica, solo }) => {
  const voz = datos.escenas.map((e, i) => [S[i], finVoz(i)]);
  const enVoz = (u) => voz.reduce((m, [a, b]) => Math.max(m, interpolate(u, [a - 10, a, b, b + 14], [0, 1, 1, 0], cl)), 0);
  const vol = (fr) => { const u = fr / K; return (0.24 - 0.15 * enVoz(u)) * lin(u, 0, 15, 0, 1, Easing.linear) * (1 - lin(u, TOT - 50, TOT, 0, 1, Easing.linear)); };
  return (<>
    {!solo && <Audio src={staticFile(musica)} volume={vol} loop />}
    {solo !== 'efectos' && datos.escenas.map((_, i) => <Sequence key={i} from={Math.round(S[i] * K)}><Audio src={staticFile(`notario-5-1/escena-${i + 1}.mp3`)} /></Sequence>)}
    {solo !== 'voz' && efectos().map(([nm, en], k) => <Sequence key={`fx${k}`} from={Math.round(Math.max(0, en) * K)} durationInFrames={150}><Audio src={staticFile(`sfx/${nm}.mp3`)} /></Sequence>)}
  </>);
};

export const NotarioPasos = ({ musica = 'musica-clc.mp3', solo }) => {
  const u = useU(); const c = camara(u);
  return (
    <AbsoluteFill style={{ background: 'linear-gradient(160deg, #EAF6FD 0%, #F8FCFE 50%, #EEF8F2 100%)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, transformOrigin: '0 0', transform: `translate(${W / 2}px, ${H / 2}px) scale(${c.z}) translate(${-c.x}px, ${-c.y}px)` }}>
        <svg style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible' }} width="1" height="1">
          <defs><pattern id="pi" width="56" height="56" patternUnits="userSpaceOnUse"><circle cx="28" cy="28" r="2.6" fill="#1E88D6" opacity="0.14" /></pattern></defs>
          <rect x="-5000" y="-5000" width="17000" height="13000" fill="url(#pi)" />
        </svg>
        <P0 u={u} /><P1 u={u} /><P2 u={u} /><P3 u={u} /><P4 u={u} /><P5 u={u} /><P6 u={u} />
      </div>
      {u > S[7] - 8 && <Resumen u={u} />}
      <Hud u={u} />
      <Sonido musica={musica} solo={solo} />
    </AbsoluteFill>
  );
};
