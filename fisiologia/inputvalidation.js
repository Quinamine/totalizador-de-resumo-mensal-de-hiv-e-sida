"use strict";

const inputValidation = {
    contarAlgarismosPorCelula(){
        let numeroDeCelulasVermelhas = 0;
        for (const cel of celulasDeGradesAeB) {

            this.adicionarOuRemoverFundoVermelho(cel, "-");
            let numAlgarismos = cel.value.length;
            if(numAlgarismos < 7) {
                this.resetFontSize(cel);
            } else if(numAlgarismos === 7) {
                this.changeFontSize("fs-12");
            }  else {
                this.changeFontSize("fs-11");

                if(numAlgarismos > 8) {
                    cel.classList.add("fundo-vermelho");
                    this.adicionarOuRemoverFundoVermelho(cel, "+");
                    numeroDeCelulasVermelhas++;
                }
            } 
        }
        if(numeroDeCelulasVermelhas > 0) {
            setTimeout(() => this.mostrarMotivoPelasCelulasVermelhas(), 1500);
        }
    },

    resetFontSize(cel) { 
        // reset
        cel.classList.remove("fs-12");
        cel.classList.remove("fs-11");
    },

    changeFontSize(fs) {
        for (const c of celulasDeGradesAeB) {
            // reset
            this.resetFontSize(c);
            // mudança
            c.classList.add(`${fs}`);
        }
    },

    adicionarOuRemoverFundoVermelho(cel, accao) {
        accao === "+" ? cel.classList.add("fundo-vermelho") : cel.classList.remove("fundo-vermelho");
    },
    
    mostrarMotivoPelasCelulasVermelhas() {
        if(!sessionStorage.getItem("trmhiv-naoMostrarMaisMotivoDeRedCels")) {
            alertaVermelho.classList.add("on");
            desfoqueDoFundo.on();
        }
    },
    
    omitirMotivoPelasCelulasVermelhas() {
        alertaVermelho.classList.remove("on");
        desfoqueDoFundo.off();
    },

    salvarPreferenciaNaoMostrarMais: () => {
        const checkboxNaoMostrarMais = document.querySelector("#nao-mostrar-mais");
        if(checkboxNaoMostrarMais.checked) {
            sessionStorage.setItem("trmhiv-naoMostrarMaisMotivoDeRedCels", "checked");
        } else {
            sessionStorage.removeItem("trmhiv-naoMostrarMaisMotivoDeRedCels");
        }
    }
}

// VARIÁVEIS GLOBAIS
let celulasDeGradesAeB, alertaVermelho;
window.addEventListener("load", () => {
    celulasDeGradesAeB = document.querySelectorAll("div.corpo-da-ficha input");
    alertaVermelho = document.querySelector("div.razao-pelas-celulas-com-fundo-vermelho");

    celulasDeGradesAeB.forEach( cel => {
        cel.addEventListener("input", () => {
            setTimeout(() => inputValidation.contarAlgarismosPorCelula(), 250);
        });
    });

    const celulasDeGradesCDeE = document.querySelectorAll("div.grade-extra input");
    celulasDeGradesCDeE.forEach( cel => {
        cel.addEventListener("input", () => {
            if(cel.parentElement.matches(".ld")) {
                cel.value.length > 13 ?
                inputValidation.adicionarOuRemoverFundoVermelho(cel, "+") :
                inputValidation.adicionarOuRemoverFundoVermelho(cel, "-");
            }

            else {
                cel.value.length > 26 ?
                inputValidation.adicionarOuRemoverFundoVermelho(cel, "+") :
                inputValidation.adicionarOuRemoverFundoVermelho(cel, "-");
            }
        });
    });

    setTimeout(() => inputValidation.contarAlgarismosPorCelula(), 1000);

    const btnFecharAlerta = document.querySelector("button.close-redcels-obs");
    btnFecharAlerta.addEventListener("click", () => {
        inputValidation.omitirMotivoPelasCelulasVermelhas();
        inputValidation.salvarPreferenciaNaoMostrarMais();
    });
});