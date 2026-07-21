// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands FR
// @namespace    local.tampermonkey.universal.ai.prompt.commands.fr
// @version      1.0.0
// @description  Remplace les commandes courtes F1-F10 par des invites IA prêtes à l’emploi dans les chats IA.
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // Version française. Le script remplace uniquement une commande exacte par une invite IA complète.
    const COMMANDS = {
        'F1': `Traduis le texte fourni en français de manière complète et précise. Conserve le sens, l’ordre des informations, les noms, les dates, les montants, les numéros de documents, les organisations et les formulations importantes. N’ajoute pas de conclusions personnelles et ne raccourcis pas le contenu.`,
        'F2': `Résume le texte fourni en français selon le sens et le contexte. Explique de quoi il s’agit, qui écrit à qui, quel est le sujet principal, quelles demandes, décisions, dates, délais, montants ou détails importants sont mentionnés. Écris de façon claire et structurée.`,
        'F3': `Crée en français un résumé thématique très court de cette lettre, strictement en une seule ligne. Indique l’expéditeur, le sujet, ce qui est communiqué ou demandé, ainsi que les dates, délais, montants, documents ou actions importants.`,
        'F4': `Traduis le texte fourni en allemand simple et compréhensible, niveau A2-B1. Formule le texte de manière polie, officielle et grammaticalement correcte. Conserve le sens, les noms, les dates, les montants, les adresses, les organisations et tous les détails importants.`,
        'F5': `Corrige le texte français fourni. Rends-le grammaticalement correct, clair, logique et naturel, tout en conservant le sens initial. Supprime les erreurs, les répétitions et les formulations maladroites. N’ajoute aucun fait absent du texte original.`,
        'F6': `Rédige une réponse courte, polie et officielle à cette lettre en français. Réponds au contenu de manière concrète, sans phrases inutiles. Si nécessaire, confirme la réception, demande une précision, mentionne les documents ou donne les informations demandées. Termine par une formule de politesse appropriée.`,
        'F7': `Explique en français, avec des mots simples, ce que signifie ce texte. Analyse le contexte, l’auteur, le destinataire, le sujet, ce qui est demandé, ce qu’il faut faire, les délais, dates, montants, documents ou conditions importants.`,
        'F8': `Extrais du texte fourni tous les faits importants et structure-les en français. Indique séparément les personnes, organisations, adresses, dates, délais, montants, numéros de documents, exigences, décisions, obligations, documents mentionnés et prochaines étapes. N’invente aucune information.`,
        'F9': `Établis en français une liste claire des actions à effectuer à partir de ce texte. Indique ce qu’il faut faire, quels documents préparer, à qui répondre, où s’adresser, quels délais respecter et les points à surveiller. Classe les actions par priorité.`,
        'F10': `Rédige sur la base du texte fourni une lettre officielle polie en allemand simple, niveau A2-B1. Conserve tous les faits importants: noms, dates, montants, adresses, organisations, numéros de documents et circonstances. Structure la lettre avec une formule d’appel, une explication courte, la demande principale et une conclusion. Termine par: Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea', 'input[type="text"]', 'input[type="search"]', '[contenteditable="true"]', '[contenteditable="plaintext-only"]', '[role="textbox"]'];

    function isEditableElement(element) {
        if (!element || !element.matches) return false;
        if (element.disabled || element.readOnly) return false;
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        const inputType = (element.getAttribute('type') || '').toLowerCase();
        if (tagName === 'input' && !['text', 'search'].includes(inputType)) return false;
        return EDITABLE_SELECTORS.some(selector => element.matches(selector));
    }

    function findEditableElement(target) {
        if (!target) return null;
        if (isEditableElement(target)) return target;
        if (target.closest) {
            const element = target.closest(EDITABLE_SELECTORS.join(','));
            if (isEditableElement(element)) return element;
        }
        return null;
    }

    function getText(element) {
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        return tagName === 'textarea' || tagName === 'input' ? element.value || '' : element.innerText || element.textContent || '';
    }

    function normalizeCommand(text) {
        return String(text || '').trim().replace(/\s+/g, '').toUpperCase();
    }

    function dispatchInputEvents(element, text) {
        try {
            element.dispatchEvent(new InputEvent('input', { bubbles: true, cancelable: true, inputType: 'insertReplacementText', data: text }));
        } catch (error) {
            element.dispatchEvent(new Event('input', { bubbles: true }));
        }
        element.dispatchEvent(new Event('change', { bubbles: true }));
    }

    function setCursorToEnd(element) {
        element.focus();
        if ('selectionStart' in element) {
            const length = element.value.length;
            element.setSelectionRange(length, length);
            return;
        }
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function replaceText(element, newText) {
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        element.focus();
        if (tagName === 'textarea' || tagName === 'input') {
            element.value = newText;
        } else {
            try {
                const range = document.createRange();
                const selection = window.getSelection();
                range.selectNodeContents(element);
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand('insertText', false, newText);
            } catch (error) {
                element.textContent = newText;
            }
        }
        setCursorToEnd(element);
        dispatchInputEvents(element, newText);
    }

    function showNotification(message) {
        const oldBox = document.getElementById('tm-ai-prompt-commands-notification');
        if (oldBox) oldBox.remove();
        const box = document.createElement('div');
        box.id = 'tm-ai-prompt-commands-notification';
        box.textContent = message;
        box.style.cssText = 'position:fixed;right:20px;bottom:20px;z-index:999999;background:#111;color:#fff;padding:12px 18px;border-radius:10px;font:14px Arial,sans-serif;box-shadow:0 4px 12px rgba(0,0,0,.35);max-width:420px;line-height:1.4';
        document.body.appendChild(box);
        setTimeout(() => box.remove(), 2200);
    }

    function checkAndReplace(target) {
        const editable = findEditableElement(target);
        if (!editable) return;
        const command = normalizeCommand(getText(editable));
        if (!Object.prototype.hasOwnProperty.call(COMMANDS, command)) return;
        replaceText(editable, COMMANDS[command]);
        showNotification(`Commande ${command} remplacée par une invite IA prête à l’emploi`);
    }

    document.addEventListener('input', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('keyup', event => setTimeout(() => checkAndReplace(event.target), 20), true);
    document.addEventListener('paste', event => setTimeout(() => checkAndReplace(event.target), 50), true);
})();