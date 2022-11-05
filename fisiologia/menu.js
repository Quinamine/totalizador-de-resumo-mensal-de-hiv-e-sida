"use strict";

const menu = {
    destacarFundoDeTotais() {
        for (const cel of readonlyCels) {
            readonlyCelsDarker.checked ? 
                cel.classList.add("bg-gray") : 
                cel.classList.remove("bg-gray");
        }
    },

    // ESVAZIAR A FICHA
    esvaziamento() {
        const confirmacao = document.querySelector("div.caixa-de-confirmacao");
        const celulas = document.querySelectorAll("div.inputs-container input");
        return {
            mostrarCaixaDeConfirmacao: () => {
                let celulasPreenchidas = 0;
                for (const cel of celulas) {
                    cel.value != "" && celulasPreenchidas++;
                }

                if(celulasPreenchidas > 0) {
                    confirmacao.classList.add("on");
                    desfoqueDoFundo.on()
                }
                else {
                    const alerta = document.querySelector("div.caixa-de-alerta.ficha-vazia");
                    alerta.classList.add("on");
                    desfoqueDoFundo.on()
                }
            },

            omitirCaixaDeConfirmacao: () => {
                confirmacao.classList.remove("on");
                desfoqueDoFundo.off()
            },

            limparDados: () => {   

                for (let i = 0; i < celulas.length; i++) {
                    celulas[i].value = "";
                    localStorage.removeItem(`trmhiv-cel${i}`);
                    celulas[i].classList.remove("fundo-vermelho");
                };

                const limpadoresDeDadosAdicionais = document.querySelectorAll("ul.limpadores-de-dados-adicionais input");
                
                limpadoresDeDadosAdicionais.forEach ( limpador => {
                    if(limpador.checked) {
                        const IdDoDadoAdicional = limpador.dataset.for; 
                        const dadoAdicional = document.querySelector(`#${IdDoDadoAdicional}`);
                        dadoAdicional.value = "";
                        localStorage.removeItem(`trmhiv-${IdDoDadoAdicional}`);
                    }
                }); 
                desfoqueDoFundo.off()  
            }
        }
    },

    // IMPRIMIR
    imprimirFicha() {
        textArea.value === "" ?
            textArea.parentElement.classList.add("no-print") :
            textArea.parentElement.classList.remove("no-print");

        window.print();
    },

    // SOBRE
    abrirArtigoSobre() {
        document.querySelector("section#sobre").classList.add("on");
        desfoqueDoFundo.on();
    },

    // COOKIES
    abrirArtigoCookies() {
        document.querySelector("section#cookies").classList.add("on");
        desfoqueDoFundo.on();
        if(window.innerWidth < 1024) {
            document.querySelector("body").classList.add("overflow-hidden");
        }
    },

    // SALVAR COMO PDF
    salvarComoPdf() {
        if(window.innerWidth < 1024) {
            this.imprimirFicha();
        } else {
            document.querySelector("section#conversao-pdf").classList.add("on");
            desfoqueDoFundo.on();
        }
    }
}

const desfoqueDoFundo = {
    on() {
        divDesfocante.classList.add("on");
    },

    off() {
        divDesfocante.classList.remove("on");
    }
}

// DECLARAÇÃO E INICIALIZAÇÃO DAS VARIÁVEIS
let readonlyCelsDarker, readonlyCels,
textArea, 
divDesfocante;
function init() {
    readonlyCelsDarker = document.querySelector("#readonlyinputs-darker");
    readonlyCels = document.querySelectorAll("input[readonly]");
    textArea = document.querySelector("textarea#nota");
    divDesfocante = document.querySelector("div.desfoque");
}

