# Tampermonkey Universal AI Prompt Commands FR

Version française d’un script Tampermonkey pour travailler plus vite avec les chats d’intelligence artificielle.

Le script remplace les déclencheurs universels `Q1–Q10` par des invites IA préparées. Ces déclencheurs ne sont pas liés à une langue : l’utilisateur peut remplacer `Q1`, `Q2` et les autres par ses propres mots, commandes ou phrases.

## À quoi sert le script

Il permet d’insérer rapidement des prompts dans ChatGPT, Gemini, Claude, Copilot et d’autres chats IA. Au lieu d’écrire une longue instruction à chaque fois, il suffit de taper `Q1`, et le script insère le prompt complet.

## Fonctionnement

Le script surveille le champ de saisie actif. Si tout le contenu du champ correspond exactement à l’un des déclencheurs `Q1–Q10`, ce contenu est remplacé par le prompt préparé.

```text
Q1
```

remplace le texte par un prompt de traduction en français.

```text
Q8
```

remplace le texte par un prompt d’extraction des faits importants.

Un texte normal n’est pas modifié. Par exemple `Q1 autre texte` ne sera pas remplacé.

## Déclencheurs personnalisés

Les déclencheurs peuvent être changés dans le code, dans l’objet `COMMANDS`.

```javascript
'Q1': `...`
```

peut devenir :

```javascript
'TRADUIRE': `...`
```

`Q1–Q10` sont seulement les déclencheurs universels par défaut.

## Où l’utiliser

- ChatGPT
- Google Gemini
- Claude
- Microsoft Copilot
- autres sites avec un champ de texte

Le script contient :

```javascript
// @match        *://*/*
```

## Condition avant installation

L’extension **Tampermonkey** doit être installée dans le navigateur. Le script s’installe dans Tampermonkey, pas dans GitHub ni dans un site précis. GitHub sert seulement à stocker le fichier `.user.js`.

## Installation rapide

1. Installez Tampermonkey.
2. Ouvrez le lien Raw :

```text
https://raw.githubusercontent.com/1777maxim7771/fr_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Confirmez l’installation dans Tampermonkey.
4. Ouvrez un chat IA et tapez `Q1`.

## Installation via GitHub

Ouvrez le fichier `tampermonkey-universal-ai-prompt-commands.user.js`, cliquez sur **Raw**, puis confirmez l’installation dans Tampermonkey.

## Import par URL

Dans Tampermonkey, ouvrez **Dashboard → Utilities → Import from URL**, collez le lien Raw et confirmez.

## Installation manuelle

Créez un nouveau script dans Tampermonkey, collez le code du fichier `.user.js` et enregistrez.

## Pourquoi Tampermonkey reconnaît le script

Tampermonkey reconnaît l’en-tête `// ==UserScript==` et l’extension `.user.js`.

## Commandes par défaut

- `Q1` — traduction en français.
- `Q2` — résumé du texte.
- `Q3` — résumé d’une lettre en une ligne.
- `Q4` — traduction en allemand simple A2-B1.
- `Q5` — correction d’un texte français.
- `Q6` — réponse officielle courte.
- `Q7` — explication simple du texte.
- `Q8` — extraction des faits importants.
- `Q9` — liste des actions nécessaires.
- `Q10` — lettre officielle en allemand.

## Vérification

Tapez `Q1` dans un chat IA. Si le script fonctionne, `Q1` sera remplacé par le prompt complet.

## Problèmes possibles

Vérifiez que le script est activé, que la page a été rechargée, que `Q1` est tapé sans texte supplémentaire, que Tampermonkey est autorisé sur le site et que le curseur est dans un champ éditable.

## Objectif du projet

Accélérer le travail répétitif avec les chats IA : traduction, résumé, analyse de lettres, réponses officielles et traitement de documents.
