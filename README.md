# Tampermonkey Universal AI Prompt Commands FR

**Tampermonkey Universal AI Prompt Commands FR** est un userscript pour l’extension de navigateur **Tampermonkey**. Il aide à travailler plus vite avec les chats d’intelligence artificielle comme ChatGPT, Gemini, Claude, Copilot et d’autres services avec un champ de saisie.

Le script remplace des commandes courtes comme `F1`, `F3` ou `F10` par des invites IA longues et déjà préparées. Ainsi, il n’est pas nécessaire de réécrire chaque fois les mêmes demandes.

---

## À quoi sert ce script

Ce script sert à saisir rapidement des prompts prêts à l’emploi pour la traduction, le résumé, l’analyse de lettres, l’extraction de faits, la préparation de réponses officielles et la rédaction de textes.

---

## Fonctionnement

Le script surveille les champs de saisie. Si le champ contient exactement une commande connue, par exemple:

```text
F1
```

la commande est automatiquement remplacée par une invite IA complète.

Le texte ordinaire n’est pas modifié. La commande doit être saisie seule, sans autre texte.

---

## Exemples

`F1` — traduction précise du texte en français.

`F3` — résumé thématique très court d’une lettre en une seule ligne.

`F8` — extraction des faits importants: dates, montants, personnes, organisations, documents et exigences.

`F10` — rédaction d’une lettre officielle en allemand simple, niveau A2-B1.

---

## Où l’utiliser

Le script est prévu principalement pour les chats IA:

- ChatGPT;
- Google Gemini;
- Claude;
- Microsoft Copilot;
- autres sites avec un champ de texte.

Dans le script, la règle suivante est utilisée:

```javascript
// @match        *://*/*
```

Cela permet au script de fonctionner sur différents sites. Il remplace uniquement les commandes exactes.

---

## Avant l’installation

Avant d’installer ce script, l’extension **Tampermonkey** doit être installée dans le navigateur.

Tampermonkey permet d’installer et d’exécuter des fichiers userscript `.user.js`.

---

## Installation rapide avec le lien Raw

1. Installez Tampermonkey dans le navigateur.
2. Ouvrez ce lien Raw:

```text
https://raw.githubusercontent.com/1777maxim7771/fr_tampermonkey-universal-ai-prompt-commands/main/tampermonkey-universal-ai-prompt-commands.user.js
```

3. Tampermonkey doit ouvrir la fenêtre d’installation.
4. Cliquez sur **Install / Installer**.
5. Ouvrez un chat IA et tapez `F1` pour tester.

---

## Installation depuis GitHub

1. Ouvrez ce dépôt GitHub.
2. Ouvrez le fichier:

```text
tampermonkey-universal-ai-prompt-commands.user.js
```

3. Cliquez sur **Raw**.
4. Confirmez l’installation dans Tampermonkey.

---

## Import par URL dans Tampermonkey

Si la fenêtre d’installation ne s’ouvre pas automatiquement:

1. Ouvrez Tampermonkey.
2. Allez dans **Dashboard / Tableau de bord**.
3. Ouvrez **Utilities / Utilitaires**.
4. Utilisez **Import from URL**.
5. Collez le lien Raw du script.

---

## Installation manuelle

1. Ouvrez Tampermonkey.
2. Cliquez sur **Create a new script**.
3. Supprimez le modèle standard.
4. Copiez tout le contenu du fichier `.user.js`.
5. Collez-le dans l’éditeur Tampermonkey.
6. Enregistrez avec **Ctrl + S**.

---

## Pourquoi Tampermonkey reconnaît ce script

Tampermonkey reconnaît le fichier grâce à l’en-tête spécial:

```javascript
// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands FR
// @match        *://*/*
// ==/UserScript==
```

et grâce à l’extension:

```text
.user.js
```

Le script ne s’installe pas dans GitHub ni dans un site précis. Il s’installe dans l’extension **Tampermonkey**. GitHub sert seulement à stocker le fichier.

---

## Commandes

- `F1` — traduction précise en français.
- `F2` — résumé du texte en français.
- `F3` — résumé thématique d’une lettre en une ligne.
- `F4` — traduction en allemand simple A2-B1.
- `F5` — correction d’un texte français.
- `F6` — réponse officielle courte.
- `F7` — explication simple du texte.
- `F8` — extraction des faits importants.
- `F9` — liste des actions nécessaires.
- `F10` — lettre officielle en allemand.

---

## Vérification

Après l’installation, ouvrez un champ de saisie et tapez:

```text
F1
```

Si la commande est remplacée par un prompt complet, le script fonctionne correctement.

---

## Problèmes possibles

Si la commande ne se remplace pas, vérifiez que Tampermonkey est activé, que le script est activé, que la page a été actualisée et que la commande est saisie seule.

---

## Fichier du script

```text
tampermonkey-universal-ai-prompt-commands.user.js
```

---

## Objectif du projet

Le projet accélère le travail répétitif avec les chats IA en remplaçant des commandes courtes par des prompts complets et prêts à l’emploi.