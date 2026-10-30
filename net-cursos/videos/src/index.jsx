import { registerRoot, Composition } from 'remotion';
import { NotarioCertificados, TOTAL_IN as T43, FPS_IN } from './NotarioCertificados';
import { NotarioPasos, TOTAL_IN as T51 } from './NotarioPasos';
import { NotarioRepaso, TOTAL_IN as T91 } from './NotarioRepaso';
import { PromoNotarioMD, DUR_PROMO, FPS_PROMO } from './PromoNotarioMD';

const Raiz = () => (<>
  <Composition id="NotarioCertificados" component={NotarioCertificados} durationInFrames={T43} fps={FPS_IN} width={1920} height={1080} defaultProps={{ musica: 'musica-clc.mp3' }} />
  <Composition id="NotarioPasos" component={NotarioPasos} durationInFrames={T51} fps={FPS_IN} width={1920} height={1080} defaultProps={{ musica: 'musica-clc.mp3' }} />
  <Composition id="NotarioRepaso" component={NotarioRepaso} durationInFrames={T91} fps={FPS_IN} width={1920} height={1080} defaultProps={{ musica: 'musica-clc.mp3' }} />
  <Composition id="PromoNotarioMDVertical" component={PromoNotarioMD} durationInFrames={Math.round(DUR_PROMO * FPS_PROMO)} fps={FPS_PROMO} width={1080} height={1920} defaultProps={{ formato: 'vertical', musica: 'musica-clc.mp3' }} />
  <Composition id="PromoNotarioMDHorizontal" component={PromoNotarioMD} durationInFrames={Math.round(DUR_PROMO * FPS_PROMO)} fps={FPS_PROMO} width={1920} height={1080} defaultProps={{ formato: 'horizontal', musica: 'musica-clc.mp3' }} />
</>);
registerRoot(Raiz);
