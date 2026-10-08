# Journal des versions

## Non publié

- Structure du skill, `SKILL.md`, mécanisme de profil.
- Règles CSS (`rules/css.md`), exemples et configuration Stylelint/Prettier.
- Étape « vérifier l'outillage » (`tooling/check-tools.mjs`, CSS seulement) et section « Outils » du profil.
- Règles HTML (`rules/html.md`), exemples, `htmlvalidate.json`, `check-html.mjs`.
- Règles JS (`rules/js.md`), exemples, `eslint.config.mjs`, `check-tools.mjs --lang js`.
- Maintenabilité : CSS-15 (jetons nommés par rang ou rôle), CSS-16 (pas de classe sans usage, `check-dead-code.mjs`),
  CSS-53 et JS-54 (pas de code commenté), JS-03 (logique pure séparée du DOM), JS-34 (taille de fichier),
  JS-35 (pas de code mort), JS-60 (tests avec `node --test`), gabarit CI `tooling/ci/verify.yml`.
- Relecture d'ensemble et comparaison aux guides de Google, d'Airbnb, de `stylelint-config-standard` et à WCAG 2.2 :
  CSS-20 (rôle plutôt qu'apparence), CSS-24 (pas de sélecteur qualifié), CSS-43 (cibles tactiles),
  HTML-10 (lien d'évitement), HTML-33 à 35 (HTTPS, `type` inutile, entités), JS-01 (exports nommés,
  extension `.js`), JS-30 (une variable par déclaration), pause des animations de plus de 5 s
  (CSS-41, JS-40), commentaires en fin de ligne (CSS-52, JS-53).
- Test sur un site réel (Genome Réunion) : configuration Stylelint corrigée — les couleurs dans les raccourcis
  (`border`, `background`) sont désormais refusées par une règle dédiée, `border`/`background`/`outline` ne passent
  plus par `strict-value` (faux positifs sur `1px solid var(--x)`), et le préfixe `-webkit-backdrop-filter` est conservé.
- Précisions : JS-12 (travail coûteux seulement), JS-33 (`catch` commenté), HTML-22 et JS-01 alignés.
