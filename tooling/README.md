# Outils recommandés

| Fichier | Outil | Règles couvertes |
|---|---|---|
| `prettier.config.json` | Prettier | CSS-30 (forme) |
| `stylelint.config.mjs` | Stylelint | CSS-05, 10 à 12, 14, 20 à 25, 30 à 32, 40 |
| `check-tools.mjs` | Node, sans dépendance | Détection des outils manquants |

Vérifier la présence des outils (CSS seulement pour l'instant) :

```
node check-tools.mjs <dossier-du-projet> --lang css
```

Code de sortie : 0 tout présent, 1 élément manquant, 2 langage non pris en
charge. Le script ne cherche que dans le projet (`package.json`,
`node_modules`) et ne vérifie pas le bon fonctionnement des outils.

Installation (projet) :

```
npm i -D prettier stylelint stylelint-config-standard stylelint-order stylelint-declaration-strict-value
```

Adaptations par projet :
- `overrides[0].files` : nom du fichier de tokens, seul endroit où les valeurs brutes sont permises.
- `media-feature-name-disallowed-list` : remplacer `min-width` par `max-width` si le profil choisit « mobile d'abord ».
- Les échelles (CSS-11, CSS-14) viennent du profil ; l'outil impose l'usage de `var(--…)`, pas les valeurs.

Les outils sont vérifiés par `check-tools.mjs`. Configuration vérifiée sur les paires de `examples/css/` : tous les `*.apres.css` passent,
les `*.avant.css` échouent. Non couvert par les outils : CSS-01 (html-validate,
config à venir avec HTML), CSS-02 à 04, 06, 13, 41, 42, 50 à 52.
