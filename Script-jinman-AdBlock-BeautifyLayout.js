// ==UserScript==
// @name         禁漫天堂&&去广告&&净化
// @namespace    https://github.com/GangChengHuang
// @version      1.1
// @description  禁漫天堂&&去广告&&净化
// @author       PeterG
// @match        https://18comic.vip/*
// @match        https://jm-comic1.club/*
// @icon         http://18comic.vip/favicon.ico
// @grant        GM_addStyle
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    var adLists_www = ['#meun_game','#billboard-modal','.modal-backdrop','.float-right-image','.top-menu-link','.footer-container','.owl-carousel','.owl-loaded','.owl-drag','.e8c78e-4_b','.top-a2db'];
    function setADdisplayNone(adLists) {
        for (const adName of adLists) {
            GM_addStyle(adName+'{display:none !important}');
        }
    }
    function removead() {
        const ads = document.querySelectorAll('div.row');
        for (const ad of ads) {
            if (ad.querySelector('div.close-btn')) {
                ad.remove();
            }
        }
        var panel = document.querySelector('div.panel.panel-default');
        if (!panel) {
            return;
        }
        panel = panel.childNodes;
        for (const node of panel) {
            if (!node) {
                continue;
            }
            if ((!node.className) || (!(node.className.includes('panel')))) {
                node.remove();
            }
        }
        const e8c78e_4_bs = document.querySelectorAll('.e8c78e-4_b');
        for (const e8c78e_4_b of e8c78e_4_bs) {
            if (!e8c78e_4_b) {
                continue;
            }
            e8c78e_4_b.remove();
        }
    }
    function removeAlign() {
        const div = document.querySelector('div.top-nav');
        const lis = div.querySelectorAll('div.hidden-xs');
        const texts = ['广告洽询','JM公告','打赏JM','分流','打賞JM','廣告洽詢'];
        for (const li of lis) {
            const a = li.querySelector('a');
            if (a && (texts.indexOf(a.textContent) > -1)) {
                li.remove();
            }
        }
    } 
    function pageMutation() {
        var targetNode = document.querySelector("body");
        var config = { attributes: true, childList: true, subtree: true };
        var callback = function (mutationsList) {
            mutationsList.forEach(function (item, index) {
                removead();
                removeAlign();
            });
        };
        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }
    unsafeWindow.addEventListener('load', ()=>{

        pageMutation();
    });
    setADdisplayNone(adLists_www);
    // Your code here...
})();
