# Outils recommandés

| Fichier | Outil | Règles couvertes |
|---|---|---|
| `prettier.config.json` | Prettier | CSS-30, HTML-50, JS-31 (forme) |
| `stylelint.config.mjs` | Stylelint | CSS-05, 10 à 12, 14, 15, 20 à 25, 30 à 32, 40 |
| `htmlvalidate.json` | html-validate | HTML-12, 20, 30, 31, 40, 41 (et part de 01, 10, 11) |
| `check-html.mjs` | Node, sans dépendance | HTML-01, 10, 21, 22, 33 à 35, 43 (analyse par expressions régulières, pages complètes) |
| `eslint.config.mjs` | ESLint | JS-01, 10 à 13, 20, 30, 32 à 35 |
| `check-dead-code.mjs` | Node, sans dépendance | CSS-16 (classes CSS inutilisées) |
| `ci/verify.yml` | GitHub Actions | gabarit qui enchaîne tous les contrôles (non exécuté depuis le dépôt du skill) |
| `check-tools.mjs` | Node, sans dépendance | Détection des outils manquants |

Vérifier la présence des outils (`css`, `html` ou `js`) :

```
node check-tools.mjs <dossier-du-projet> --lang css
node check-tools.mjs <dossier-du-projet> --lang html
node check-tools.mjs <dossier-du-projet> --lang js
```

Code de sortie : 0 tout présent, 1 élément manquant, 2 langage non pris en
charge. Le script ne cherche que dans le projet (`package.json`,
`node_modules`) et ne vérifie pas le bon fonctionnement des outils.

Le fichier `htmlvalidate.json` se copie dans le projet sous le nom `.htmlvalidate.json`
(html-validate cherche la configuration à côté du fichier analysé, puis dans les
dossiers parents). Contrôle HTML :

```
npx html-validate "<dossier>/**/*.html"
node tooling/check-html.mjs <dossier>
node tooling/check-dead-code.mjs <dossier>   # classes CSS inutilisées
node --test                                    # tests unitaires JS-60 (Node 20 ou plus)
```

Installation (projet) :

```
npm i -D prettier stylelint stylelint-config-standard stylelint-order stylelint-declaration-strict-value html-validate eslint @eslint/js globals
```

Adaptations par projet (JS) : ESLint n'impose pas de raison aux commentaires `eslint-disable` (JS-13) ; elle se vérifie à la relecture.

Adaptations par projet (CSS) :
- `overrides[0].files` : nom du fichier de tokens, seul endroit où les valeurs brutes sont permises.
- `media-feature-name-disallowed-list` : remplacer `min-width` par `max-width` si le profil choisit « mobile d'abord ».
- Les échelles (CSS-11, CSS-14) viennent du profil ; l'outil impose l'usage de `var(--…)`, pas les valeurs.

Les outils sont vérifiés par `check-tools.mjs`. Configuration vérifiée sur les paires de `examples/css/` : tous les `*.apres.css` passent,
les `*.avant.css` des règles automatisables échouent (`comments.avant.css` et `media-query.avant.css` illustrent des règles de jugement et passent les outils). Les `*.apres.html` passent html-validate, Prettier et `check-html.mjs`, les
`*.avant.html` échouent. Les `*.apres.js` passent ESLint et Prettier, les `*.avant.js` des règles automatisables échouent (`comments.avant.js` illustre une règle de jugement). Non couvert par les outils : CSS-02 à 04, 06, 13, 41 à 43, 50 à 53, HTML-02, 32, 42, 60, 61 et une partie de HTML-11, 30, 40, 41 ; JS-02, 03, 14, 21 à 23, 40, 50 à 54, 60 et une partie de JS-01, 12, 13, 20, 30.
