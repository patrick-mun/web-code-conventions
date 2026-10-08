---
name: web-code-conventions
description: "Conventions de mise en forme du code source web (CSS, HTML, JS) : organisation, nommage, commentaires. À utiliser avant d'écrire, de modifier ou de relire du CSS, du HTML ou du JavaScript, et avant chaque commit."
---

# Conventions de code web

Ce skill dit COMMENT organiser, nommer et commenter le code. Il ne contient
aucune valeur propre à un projet (couleurs, polices, points de rupture).

## 1. Lire le profil du projet

Chercher `docs/conventions-profile.md`. S'il existe, il donne : la version du
skill, le fichier des tokens, l'organisation des dossiers, et les dérogations
par identifiant de règle. S'il manque, proposer de le créer depuis
`profile/PROFILE.template.md`.

Une dérogation listée dans le profil l'emporte sur la règle du skill. Une
règle absente du tableau s'applique telle quelle.

## 2. Principes communs

1. Une règle précise et vérifiable vaut mieux qu'un principe vague.
2. Séparation des rôles : le HTML structure, le CSS présente, le JS comporte.
3. Les valeurs de conception vivent dans les tokens du projet, jamais dans les règles.
4. Commentaires en français, orientés « pourquoi » et non « quoi ».
5. Noms de variables et de fonctions en anglais (JS).
6. Modifier le code existant dans le style du fichier, sans refonte hors sujet :
   signaler l'écart à la personne, ne pas le corriger en bloc dans le même commit.

## 3. Charger la règle du langage touché (seulement celle-là)

| Langage | Fichier | État |
|---|---|---|
| CSS | `rules/css.md` | disponible |
| HTML | `rules/html.md` | à venir |
| JS | `rules/js.md` | à venir |

Chaque règle porte un identifiant stable (`CSS-10`) et un mode de contrôle :
**[AUTO]** contrôlée par un outil de `tooling/`, **[MIXTE]** partiellement
outillée, **[JUGEMENT]** relue par une personne ou par Claude.

## 4. Checklist avant commit

- [ ] Les outils tournent sans erreur quand ils sont installés (Prettier, Stylelint, ESLint, html-validate).
- [ ] Aucune valeur de conception en dur : tout passe par un token.
- [ ] Aucun CSS dans le HTML, aucun JS inline.
- [ ] Les nouveaux fichiers ont leur en-tête ; les nouvelles sections ont leur commentaire.
- [ ] Les règles [JUGEMENT] touchées ont été relues : nommage, qualité des commentaires.
- [ ] Toute dérogation est inscrite dans le profil avec sa raison.

## 5. Quand une règle gêne

Ne pas la contourner en silence. Proposer la dérogation, l'inscrire dans le
profil avec sa raison, puis continuer.
