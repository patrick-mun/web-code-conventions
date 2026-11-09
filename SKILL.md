---
name: web-code-conventions
description: "Conventions de mise en forme du code source web (CSS, HTML, JS) : organisation, nommage, commentaires. À utiliser avant d'écrire, de modifier, de relire ou d'auditer du CSS, du HTML ou du JavaScript, et avant chaque commit."
---

# Conventions de code web

Ce skill dit COMMENT organiser, nommer et commenter le code. Il ne contient
aucune valeur propre à un projet (couleurs, polices, points de rupture).

Trois usages : **écrire ou modifier** du code (sections 1 à 5), **auditer** un
code existant (section 6), **déroger** à une règle (section 7).

## 1. Lire le profil du projet

Chercher `docs/conventions-profile.md`. S'il existe, il donne : la version du
skill, la commande de contrôle, le fichier des tokens, l'organisation des
dossiers, et les dérogations par identifiant de règle. S'il manque, proposer
de le créer depuis `profile/PROFILE.template.md`.

Une dérogation listée dans le profil l'emporte sur la règle du skill. Une
règle absente du tableau s'applique telle quelle. Si la version épinglée par
le profil diffère de celle du skill (voir `CHANGELOG.md`), le dire : des
règles ont pu être ajoutées, et le code existant peut y déroger sans que ce
soit une erreur de la personne.

## 2. Vérifier l'outillage (avant d'écrire du code)

Lancer `node tooling/check-tools.mjs <dossier-du-projet> --lang <langage>`
(le chemin est relatif au dossier du skill ; langages : `css`, `html`, `js`).
Il liste ce qui est présent ou absent (Node, `package.json`, paquets, fichiers
de configuration) et sort avec le code 1 s'il manque quelque chose.

- **Outil absent** : proposer l'installation et la copie de la configuration de
  `tooling/`, sans rien installer sans l'accord de la personne. Proposer aussi
  le hook pré-commit et le gabarit CI `tooling/ci/verify.yml` s'ils manquent.
- **Installation impossible** (pas de Node, pas de réseau) : continuer, mais dire
  clairement que les règles [AUTO] n'ont pas été contrôlées, et les appliquer en
  relecture manuelle. Ne jamais laisser croire que le lint est passé.
- **Tout est présent** : lancer la commande de contrôle du profil avant le commit.

Le script vérifie la présence des outils, pas leur bon fonctionnement. Un outil
installé hors du projet n'est pas vu : le signaler plutôt que conclure à tort.
Si le projet embarque des copies des contrôles du skill (`check-html.mjs`,
`check-css.mjs`, `check-dead-code.mjs`), les mettre à jour depuis le skill, sans
les modifier sur place. `check-html.mjs` (HTML-40, SVG) et `check-css.mjs`
(CSS-41, mouvement réduit) ne donnent que des avertissements : ils se lisent,
ils ne font pas échouer le lint.

## 3. Principes communs

1. Une règle précise et vérifiable vaut mieux qu'un principe vague.
2. Séparation des rôles : le HTML structure, le CSS présente, le JS comporte.
3. Les valeurs de conception vivent dans les tokens du projet, jamais dans les règles.
4. Commentaires en français, orientés « pourquoi » et non « quoi ».
5. Noms de variables et de fonctions en anglais (JS).
6. Supprimer plutôt que commenter ou garder : pas de code mort, pas de code commenté.
7. Séparer la logique pure du DOM pour pouvoir la tester ; tout bug corrigé reçoit un test.
8. Modifier le code existant dans le style du fichier, sans refonte hors sujet :
   signaler l'écart à la personne, ne pas le corriger en bloc dans le même commit.
9. Un lint vert ne prouve pas la conformité : il ne voit que les règles [AUTO] et
   une partie des [MIXTE]. Les [JUGEMENT] se relisent (section 5).

## 4. Charger la règle du langage touché (seulement celle-là)

`rules/css.md`, `rules/html.md`, `rules/js.md`. Un fichier HTML qui contient du
CSS ou du JS inline charge aussi la règle du langage concerné.

Chaque règle porte un identifiant stable (`CSS-10`) et un mode de contrôle :
**[AUTO]** contrôlée par un outil de `tooling/`, **[MIXTE]** partiellement
outillée, **[JUGEMENT]** relue par une personne ou par Claude.

## 5. Checklist avant commit

Outillé :

- [ ] La commande de contrôle du profil passe (Prettier, Stylelint, ESLint, html-validate, tests).
- [ ] Aucune classe CSS, variable ou fonction inutilisée (`tooling/check-dead-code.mjs`, ESLint).
- [ ] Les fonctions pures ajoutées ou modifiées ont un test (`node --test`).
- [ ] Les avertissements de `check-css.mjs` (CSS-41) et de `check-html.mjs` (HTML-40) ont été lus et traités, ou justifiés.

Relecture, car les outils ne la voient pas (écarts les plus souvent oubliés) :

- [ ] Aucune valeur de conception en dur, y compris dans `border`, `width`, `top`, les media queries (CSS-13) : tout passe par un token.
- [ ] Chaque `@media` est juste après la règle qu'il modifie (CSS-04) ; chaque section a son en-tête `── ──` (CSS-51, HTML-60, JS).
- [ ] Toute animation ou transition CSS a sa neutralisation `prefers-reduced-motion` juste après la règle (CSS-41, l'outil ne contrôle que le fichier) ; tout effet JS décoratif consulte le mouvement réduit (JS-40).
- [ ] Chaque svg est soit `aria-hidden="true"` (décoratif), soit `role="img"` avec un libellé (HTML-40). Trancher au cas par cas.
- [ ] Aucun CSS ni JS inline dans le HTML.
- [ ] Les nouveaux fichiers ont leur en-tête ; tout export a sa JSDoc (JS-52).
- [ ] Nommage et qualité des commentaires (« pourquoi », pas « quoi »).
- [ ] Si le profil prévoit un contrôle visuel pour le HTML/CSS, il a été lancé et chaque différence est voulue.
- [ ] Toute dérogation est inscrite dans le profil avec sa raison.

Dans le compte rendu, dire ce qui a été contrôlé par outil, ce qui l'a été à la
relecture, et ce qui n'a pas pu l'être.

## 6. Auditer un code existant

Sur demande d'audit ou de mise en conformité :

1. Lancer les outils d'abord (avertissements de `check-css.mjs` et `check-html.mjs`
   compris) : ils donnent les écarts [AUTO] et une partie des [MIXTE] sans effort.
2. Relire à la main les règles [MIXTE] et [JUGEMENT] qui échappent aux outils
   (liste de la section 5). Pour chaque fichier, indiquer s'il a été lu en entier
   ou seulement par recherche ciblée : ne jamais présenter une recherche comme une lecture complète.
3. Rendre un tableau par langage : fichier, identifiant de règle, écart, lignes.
   Marquer « à trancher » les cas ambigus (par exemple svg décoratif ou porteur de sens).
4. Proposer un plan en lots, **une PR par lot**, du moins risqué au plus long
   (HTML sans impact visuel, mouvement réduit, CSS des pages, JS et tests).
   Ne rien corriger pendant l'audit sans l'accord de la personne.

## 7. Quand une règle gêne

Ne pas la contourner en silence. Proposer la dérogation, l'inscrire dans le
profil avec sa raison, puis continuer. Si une même règle est dérogée dans
plusieurs projets, le signaler : la règle est peut-être à reformuler dans le skill.
