# Règles CSS

Les valeurs de conception (couleurs, polices, échelles, points de rupture) sont
définies par le projet, voir `docs/conventions-profile.md`. Ce fichier ne dit
que COMMENT les utiliser.

Contrôle : **[AUTO]** outil de `tooling/`, **[MIXTE]** outil partiel,
**[JUGEMENT]** relecture. Les exemples sont dans `examples/css/`.

## Structure

### CSS-01 — Aucun CSS dans le HTML
Pas de `<style>` ni d'attribut `style=""`, pas de style posé par un attribut
d'événement (`onmouseover`…). Exception tolérée : une valeur calculée à
l'exécution, posée par le JS dans une variable CSS
(`element.style.setProperty('--progress', '40%')`) et consommée par une règle.
Contrôle : [AUTO] html-validate `no-inline-style` et `no-style-tag` (voir HTML-20). Côté JS, le complément est JS-11.
Exemple : `examples/css/inline.avant.html` → `inline.apres.html`.

### CSS-02 — Découpage par rôle
Le CSS est réparti en fichiers par rôle :
1. un fichier de tokens, qui ne contient que des valeurs (`:root`), chargé en premier ;
2. un fichier de base : reset, base, layout, utilitaires ;
3. un fichier par composant, qui contient ses propres media queries ;
4. un fichier par page pour le CSS propre à une page.

Les noms et emplacements des dossiers sont définis dans le profil du projet.
Sous 400 lignes de CSS au total, base et composants peuvent rester dans un seul
fichier. Aucun CSS de page n'est mis dans un fichier partagé. Sans outil de
build, les fichiers se chargent par des `<link>` dans l'ordre de CSS-03 ; pas
d'`@import` CSS (chargement séquentiel).
Contrôle : [JUGEMENT]

### CSS-03 — Ordre de chargement et du contenu
Tokens, reset, base, layout, composants, sections de page, utilitaires,
animations. Les media queries ne forment pas une section : voir CSS-04.
Contrôle : [JUGEMENT]

### CSS-04 — Media query juste après son composant
Chaque media query est placée immédiatement après la règle qu'elle modifie,
jamais regroupée en fin de fichier. Seule exception : celles qui ne ciblent
que des tokens (CSS-06), qui restent dans le fichier de tokens.
Contrôle : [JUGEMENT]
Exemple : `examples/css/media-query.*.css`.

### CSS-05 — Un seul sens de media query
`max-width` par défaut, `min-width` si le profil choisit « mobile d'abord ».
Jamais les deux dans un même projet. Les points de rupture viennent du profil
et sont choisis d'après le contenu, pas d'après un appareil.
Contrôle : [AUTO] `media-feature-name-disallowed-list` (à inverser selon le profil).

### CSS-06 — Valeurs responsives dans les tokens
Une valeur qui change avec la largeur (espacement, taille de texte) est
redéfinie une fois dans le fichier de tokens, pas dans chaque composant.
Contrôle : [JUGEMENT]

## Tokens

### CSS-10 — Aucune couleur en dur
Pas de `#hex`, `rgb()`, `rgba()`, `hsl()` hors du fichier de tokens. Les règles
utilisent `var(--…)`.
Contrôle : [AUTO] Stylelint `scale-unlimited/declaration-strict-value`.
Exemple : `examples/css/tokens.*.css` et `panel.apres.css`.

### CSS-11 — Échelle d'espacement
Une échelle `--space-*` existe (valeurs dans le profil). `margin`, `padding` et
`gap` n'utilisent que ces tokens (et `0`, `auto`).
Contrôle : [AUTO] idem CSS-10.

### CSS-12 — Texte, rayons, ombres
Les tailles de texte, rayons de bordure et ombres viennent de tokens.
Contrôle : [AUTO] idem CSS-10.

### CSS-13 — Règle des trois occurrences
Une valeur répétée 3 fois ou plus devient un token.
Contrôle : [JUGEMENT]

### CSS-14 — Opacités figées
Les variantes d'opacité d'une couleur sont des tokens d'une échelle courte
définie dans le profil (`--<couleur>-<pourcentage>`). Une nouvelle opacité
demande un nouveau token, ajouté à l'échelle. Pas de `color-mix()` dans les
règles pour obtenir une opacité.
Contrôle : [AUTO] avec CSS-10.

## Nommage

### CSS-20 — kebab-case à préfixe de composant
Classes en kebab-case, préfixées par le composant : `.card`, `.card-title`.
Pas de BEM strict (`__`, `--`). Le nom dit le rôle, jamais l'apparence :
`.card-title`, pas `.big-red` ni `.left-column`.
Contrôle : [AUTO] `selector-class-pattern` pour le format ; [JUGEMENT] pour le
choix du préfixe et pour le rôle plutôt que l'apparence.

