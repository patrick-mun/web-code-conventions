# Profil de conventions du projet

À copier vers `docs/conventions-profile.md` et à remplir. Le skill
`web-code-conventions` lit ce fichier en premier ; il contient les choix du
projet, jamais l'inverse.

## Version du skill

`web-code-conventions` : `v1.0` (tag épinglé)

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
