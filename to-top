// ==UserScript==
// @name         Botões Topo e Fundo com Animação
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adiciona botões animados para ir ao topo e fundo da página
// @author       Você
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Criar os botões
    function criarBotoes() {
        // Botão para o topo
        const btnTopo = document.createElement('button');
        btnTopo.id = 'btnTopo';
        btnTopo.innerHTML = '▲';
        btnTopo.title = 'Ir para o topo';

        // Botão para baixo
        const btnBaixo = document.createElement('button');
        btnBaixo.id = 'btnBaixo';
        btnBaixo.innerHTML = '▼';
        btnBaixo.title = 'Ir para o fundo';

        // Estilizar os botões
        const estilo = `
            #btnTopo, #btnBaixo {
                position: fixed;
                right: 20px;
                width: 50px;
                height: 50px;
                border: none;
                border-radius: 50%;
                background: linear-gradient(45deg, #007bff, #0056b3);
                color: white;
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
                transition: all 0.3s ease;
                z-index: 9999;
                opacity: 0;
                transform: translateY(20px);
                pointer-events: none;
            }

            #btnTopo.visivel, #btnBaixo.visivel {
                opacity: 1;
                transform: translateY(0);
                pointer-events: auto;
            }

            #btnTopo:hover, #btnBaixo:hover {
                background: linear-gradient(45deg, #0056b3, #003d7a);
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
            }

            #btnTopo:active, #btnBaixo:active {
                transform: scale(0.95);
            }

            #btnTopo {
                bottom: 90px;
            }

            #btnBaixo {
                bottom: 20px;
            }

            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }

            #btnTopo.animando, #btnBaixo.animando {
                animation: pulse 0.5s ease;
            }
        `;

        // Adicionar estilos
        const styleSheet = document.createElement('style');
        styleSheet.textContent = estilo;
        document.head.appendChild(styleSheet);

        // Adicionar botões ao corpo
        document.body.appendChild(btnTopo);
        document.body.appendChild(btnBaixo);

        // Função de animação suave de scroll
        function scrollSuave(alvo, duracao = 1000) {
            const inicio = window.pageYOffset;
            const distancia = alvo - inicio;
            let startTime = null;

            function animacao(tempoAtual) {
                if (startTime === null) startTime = tempoAtual;
                const tempoDecorrido = tempoAtual - startTime;
                const progresso = Math.min(tempoDecorrido / duracao, 1);

                // Função de easing (suavização)
                const ease = function(t) {
                    return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1;
                };

                window.scrollTo(0, inicio + distancia * ease(progresso));

                if (progresso < 1) {
                    requestAnimationFrame(animacao);
                }
            }

            requestAnimationFrame(animacao);
        }

        // Event listeners
        btnTopo.addEventListener('click', function() {
            this.classList.add('animando');
            scrollSuave(0, 800);
            setTimeout(() => this.classList.remove('animando'), 500);
        });

        btnBaixo.addEventListener('click', function() {
            this.classList.add('animando');
            scrollSuave(document.body.scrollHeight, 800);
            setTimeout(() => this.classList.remove('animando'), 500);
        });

        // Mostrar/ocultar botões baseado na posição do scroll
        function toggleBotoes() {
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.scrollHeight;

            // Mostrar btnTopo quando não estiver no topo
            if (scrollTop > 100) {
                btnTopo.classList.add('visivel');
            } else {
                btnTopo.classList.remove('visivel');
            }

            // Mostrar btnBaixo quando não estiver no fundo
            if (scrollTop + windowHeight < documentHeight - 100) {
                btnBaixo.classList.add('visivel');
            } else {
                btnBaixo.classList.remove('visivel');
            }
        }

        // Inicializar visibilidade
        toggleBotoes();

        // Listener para scroll
        window.addEventListener('scroll', toggleBotoes);

        // Listener para redimensionamento
        window.addEventListener('resize', toggleBotoes);
    }

    // Esperar o DOM carregar
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', criarBotoes);
    } else {
        criarBotoes();
    }
})();
