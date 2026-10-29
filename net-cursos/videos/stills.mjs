import { bundle } from '@remotion/bundler';
import { selectComposition, renderStill } from '@remotion/renderer';
import fs from 'fs';
const [,, comp, framesFile, outDir] = process.argv;
const frames = JSON.parse(fs.readFileSync(framesFile, 'utf8'));
const serveUrl = await bundle({ entryPoint: process.cwd() + '/src/index.jsx' });
const browserExecutable = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const composition = await selectComposition({ serveUrl, id: comp, browserExecutable });
for (const f of frames) { await renderStill({ composition, serveUrl, frame: f, output: `${outDir}/s-${f}.png`, browserExecutable, scale: 0.5 }); console.log('ok', f); }
