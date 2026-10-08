# Profil de conventions du projet (exemple fictif : « Atelier Exemple »)

## Version du skill

`web-code-conventions` : `v1.0`

## Organisation du JS (JS-02)

| Rôle | Chemin |
|---|---|
| Point d'entrée par page | `static/js/views/` |
| Modules partagés | `static/js/shared/` |

## Titre de page (HTML-02)

Format du `<title>` : `Nom de la page | Atelier Exemple`

## Fichier de tokens

`docs/design-tokens.md`

## Organisation des fichiers (CSS-02)

| Rôle | Chemin |
|---|---|
| Tokens | `static/css/tokens.css` |
| Base | `static/css/base.css` |
| Composants | `static/css/blocks/` |
| Pages | `static/css/views/` |

## Sens des media queries (CSS-05)

`min-width` (mobile d'abord). Points de rupture : 640 px, 1024 px.

## Échelle d'espacement (CSS-11)

4, 8, 16, 24, 40, 64 px (`--space-1` … `--space-6`).

## Échelle d'opacité (CSS-14)

15, 30, 50, 75 % (`--ink-15` … `--ink-75`, `--paper-15` … `--paper-75`).

## Dérogations

| Règle | Choix du projet | Raison |
|---|---|---|
| CSS-24 | 3 niveaux de sélecteurs au lieu de 2 | composant imbriqué fourni par le CMS |
