# Profil de conventions du projet

À copier vers `docs/conventions-profile.md` et à remplir. Le skill
`web-code-conventions` lit ce fichier en premier ; il contient les choix du
projet, jamais l'inverse.

## Version du skill

`web-code-conventions` : `v1.0` (tag épinglé)

## Outils

Commande de contrôle lancée avant chaque commit : `npm run lint` (par exemple Stylelint pour le CSS, html-validate et `check-html.mjs` pour le HTML)

Versions testées avec la configuration du skill `v1.0` (à ajuster si le projet
en épingle d'autres) :

| Outil | Version |
|---|---|
| Node | 22 |
| prettier | 3.9 |
| html-validate | 11.16 |
| eslint | 10.12 |
| @eslint/js | 10.0 |
| globals | 17.13 |
| stylelint | 17.16 |
| stylelint-config-standard | 40.0 |
| stylelint-order | 8.1 |
| stylelint-declaration-strict-value | 1.12 |

## Organisation du JS (JS-02)

Dossier du point d'entrée par page et dossier des modules partagés :

| Rôle | Chemin |
|---|---|
| Point d'entrée par page | `assets/js/pages/` |
| Modules partagés | `assets/js/lib/` |

## Titre de page (HTML-02)

Format du `<title>` : `Page — Site`

## Fichier de tokens

Chemin du fichier qui documente les valeurs de conception du projet
(couleurs, polices, échelle d'espacement…) : `docs/design-tokens.md`

## Organisation des fichiers (CSS-02)

Noms des dossiers choisis par le projet. Valeurs par défaut proposées :

| Rôle | Chemin |
|---|---|
| Tokens (valeurs uniquement) | `assets/css/tokens.css` |
| Base (reset, base, layout, utilitaires) | `assets/css/base.css` |
| Composants (un fichier par composant) | `assets/css/components/` |
| Pages (un fichier par page) | `assets/css/pages/` |

## Sens des media queries (CSS-05)

`max-width` (par défaut) ou `min-width` (mobile d'abord) : un seul par projet.

Points de rupture : `…` (largeurs, choisies d'après le contenu).

## Échelle d'espacement (CSS-11)

Valeurs par défaut proposées : 4, 8, 12, 16, 24, 32, 48, 72 px, exposées en
`--space-1` … `--space-8`.

## Échelle d'opacité (CSS-14)

Valeurs par défaut proposées : 10, 20, 40, 60, 80 %, exposées en
`--<couleur>-<pourcentage>` (exemple : `--white-60`).

## Dérogations

| Règle | Choix du projet | Raison |
|---|---|---|
| (aucune) | | |
