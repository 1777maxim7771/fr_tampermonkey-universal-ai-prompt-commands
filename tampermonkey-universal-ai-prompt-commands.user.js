// ==UserScript==
// @name         Tampermonkey Universal AI Prompt Commands FR
// @namespace    local.tampermonkey.universal.ai.prompt.commands.fr
// @version      1.1.0
// @description  Version française : remplace les déclencheurs universels Q1-Q10 par des invites IA prêtes à l’emploi pour les chats IA
// @author       1777maxim7771
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    /*
        Objectif : accélérer le travail avec ChatGPT, Gemini, Claude, Copilot et d'autres chats IA.
        Le script remplace les déclencheurs universels Q1-Q10 par des invites IA longues et préparées.
        Les déclencheurs ne sont pas liés à une langue : vous pouvez les remplacer par vos propres mots ou phrases.
    */

    const COMMANDS = {
        'Q1': `Traduis le texte fourni entièrement et précisément en français.
Conserve le sens, l’ordre des informations, les noms, les dates, les montants, les numéros de documents, les noms d’organisations et les formulations importantes.
N’ajoute pas de conclusions personnelles, ne raccourcis pas le texte et ne modifie pas le contenu.`,
        'Q2': `Résume le texte fourni en français selon son sens et son contexte.
Explique de quoi parle le texte, qui écrit à qui, quel est le sujet principal et quelles demandes, décisions, dates, délais, montants ou informations importantes sont mentionnés.`,
        'Q3': `Fais un résumé thématique très court de la lettre en français, strictement en une seule ligne.
Indique dans cette ligne l’expéditeur, le sujet, ce qui est communiqué ou demandé, ainsi que les dates, délais, montants, documents ou actions importants.`,
        'Q4': `Traduis le texte fourni en allemand simple et compréhensible, niveau A2-B1.
Le texte doit être poli, officiel et grammaticalement correct.
Conserve le sens original, les dates, les noms, les montants, les adresses, les organisations et les détails importants.`,
        'Q5': `Corrige le texte français fourni.
Rends-le grammaticalement correct, clair et logique tout en conservant le sens original.
Supprime les erreurs, les répétitions, les formulations maladroites et les passages trop familiers.
N’ajoute pas de faits qui ne sont pas présents dans le texte initial.`,
        'Q6': `Rédige une réponse courte, polie et officielle à cette lettre en français.
La réponse doit être claire, directe et sans phrases inutiles.
S’il faut confirmer la réception, clarifier des documents, demander une explication ou transmettre une information, formule cela correctement.`,
        'Q7': `Explique en français avec des mots simples ce que signifie ce texte.
Analyse le contexte : qui écrit, à quel sujet, ce qui est demandé, ce qu’il faut faire et quels délais, dates, montants, documents ou conditions sont importants.`,
        'Q8': `Extrais tous les faits importants du texte fourni et structure-les en français.
Indique séparément : personnes, organisations, adresses, dates, délais, montants, numéros de documents, demandes, décisions, obligations, documents mentionnés et prochaines étapes.
N’invente aucune information. Si une information manque, écris : non indiqué.`,
        'Q9': `Crée en français une liste claire des actions à effectuer sur la base de ce texte.
Détermine ce qu’il faut faire, quels documents préparer, à qui répondre, où s’adresser, quels délais respecter et à quoi faire attention.
Classe les actions par priorité : urgent, important, possible plus tard.`,
        'Q10': `Rédige une lettre officielle polie en allemand sur la base du texte fourni.
La lettre doit être simple, claire et correcte, niveau A2-B1.
Conserve tous les faits importants : noms, dates, montants, adresses, organisations, numéros de documents et circonstances.
Termine par : Mit freundlichen Grüßen`
    };

    const EDITABLE_SELECTORS = ['textarea','input[type="text"]','input[type="search"]','[contenteditable="true"]','[contenteditable="plaintext-only"]','[role="textbox"]'];
    function isEditableElement(e){if(!e||!e.matches)return false;if(e.disabled||e.readOnly)return false;const t=e.tagName?e.tagName.toLowerCase():'';const type=(e.getAttribute('type')||'').toLowerCase();if(t==='input'&&!['text','search'].includes(type))return false;return EDITABLE_SELECTORS.some(s=>e.matches(s));}
    function findEditableElement(t){if(!t)return null;if(isEditableElement(t))return t;if(t.closest){const e=t.closest(EDITABLE_SELECTORS.join(','));if(isEditableElement(e))return e;}return null;}
    function getText(e){const t=e.tagName?e.tagName.toLowerCase():'';return(t==='textarea'||t==='input')?(e.value||''):(e.innerText||e.textContent||'');}
    function normalizeCommand(text){return String(text||'').trim().replace(/\s+/g,'').toUpperCase();}
    function setCursorToEnd(e){e.focus();const t=e.tagName?e.tagName.toLowerCase():'';if(t==='textarea'||t==='input'){const l=e.value.length;e.setSelectionRange(l,l);return;}const r=document.createRange(),s=window.getSelection();r.selectNodeContents(e);r.collapse(false);s.removeAllRanges();s.addRange(r);}
    function dispatchInputEvents(e,text){try{e.dispatchEvent(new InputEvent('input',{bubbles:true,cancelable:true,inputType:'insertReplacementText',data:text}));}catch(_){e.dispatchEvent(new Event('input',{bubbles:true}));}e.dispatchEvent(new Event('change',{bubbles:true}));}
    function replaceText(e,text){const t=e.tagName?e.tagName.toLowerCase():'';e.focus();if(t==='textarea'||t==='input'){e.value=text;setCursorToEnd(e);dispatchInputEvents(e,text);return;}try{const r=document.createRange(),s=window.getSelection();r.selectNodeContents(e);s.removeAllRanges();s.addRange(r);document.execCommand('insertText',false,text);}catch(_){e.textContent=text;}setCursorToEnd(e);dispatchInputEvents(e,text);}
    function showNotification(m){const old=document.getElementById('tampermonkey-universal-ai-prompt-commands-notification');if(old)old.remove();const b=document.createElement('div');b.id='tampermonkey-universal-ai-prompt-commands-notification';b.textContent=m;b.style.position='fixed';b.style.right='20px';b.style.bottom='20px';b.style.zIndex='999999';b.style.background='#111';b.style.color='#fff';b.style.padding='12px 18px';b.style.borderRadius='10px';b.style.fontSize='14px';b.style.fontFamily='Arial, sans-serif';b.style.boxShadow='0 4px 12px rgba(0,0,0,0.35)';document.body.appendChild(b);setTimeout(()=>b.remove(),2200);}
    function checkAndReplace(target){const e=findEditableElement(target);if(!e)return;const c=normalizeCommand(getText(e));if(!Object.prototype.hasOwnProperty.call(COMMANDS,c))return;replaceText(e,COMMANDS[c]);showNotification(`Déclencheur ${c} remplacé par une invite IA prête à l’emploi`);}
    document.addEventListener('input',e=>setTimeout(()=>checkAndReplace(e.target),20),true);
    document.addEventListener('keyup',e=>setTimeout(()=>checkAndReplace(e.target),20),true);
    document.addEventListener('paste',e=>setTimeout(()=>checkAndReplace(e.target),50),true);
})();