import { registerRoot, Composition } from 'remotion';
import { NotarioCertificados, TOTAL_IN as T43, FPS_IN } from './NotarioCertificados';

const Raiz = () => (<>
  <Composition id="NotarioCertificados" component={NotarioCertificados} durationInFrames={T43} fps={FPS_IN} width={1920} height={1080} defaultProps={{ musica: 'musica-clc.mp3' }} />
</>);
registerRoot(Raiz);
