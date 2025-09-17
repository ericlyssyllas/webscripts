// ==UserScript==
// @name         File4Go - Pular Espera + ID da URL
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Habilita o botão imediatamente e pega o ID base64 da URL
// @author       Você
// @match        *://*.file4go.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    // Função para extrair o ID base64 da URL
    function extractBase64Id() {
        const urlPaths = window.location.pathname.split('/');

        // Pega o ÚLTIMO segmento da URL (parte após a última barra)
        const base64Id = urlPaths.filter(p => p.trim() !== '').pop();

        // Verifica se parece um base64 válido (opcional)
        if (/^[a-zA-Z0-9+/]+={0,2}$/.test(base64Id)) {
            return base64Id;
        }
        return 'ID_INVALIDO_' + Date.now(); // Fallback (pode remover se quiser)
    }
    // Sobrescreve a função original
    $.fn.timedDisable = function(time) {
        return $(this).each(function() {
            const $botao = $(this);
            const textoOriginal = $botao.html();

            // 1. Insere o ID extraído da URL no campo #id
            $('#id').val(extractBase64Id());

            // 2. Simula a chamada à API (mantém compatibilidade)
            $.get('https://ads.anitube.vip/file4go.php').done(function(res) {
                try {
                    const data = JSON.parse(res);
                    if (data[0]?.publicidade) {
                        $('#idusuario').val(data[0].publicidade);
                    }
                } catch(e) { /* Ignora erros */ }
            }).fail(() => { /* Ignora falhas */ });

            // 3. Habilita o botão IMEDIATAMENTE
            $botao.prop('disabled', false)
                  .html(textoOriginal);
        });
    };
    // Dispara com tempo ZERO
    $('#btnContinue').timedDisable(0);
})();
