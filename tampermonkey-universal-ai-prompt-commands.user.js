// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands FR
// @namespace    local.tampermonkey.universal.ai.prompt.commands.fr
// @version      1.0.0
// @description  Script Tampermonkey pour remplacer des commandes courtes par des invites IA prêtes à l’emploi dans les chats IA.
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    // Localized commands: replacement occurs only for an exact command.
    const COMMANDS = {
        'F1': `Traduis intégralement et fidèlement le texte fourni en français. Conserve le sens, l’ordre des informations, les noms, dates, montants, numéros de documents, organisations et formulations importantes. N’ajoute aucune conclusion, ne résume pas et ne modifie pas le contenu.`,

        'F2': `Résume le texte fourni en français selon son sens et son contexte. Indique le sujet, les interlocuteurs et le contenu principal. Signale séparément les demandes, décisions, dates, délais, montants et détails importants. Utilise un langage simple et concis.`,

        'F3': `Rédige en français un résumé thématique très bref de la lettre, sur une seule ligne. Mentionne l’expéditeur, le sujet, ce qui est annoncé ou demandé, ainsi que les dates, délais, montants, documents ou actions importants.`,

        'F4': `Traduis le texte fourni en allemand simple et clair, niveau A2-B1. Rends le texte poli, officiel et grammaticalement correct. Conserve le sens, les dates, noms, montants, adresses, organisations et détails importants. Évite les formulations allemandes complexes.`,

        'F5': `Corrige le texte fourni en français. Rends-le correct, clair et logique tout en conservant son sens. Supprime les erreurs, répétitions et formulations maladroites. Pour une lettre, adopte un ton poli et officiel. N’ajoute aucun fait absent du texte source.`,

        'F6': `Rédige une réponse courte, polie et officielle à cette lettre en allemand simple, niveau A2-B1. Réponds précisément au contenu sans phrases inutiles. Formule correctement toute confirmation, demande de document ou demande d’explication. Termine par : Mit freundlichen Grüßen`,

        'F7': `Explique en français simple ce que signifie ce texte. Précise qui écrit, à quel sujet, ce qui est demandé, ce qu’il faut faire et les délais, dates, montants, documents ou conditions importants. Indique s’il s’agit d’une demande, d’un avertissement, d’une décision ou d’une information.`,

        'F8': `Extrais tous les faits importants du texte et structure-les en français : personnes, organisations, adresses, dates, délais, montants, numéros de documents, demandes, décisions, obligations, documents et prochaines étapes. N’invente rien ; écris « non indiqué » si une information manque.`,

        'F9': `Établis en français une liste claire des actions à effectuer à partir de ce texte. Indique les documents à préparer, les personnes à contacter, les délais et les points d’attention. Classe les actions en : urgent, important, peut attendre. Signale les questions à clarifier.`,

        'F10': `Rédige à partir du texte fourni une lettre officielle, polie et claire en allemand, niveau A2-B1. Conserve tous les faits importants. Structure : formule d’appel, situation, demande ou message principal, éventuelle demande de confirmation ou d’explication, conclusion. Termine par : Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea','input[type="text"]','input[type="search"]','[contenteditable="true"]','[contenteditable="plaintext-only"]','[role="textbox"]'];
    function isEditableElement(element) {
        if (!element || !element.matches || element.disabled || element.readOnly) return false;
        const tagName = element.tagName ? element.tagName.toLowerCase() : '';
        const inputType = (element.getAttribute('type') || '').toLowerCase();
        if (tagName === 'input' && !['text','search'].includes(inputType)) return false;
        return EDITABLE_SELECTORS.some(selector => element.matches(selector));
    }
    function findEditableElement(target) {
        if (!target) return null;
        if (isEditableElement(target)) return target;
        const element = target.closest ? target.closest(EDITABLE_SELECTORS.join(',')) : null;
        return isEditableElement(element) ? element : null;
    }
    function getText(element) {
        const tagName = element?.tagName?.toLowerCase() || '';
        return tagName === 'textarea' || tagName === 'input' ? (element.value || '') : (element?.innerText || element?.textContent || '');
    }
    function normalizeCommand(text) { return text.trim().replace(/\s+/g, '').toUpperCase(); }
    function dispatchInputEvents(element,text) {
        try { element.dispatchEvent(new InputEvent('input',{bubbles:true,cancelable:true,inputType:'insertReplacementText',data:text})); }
        catch (_) { element.dispatchEvent(new Event('input',{bubbles:true})); }
        element.dispatchEvent(new Event('change',{bubbles:true}));
    }
    function replaceText(element,newText) {
        const tagName=element.tagName?.toLowerCase() || ''; element.focus();
        if (tagName==='textarea' || tagName==='input') { element.value=newText; element.setSelectionRange(newText.length,newText.length); dispatchInputEvents(element,newText); return; }
        try { const range=document.createRange(), selection=window.getSelection(); range.selectNodeContents(element); selection.removeAllRanges(); selection.addRange(range); document.execCommand('insertText',false,newText); }
        catch (_) { element.textContent=newText; }
        dispatchInputEvents(element,newText);
    }
    function showNotification(message) {
        document.getElementById('tampermonkey-universal-ai-prompt-commands-notification')?.remove();
        const box=document.createElement('div'); box.id='tampermonkey-universal-ai-prompt-commands-notification'; box.textContent=message;
        Object.assign(box.style,{position:'fixed',right:'20px',bottom:'20px',zIndex:'999999',background:'#111',color:'#fff',padding:'12px 18px',borderRadius:'10px',fontSize:'14px',fontFamily:'Arial, sans-serif',boxShadow:'0 4px 12px rgba(0,0,0,.35)',maxWidth:'420px',lineHeight:'1.4'});
        document.body.appendChild(box); setTimeout(()=>box.remove(),2200);
    }
    function checkAndReplace(target) {
        const editable=findEditableElement(target); if (!editable) return;
        const command=normalizeCommand(getText(editable)); if (!Object.prototype.hasOwnProperty.call(COMMANDS,command)) return;
        replaceText(editable,COMMANDS[command]); showNotification("Commande {cmd} remplacée par une invite prête à l’emploi".replace('{cmd}',command));
    }
    document.addEventListener('input',event=>setTimeout(()=>checkAndReplace(event.target),20),true);
    document.addEventListener('keyup',event=>setTimeout(()=>checkAndReplace(event.target),20),true);
    document.addEventListener('paste',event=>setTimeout(()=>checkAndReplace(event.target),50),true);
})();