### CSS-21 — Classes d'état
Un état se note `is-…` ou `has-…` (`.is-open`, `.has-error`), posé par le JS
ou le serveur, jamais stylé seul.
Contrôle : [JUGEMENT]

### CSS-22 — Classes `js-` réservées au JS
Une classe préfixée `js-` sert à accrocher du comportement, et n'apparaît
jamais dans un sélecteur CSS.
Contrôle : [AUTO] `selector-class-pattern` interdit `js-`.

### CSS-23 — Pas d'identifiant pour le style
Aucun `#id` dans les sélecteurs.
Contrôle : [AUTO] `selector-max-id: 0`.

### CSS-24 — Deux niveaux de sélecteurs au plus
Exemple admis : `.nav-link.is-active`, `.card .card-title`. Une classe n'est pas
qualifiée par un élément : `.menu`, pas `ul.menu` (les sélecteurs d'attribut
comme `input[type="email"]` restent permis).
Contrôle : [AUTO] `selector-max-compound-selectors: 2` et
`selector-no-qualifying-type`.

### CSS-25 — `!important` justifié
Interdit sauf commentaire de désactivation Stylelint avec description :
`/* stylelint-disable-next-line declaration-no-important -- raison */`.
Contrôle : [AUTO] `declaration-no-important` + `reportDescriptionlessDisables`.

## Mise en forme

### CSS-30 — Forme du code
2 espaces, une propriété par ligne, aucune ligne vide dans une règle, une
ligne vide entre deux règles.
Contrôle : [AUTO] Prettier + `declaration-empty-line-before: never`.

### CSS-31 — Ordre des propriétés
Positionnement, boîte, typographie, apparence, animation (listes dans
`tooling/stylelint.config.mjs`).
Contrôle : [AUTO] `stylelint-order`.

### CSS-32 — Unités
`rem` pour le texte, `px` pour les bordures, `clamp()` pour le fluide.
Contrôle : [MIXTE] unités interdites en [AUTO] ; usage de `clamp()` en [JUGEMENT].

## Accessibilité

### CSS-40 — Focus visible
Pas de `outline: none` (ni `outline: 0`) sans remplaçant `:focus-visible`
équivalent. La dérogation est un commentaire de désactivation Stylelint avec
description, au même titre que CSS-25 :
`/* stylelint-disable-next-line declaration-property-value-disallowed-list -- raison */`.
Contrôle : [MIXTE] interdiction en [AUTO] ; qualité du remplaçant en [JUGEMENT].

### CSS-41 — Mouvement réduit
Tout mouvement décoratif (animation, transition de position, défilement
animé) est neutralisé par `@media (prefers-reduced-motion: reduce)`, placée
juste après la règle concernée (CSS-04). Une animation qui démarre seule et dure
plus de 5 secondes offre aussi un moyen de la mettre en pause (WCAG 2.2.2).
Contrôle : [JUGEMENT]

### CSS-42 — Contrastes
Texte normal à 4,5:1 au moins, grand texte à 3:1, éléments d'interface à 3:1.
Contrôle : [JUGEMENT], aidé d'un outil externe (axe, Lighthouse).

### CSS-43 — Cibles tactiles
Un élément cliquable ou tactile mesure au moins 24×24 px, espacement compris
(WCAG 2.5.8).
Contrôle : [JUGEMENT]

## Commentaires (en français)

### CSS-50 — En-tête de fichier
Au début de chaque fichier : nom du fichier, rôle, pages concernées.
```css
/* ============================================================
   components/card.css
   Rôle : carte de présentation (titre, texte, action).
   Pages concernées : accueil, liste des projets.
   ============================================================ */
```
Contrôle : [JUGEMENT] (la présence peut être vérifiée par un script).

### CSS-51 — En-tête de section
Format unique : titre en majuscules entre `── ──`, puis 2 à 3 lignes de
description (rôle, dépendances, pièges), `*/` sur sa propre ligne.
```css
/* ── BOUTONS ─────────────────────────────
   Bouton principal et variantes. Couleurs via les tokens d'accent.
   Les états désactivés sont gérés par .is-disabled (posé par le JS).
*/
```
Contrôle : [JUGEMENT]

### CSS-52 — Commentaire inline
Seulement pour une valeur non évidente, et il dit pourquoi, pas quoi. Un
commentaire en fin de ligne n'explique que la valeur de cette ligne.
Contrôle : [JUGEMENT]
Exemple : `examples/css/comments.*.css`.
