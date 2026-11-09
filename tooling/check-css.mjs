#!/usr/bin/env node
// Contrôles CSS que Stylelint ne couvre pas (règle CSS-41).
// Usage : node check-css.mjs <fichier-ou-dossier>...
// Sortie : avertissements seulement (code 0) : le mouvement décoratif relève du jugement.
// Limite : le contrôle se fait par fichier. Un fichier qui anime sans aucun
// `prefers-reduced-motion` est signalé ; qu'une neutralisation couvre toutes ses
// animations reste à relire (placement juste après la règle, CSS-04).

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

function collect(path) {
  if (statSync(path).isFile()) return [path];
  return readdirSync(path).flatMap((name) => {
    if (name === 'node_modules' || name.startsWith('.')) return [];
    const full = join(path, name);
    return statSync(full).isDirectory() ? collect(full) : full.endsWith('.css') ? [full] : [];
  });
}

const targets = process.argv.slice(2);
if (targets.length === 0) {
  console.error('Usage : node check-css.mjs <fichier-ou-dossier>...');
  process.exit(2);
}

// Déclaration d'animation ou de transition active (pas `none`, pas une durée nulle, pas un token `--…`).
const MOTION = /(?<![\w-])(animation|animation-name|transition|transition-property)\s*:\s*(?!none\s*[;}]|0s?\s*[;}]|inherit|initial|unset)[^;}]+/gi;

let warningCount = 0;

for (const file of targets.flatMap(collect)) {
  const raw = readFileSync(file, 'utf8');
  // Les commentaires sont blanchis (même longueur) pour garder les numéros de ligne.
  const text = raw.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  if (/prefers-reduced-motion/i.test(text)) continue;
  const first = MOTION.exec(text);
  MOTION.lastIndex = 0;
  if (!first) continue;
  const line = text.slice(0, first.index).split('\n').length;
  console.log(`${file}:${line}  avertissement  CSS-41  mouvement sans @media (prefers-reduced-motion: reduce) dans le fichier`);
  warningCount++;
}

console.log(`\n0 erreur(s), ${warningCount} avertissement(s).`);
process.exit(0);