// EVENTOS
function eventListeners() {
    // DESTACAR O FUNDO DOS TOTAIS
    readonlyCelsDarker.addEventListener("change", () => menu.destacarFundoDeTotais());

    // FECHAR CAIXA DE ALERTA
    const btnsFecharAlerta = document.querySelectorAll("div.caixa-de-alerta button");
    for (const btn of btnsFecharAlerta) {
        btn.addEventListener("click", () => {
            btn.parentElement.classList.remove("on");
            desfoqueDoFundo.off()
        })
    }

    // PROTEGER ACESSO À READONLY CELS
    readonlyCels.forEach ( cel => {
        cel.addEventListener("click", () => {
            if(cel.matches(".nao-aplicavel")) {
            const alerta = document.querySelector("div.caixa-de-alerta.indicador-nao-aplicavel");
            const sexoAQueNaoSeAplica = alerta.querySelector("span.sexo-output");

            alerta.classList.add("on");
            cel.parentElement.matches(".sexo-m") ?
                sexoAQueNaoSeAplica.textContent = "masculino" : 
                sexoAQueNaoSeAplica.textContent = "feminino";
            } else {
            document.querySelector("div.caixa-de-alerta.restricao-de-acesso-celular").classList.add("on");
            }           
            desfoqueDoFundo.on()
        })
    });

    // ESVAZIAR FICHA 
    const btnEsvaziar = document.querySelector("button.esvaziar-ficha");
    btnEsvaziar.addEventListener("click", () => menu.esvaziamento().mostrarCaixaDeConfirmacao());

    const btnCancelar = document.querySelector("button.cancelar");
    btnCancelar.addEventListener("click", () =>  menu.esvaziamento().omitirCaixaDeConfirmacao());

    const btnConfirmar = document.querySelector("button.confirmar");
    btnConfirmar.addEventListener("click", () => {
        menu.esvaziamento().limparDados();
        menu.esvaziamento().omitirCaixaDeConfirmacao();
    });

    // IMPRIMIR 
    const btnImprimir = document.querySelector("button.imprimir");
    btnImprimir.addEventListener("click", () => menu.imprimirFicha());

    // ABRIR CONTEÚDO SOBRE
    const btnSobre = document.querySelector("button.abrir-artigo-sobre");
    btnSobre.addEventListener("click", () => menu.abrirArtigoSobre());

    // ABRIR CONTEÚDO SOBRE NO LOAD DO WINDOWS
    if(location.hash === "#sobre") {
        menu.abrirArtigoSobre();
    }

    // ABRIR CONTEÚDO DE COOKIES
    const btnSaibaMaisSobreCookies = document.querySelector("button.abrir-artigo-cookies");
    btnSaibaMaisSobreCookies.addEventListener("click", () => menu.abrirArtigoCookies());

    // FECHAR CONTEÚDO SOBRE E COOKIES
    const btnsFecharArtigo = document.querySelectorAll("button.fechar-artigo");
    btnsFecharArtigo.forEach ( btn => {
        btn.addEventListener("click", () => {
            btn.parentElement.classList.remove("on");
            desfoqueDoFundo.off();
            document.querySelector("body").classList.remove("overflow-hidden");
        });
    });

    // SALVAR COMO PDF
    document.querySelector("button.salvar-como-pdf").addEventListener("click", () => menu.salvarComoPdf());

    // PARTILHAR
    let conteudo = {
        title: "Totalizador de Resumo Mensal de HIV",
        text: "Totaliza automaticamente o respectivo resumo com base nos dados preenchidos pelo usuário (Profissional de Saúde).",
        url: "https://www.quinamine.github.io/totalizador-de-resumo-mensal-de-hiv-e-sida/index.html"
    }

    const btnPartilhar = document.querySelector("button.partilhar");
    btnPartilhar.addEventListener("click", () => {
        try {
            navigator.share(conteudo)
            .then(() => {
                console.log("Endereço do totalizador partilhado com sucesso.");
            })
            .catch((erro) => {
                console.log(`Não foi possível partilhar devido ao erro: ${erro}.`);
            })
        } catch (erro) {
            console.log("O seu navegador não tem suporte ao método 'navigator.share()'.");
        }
    });
}

// FECHAR CAIXA DE ALERTA PELO ENTER
window.addEventListener("keyup", event => {
    let key = event.key;
    
    if(key.toLowerCase() === "enter") {
        const caixasDeAlerta = document.querySelectorAll("div.caixa-de-alerta");
        caixasDeAlerta.forEach ( caixa => caixa.classList.remove("on"));
        desfoqueDoFundo.off()
    }
});

window.addEventListener("load", () => {
    init();
    eventListeners();
});


