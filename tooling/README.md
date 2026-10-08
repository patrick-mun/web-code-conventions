# Outils recommandés

| Fichier | Outil | Règles couvertes |
|---|---|---|
| `prettier.config.json` | Prettier | CSS-30 (forme) |
| `stylelint.config.mjs` | Stylelint | CSS-05, 10 à 12, 14, 20 à 25, 30 à 32, 40 |

Installation (projet) :

```
npm i -D prettier stylelint stylelint-config-standard stylelint-order stylelint-declaration-strict-value
```

Adaptations par projet :
- `overrides[0].files` : nom du fichier de tokens, seul endroit où les valeurs brutes sont permises.
- `media-feature-name-disallowed-list` : remplacer `min-width` par `max-width` si le profil choisit « mobile d'abord ».
- Les échelles (CSS-11, CSS-14) viennent du profil ; l'outil impose l'usage de `var(--…)`, pas les valeurs.

Vérifié sur les paires de `examples/css/` : tous les `*.apres.css` passent,
les `*.avant.css` échouent. Non couvert par les outils : CSS-01 (html-validate,
config à venir avec HTML), CSS-02 à 04, 06, 13, 41, 42, 50 à 52.
