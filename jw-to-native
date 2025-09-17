// ==UserScript==
// @name         JWPlayer to Native Video
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove JWPlayer interface and keep only native HTML5 video
// @author       You
// @match        *://*.goyabu.in/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Função principal para converter JWPlayer em vídeo nativo
    function convertJWPlayerToNative() {
        // Encontrar todos os elementos JWPlayer
        const jwPlayers = document.querySelectorAll('[id^="jwplayer"], .jwplayer, [class*="jw-player"], [data-player="jwplayer"]');

        jwPlayers.forEach(player => {
            // Tentar encontrar o elemento de vídeo dentro do JWPlayer
            const videoElement = player.querySelector('video');

            if (videoElement) {
                // Clonar o elemento de vídeo para preservar todos os atributos
                const clonedVideo = videoElement.cloneNode(true);

                // Remover controles do JWPlayer se existirem
                clonedVideo.removeAttribute('controls');

                // Adicionar controles nativos do HTML5
                clonedVideo.setAttribute('controls', 'true');

                // Estilizar o vídeo para ocupar o espaço original
                clonedVideo.style.width = '100%';
                clonedVideo.style.height = '100%';
                clonedVideo.style.display = 'block';

                // Substituir o JWPlayer pelo vídeo nativo
                player.parentNode.replaceChild(clonedVideo, player);

                console.log('JWPlayer convertido para vídeo nativo');
            }
        });
    }

    // Função para observar mudanças no DOM e aplicar a conversão
    function observeDOM() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    setTimeout(convertJWPlayerToNative, 1000);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Executar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(convertJWPlayerToNative, 2000);
            observeDOM();
        });
    } else {
        setTimeout(convertJWPlayerToNative, 2000);
        observeDOM();
    }

    // Também executar quando a janela for carregada completamente
    window.addEventListener('load', function() {
        setTimeout(convertJWPlayerToNative, 3000);
    });
})();
