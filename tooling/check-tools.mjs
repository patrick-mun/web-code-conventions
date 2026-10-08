#!/usr/bin/env node
// Vérifie la présence des outils nécessaires aux règles [AUTO] du skill.
// Usage : node check-tools.mjs [dossier-du-projet] [--lang css|html]
// Sortie : tableau présent/absent/version. Code 0 si tout est présent, 1 sinon.
// Limite : ne cherche que dans le projet (package.json, node_modules). Un outil
// installé au niveau utilisateur n'est pas vu et sera signalé « absent ».
// Ne vérifie pas le bon fonctionnement des outils, seulement leur présence.

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const langIndex = args.indexOf('--lang');
const lang = langIndex >= 0 ? args.splice(langIndex, 2)[1] : 'css';
const root = resolve(args[0] ?? '.');

// Une entrée par langage : paquets npm et fichiers de configuration attendus.
const REQUIRED = {
  css: {
    packages: [
      'prettier',
      'stylelint',
      'stylelint-config-standard',
      'stylelint-order',
      'stylelint-declaration-strict-value',
    ],
    configs: [
      { name: 'configuration Stylelint', files: ['stylelint.config.mjs', 'stylelint.config.js', 'stylelint.config.cjs', '.stylelintrc', '.stylelintrc.json', '.stylelintrc.yml', '.stylelintrc.yaml', '.stylelintrc.js', '.stylelintrc.cjs', '.stylelintrc.mjs'], packageKey: 'stylelint' },
      { name: 'configuration Prettier', files: ['prettier.config.json', 'prettier.config.js', 'prettier.config.mjs', 'prettier.config.cjs', '.prettierrc', '.prettierrc.json', '.prettierrc.yml', '.prettierrc.yaml', '.prettierrc.js', '.prettierrc.mjs', '.prettierrc.cjs'], packageKey: 'prettier' },
    ],
  },
  html: {
    packages: ['prettier', 'html-validate'],
    configs: [
      { name: 'configuration html-validate', files: ['.htmlvalidate.json', '.htmlvalidate.js', '.htmlvalidate.cjs', '.htmlvalidate.mjs'], packageKey: 'htmlvalidate' },
      { name: 'configuration Prettier', files: ['prettier.config.json', 'prettier.config.js', 'prettier.config.mjs', 'prettier.config.cjs', '.prettierrc', '.prettierrc.json', '.prettierrc.yml', '.prettierrc.yaml', '.prettierrc.js', '.prettierrc.mjs', '.prettierrc.cjs'], packageKey: 'prettier' },
    ],
  },
};

if (!REQUIRED[lang]) {
  console.error(`Langage « ${lang} » non pris en charge (disponible : ${Object.keys(REQUIRED).join(', ')}).`);
  process.exit(2);
}

const rows = [];
const add = (name, status, detail = '') => rows.push({ name, status, detail });

// Node
add('node', 'présent', process.version);

// package.json
const pkgPath = join(root, 'package.json');
let pkg = null;
if (existsSync(pkgPath)) {
  try {
    pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    add('package.json', 'présent');
  } catch {
    add('package.json', 'ILLISIBLE', 'JSON invalide');
  }
} else {
  add('package.json', 'ABSENT', `aucun dans ${root}`);
}

// Paquets : déclarés dans package.json et installés dans node_modules
const declared = { ...(pkg?.dependencies ?? {}), ...(pkg?.devDependencies ?? {}) };
for (const name of REQUIRED[lang].packages) {
  const installedPath = join(root, 'node_modules', name, 'package.json');
  if (existsSync(installedPath)) {
    const version = JSON.parse(readFileSync(installedPath, 'utf8')).version;
    add(name, 'présent', version + (declared[name] ? '' : ' (non déclaré dans package.json)'));
  } else if (declared[name]) {
    add(name, 'ABSENT', 'déclaré mais non installé : lancer npm install');
  } else {
    add(name, 'ABSENT', 'ni déclaré ni installé');
  }
}

// Fichiers de configuration
for (const { name, files, packageKey } of REQUIRED[lang].configs) {
  const found = files.find((f) => existsSync(join(root, f)));
  if (found) add(name, 'présent', found);
  else if (pkg && pkg[packageKey]) add(name, 'présent', `clé « ${packageKey} » de package.json`);
  else add(name, 'ABSENT', 'copier le fichier de tooling/ du skill');
}

// Affichage
const width = Math.max(...rows.map((r) => r.name.length));
console.log(`Outils pour « ${lang} » dans ${root}\n`);
for (const r of rows) {
  console.log(`${r.name.padEnd(width)}  ${r.status.padEnd(8)}  ${r.detail}`);
}

const missing = rows.filter((r) => r.status !== 'présent');
if (missing.length === 0) {
  console.log('\nTout est présent.');
  process.exit(0);
}
console.log(`\n${missing.length} élément(s) à corriger. Tant qu'ils manquent, les règles [AUTO] ne sont pas contrôlées :`);
console.log('les appliquer en relecture manuelle et le signaler à la personne.');
process.exit(1);
