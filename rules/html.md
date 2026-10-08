# Règles HTML

Les choix propres au projet (format du `<title>`, noms de dossiers) sont dans
`docs/conventions-profile.md`. Les règles CSS sont dans `rules/css.md`.

Contrôle : **[AUTO]** outil de `tooling/`, **[MIXTE]** outil partiel,
**[JUGEMENT]** relecture. Les exemples sont dans `examples/html/` : chaque
fichier `*.apres.html` est une page complète conforme.

## Document

### HTML-01 — Squelette
Chaque page commence par `<!doctype html>`, puis `<html lang="…">`. Dans
`<head>`, `<meta charset="utf-8" />` est le premier élément, suivi du viewport
et d'un `<title>` non vide. Chaque page a un `<meta name="description">`.
Contrôle : [MIXTE] doctype, `lang` et titre par html-validate ; charset en
premier et description par `check-html.mjs`.
Exemple : `examples/html/page.avant.html` → `page.apres.html`.

### HTML-02 — Titre de page
Un `<title>` distinct par page, au format défini dans le profil du projet
(exemple : `Page — Site`).
Contrôle : [JUGEMENT]

## Structure

### HTML-10 — Repères de page
Chaque page a `<header>`, un seul `<main>` et `<footer>`, plus `<nav>` quand
elle contient une navigation. Plusieurs repères du même type reçoivent un
`aria-label` distinct.
Contrôle : [MIXTE] `no-multiple-main` et `unique-landmark` par html-validate ;
présence de `<main>`, `<header>` et `<footer>` par `check-html.mjs`.

### HTML-11 — Sémantique d'abord
`<section>` seulement avec un titre, `<ul>` pour une liste, `<button>` pour une
action, `<a>` pour une navigation. `<div>` et `<span>` en dernier recours.
Contrôle : [MIXTE] `prefer-button` et `prefer-native-element` ; le reste en
[JUGEMENT].

### HTML-12 — Titres
Un seul `<h1>` par page, aucun saut de niveau (pas de `<h3>` directement sous
un `<h1>`).
Contrôle : [AUTO] html-validate `heading-level`.
Exemple : `examples/html/accessibility.*.html`.

## Séparation des rôles

### HTML-20 — Aucun CSS dans le HTML
Voir CSS-01 : pas de `<style>` ni de `style=""`.
Contrôle : [AUTO] html-validate `no-style-tag` et `no-inline-style`.

### HTML-21 — Aucun gestionnaire d'événement inline
Pas d'attribut `onclick=`, `onmouseover=`… Les événements sont branchés dans un
fichier JS avec `addEventListener`.
Contrôle : [MIXTE] `check-html.mjs` (html-validate n'a pas de règle pour cela).
Exemple : `examples/html/scripts.*.html`.

### HTML-22 — Scripts
Pas de `<script>` avec logique inline. Exception : des données
(`type="application/json"`, `ld+json`, `importmap`). Les scripts externes sont
dans `<head>` avec `defer` (ou `type="module"`).
Contrôle : [MIXTE] `check-html.mjs`.
Exemple : `examples/html/scripts.*.html`.

## Attributs et syntaxe

### HTML-30 — Identifiants
Les `id` sont uniques et en kebab-case. Ils servent aux ancres, aux attributs
`for` et à ARIA. Jamais pour le style (CSS-23), jamais comme accroche JS : le
JS utilise une classe `js-` (CSS-22).
Contrôle : [MIXTE] `no-dup-id` et `id-pattern` ; l'usage est en [JUGEMENT].

### HTML-31 — Syntaxe
Balises et attributs en minuscules, guillemets doubles, `<!doctype html>` en
minuscules, éléments vides avec barre (`<meta … />`, `<br />`), attributs
booléens sans valeur (`defer`, `disabled`). C'est la forme produite par
Prettier : le formateur et le validateur sont réglés sur la même.
Contrôle : [AUTO] html-validate (`element-case`, `attr-case`, `attr-quotes`,
`void-style`, `doctype-style`, `attribute-boolean-style`) et Prettier.

### HTML-32 — Données pour le JS
Les données destinées au JS passent par des attributs `data-*` en kebab-case,
ou par un bloc JSON (HTML-22).
Contrôle : [JUGEMENT]

## Contenu et accessibilité

### HTML-40 — Images
Toute image a un `alt` (`alt=""` si elle est décorative). Un SVG décoratif
porte `aria-hidden="true"`.
Contrôle : [MIXTE] html-validate `wcag/h37` pour `alt` ; SVG en [JUGEMENT].

### HTML-41 — Libellés et liens
Chaque champ de formulaire a un `<label>`. Un lien a un texte explicite, pas
« cliquez ici ».
Contrôle : [MIXTE] `input-missing-label` et `wcag/h30` ; qualité du texte en
[JUGEMENT].

### HTML-42 — Langue
Un passage dans une autre langue que celle de la page porte `lang`.
Contrôle : [JUGEMENT]
Exemple : `examples/html/accessibility.*.html`.

### HTML-43 — Pas de `<br>` de mise en page
Un `<br>` ne sert pas à couper un titre ou un paragraphe visuellement : cela se
règle en CSS (`text-wrap: balance`, largeur maximale). Il reste permis quand le
saut fait partie du contenu (adresse, poème).
Contrôle : [JUGEMENT], avec avertissement de `check-html.mjs`.

## Forme et commentaires

### HTML-50 — Formatage
Prettier : 2 espaces, `<head>` indenté. Le premier passage sur un projet
existant se fait dans un commit de reformatage isolé.
Contrôle : [AUTO] Prettier.

### HTML-60 — Commentaire de section
Une ligne, en français : `<!-- ── NOM ── -->`. Pas d'en-tête de fichier (le
doctype vient en premier).
Contrôle : [JUGEMENT]

### HTML-61 — Pas de code commenté
Du balisage mis en commentaire n'est pas laissé dans le fichier.
Contrôle : [JUGEMENT]
