# Règles JS

Les noms de dossiers et le dossier des modules partagés sont dans
`docs/conventions-profile.md`. Les règles HTML et CSS associées sont citées
par leur identifiant.

Contrôle : **[AUTO]** outil de `tooling/`, **[MIXTE]** outil partiel,
**[JUGEMENT]** relecture. Les exemples sont dans `examples/js/`.

Commentaires en français. Noms de variables et de fonctions en anglais.

## Structure

### JS-01 — Modules ES
Le JS se charge par `<script type="module" src="…">` (HTML-22). Aucune
variable globale : pas de `window.x = …`, pas d'IIFE. Un projet qui doit se
charger sans serveur (ouverture directe de `file://`) déroge dans son profil.
Contrôle : [MIXTE] ESLint `no-implicit-globals` et `sourceType: module` ;
présence de `type="module"` en [JUGEMENT].

### JS-02 — Point d'entrée par page
Chaque page charge un seul fichier d'entrée, qui importe les modules dont elle
a besoin. Les modules partagés vivent dans le dossier défini par le profil.
Contrôle : [JUGEMENT]

## DOM

### JS-10 — Accroche par classe `js-` ou `data-*`
Le JS retrouve ses éléments par une classe `js-…` ou un attribut `data-…`
(CSS-22, HTML-30). `getElementById` est interdit, et un sélecteur
`querySelector` / `querySelectorAll` qui vise une classe de style est refusé.
Contrôle : [AUTO] ESLint `no-restricted-properties` et `no-restricted-syntax`
(le sélecteur doit être un littéral ; un sélecteur construit n'est pas analysé).
Exemple : `examples/js/dom.avant.js` → `dom.apres.js`.

### JS-11 — Pas de style direct
Pas d'`el.style.x = …`. Le JS bascule une classe d'état (`classList`, CSS-21) ou
pose une variable CSS (`el.style.setProperty('--x', …)`), que le CSS consomme.
Une animation par image passe par une variable (`--x`, `--angle`) ou par
`setAttribute` sur un SVG ou un canvas. C'est le complément de CSS-01.
Contrôle : [AUTO] ESLint `no-restricted-syntax`.

### JS-12 — Événements
`addEventListener` seulement, jamais `el.onclick = …` (HTML-21). Les écouteurs
`scroll`, `touchstart`, `touchmove` et `wheel` reçoivent `{ passive: true }`.
Le travail qui suit le défilement ou le pointeur est limité à une fois par
image avec `requestAnimationFrame`.
Contrôle : [MIXTE] ESLint pour `on…=` et `passive` ; `requestAnimationFrame` en
[JUGEMENT].
Exemple : `examples/js/events.*.js`.

### JS-13 — Pas d'`innerHTML` avec contenu variable
On écrit `textContent`, ou on construit avec `createElement`. Un balisage
entièrement constant (un SVG écrit en dur) est toléré avec une dérogation
`// eslint-disable-next-line no-restricted-properties -- raison`.
Contrôle : [AUTO] ESLint `no-restricted-properties` ; la raison de la
dérogation est vérifiée en [JUGEMENT] (ESLint ne l'impose pas).

### JS-14 — Élément absent
Une page partagée peut ne pas contenir l'élément cherché : le tester avant de
s'en servir (`if (!el) return;`).
Contrôle : [JUGEMENT]

## Nommage

### JS-20 — Casse
`camelCase` pour variables et fonctions, `UPPER_SNAKE` pour les constantes de
module, `PascalCase` pour les classes.
Contrôle : [MIXTE] ESLint `camelcase` et `new-cap` ; `UPPER_SNAKE` en
[JUGEMENT] (ESLint l'admet sans l'exiger).
Exemple : `examples/js/naming.*.js`.

### JS-21 — Forme des noms
Une fonction commence par un verbe (`toggleMenu`). Un booléen commence par
`is`, `has` ou `can`. Un gestionnaire d'événement s'appelle `handleX`.
Contrôle : [JUGEMENT]

### JS-22 — Langue et fichiers
Noms de variables et de fonctions en anglais. Fichiers en kebab-case, sans
contrainte de langue (`paille-en-queue.js` est valide).
Contrôle : [JUGEMENT]

### JS-23 — Durées et seuils
Une durée ou un seuil dont le sens n'est pas évident devient une constante
nommée avec son unité (`REVEAL_DELAY_MS`), ou se lit dans un attribut `data-*`.
Les calculs d'animation (coefficients, angles) sont exemptés.
Contrôle : [JUGEMENT] (la règle ESLint `no-magic-numbers` produit trop de bruit
sur le code d'animation et n'est pas activée).

## Syntaxe et qualité

### JS-30 — Syntaxe moderne
`const` par défaut, `let` si la valeur est réaffectée, jamais `var`. Égalité
stricte (`===`). Accolades obligatoires quand l'instruction tient sur plusieurs
lignes. `async/await` plutôt que des chaînes de `.then()`.
Contrôle : [MIXTE] ESLint `no-var`, `prefer-const`, `eqeqeq`, `curly` ;
`async/await` en [JUGEMENT].

### JS-31 — Formatage
Prettier : 2 espaces, apostrophes, points-virgules, 100 colonnes, virgule
finale.
Contrôle : [AUTO] Prettier.

### JS-32 — Taille et complexité
Avertissement au-delà de 60 lignes par fonction, de complexité 10 ou de 3
niveaux d'imbrication. Un avertissement appelle un découpage, pas un blocage.
Contrôle : [AUTO] ESLint `max-lines-per-function`, `complexity`, `max-depth`.

### JS-33 — Pas de reste de débogage
Pas de `console.*` laissé dans le code, pas de `catch` vide.
Contrôle : [AUTO] ESLint `no-console` et `no-empty`.

## Accessibilité

### JS-40 — Mouvement réduit
Toute animation décorative teste `prefers-reduced-motion` au démarrage
(équivalent de CSS-41) : `window.matchMedia('(prefers-reduced-motion: reduce)')`.
Contrôle : [JUGEMENT]

## Commentaires (en français)

### JS-50 — En-tête de fichier
Nom du fichier, rôle, pages concernées, accroches `js-` utilisées.
```js
/* ============================================================
   assets/js/geometry.js
   Rôle : calculs géométriques réutilisables par les animations.
   Pages concernées : accueil.
   Accroches : aucune (module de calcul pur).
   ============================================================ */
```
Contrôle : [JUGEMENT]
Exemple : `examples/js/comments.*.js`.

### JS-51 — En-tête de section
Même format que CSS-51 : titre en majuscules entre `── ──`, puis 2 à 3 lignes
de description, `*/` sur sa propre ligne.
Contrôle : [JUGEMENT]

### JS-52 — JSDoc
Toute fonction exportée ou de plus de 15 lignes porte un JSDoc en français : le
rôle, puis `@param` et `@returns` avec leurs types. Pas de types TypeScript.
Contrôle : [JUGEMENT]

### JS-53 — Commentaire inline
Seulement pour dire pourquoi, jamais ce que fait la ligne.
Contrôle : [JUGEMENT]
