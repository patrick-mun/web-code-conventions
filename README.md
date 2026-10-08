# web-code-conventions

Skill Claude Code de conventions de mise en forme du code source web
(organisation, nommage, commentaires), réutilisable sur tous les projets.

Le skill est **générique** : il ne contient aucune valeur propre à un projet.
Chaque projet garde son propre fichier de choix (`docs/conventions-profile.md`)
que le skill lit en premier.

## Contenu

| Chemin | Rôle |
|---|---|
| `SKILL.md` | Point d'entrée : principes communs, checklist avant commit |
| `rules/css.md`, `html.md`, `js.md` | Une règle par ligne, identifiant stable, mode de contrôle |
| `examples/` | Paires avant/après neutres, tirées d'aucun projet |
| `profile/` | Modèle et exemple de profil de projet |
| `tooling/` | Configurations recommandées (Prettier, Stylelint…) |

État : CSS disponible ; HTML et JS à venir (un langage après l'autre).

## Installation

Cloner le dépôt dans le dossier des skills, au niveau utilisateur ou projet :

```
git clone https://github.com/patrick-mun/web-code-conventions ~/.claude/skills/web-code-conventions
# ou, pour un seul projet :
git clone https://github.com/patrick-mun/web-code-conventions .claude/skills/web-code-conventions
```

Puis, dans le projet, copier `profile/PROFILE.template.md` vers
`docs/conventions-profile.md` et le remplir.

## Surcharger une règle sans modifier le skill

Ajouter une ligne au tableau « Dérogations » du profil : identifiant de la
règle, choix du projet, raison. Le skill ne change jamais pour un projet.

## Versionnement

Un tag par version (`v1.0`…), noté dans `CHANGELOG.md`. Le profil d'un projet
épingle la version utilisée. Règle supprimée ou de sens changé : version
majeure. Règle ajoutée : version mineure. Les identifiants ne sont jamais
réutilisés.

## Contrôles

Le dossier `tooling/` fournit des configurations de départ. Elles couvrent ce
qui s'automatise ; le reste (qualité des commentaires, choix des noms) relève
du jugement et figure en [JUGEMENT] dans les règles.
