
"use strict";

const referencia = {
    retornarNumDeLinha(celulaFocada) {
        let celulaFocada_e_celulasIrmas = celulaFocada.parentElement.children;
        let celulaFocadaIndex;
        for (let i = 0; i < celulaFocada_e_celulasIrmas.length; i++) {
            if(celulaFocada_e_celulasIrmas[i] === celulaFocada) {
                celulaFocadaIndex = i;
            }
        }
        const numLinhaOutput = document.querySelector("output.ref-de-linha");
        
        const linhasA = ["A.1", "A.2", "A.3"];
        const linhasB = ["B.1", "B.2", "B.3", "B.4", "B.5", "B.6", "B.7", "B.8", "B.9"];
        const linhasBGrade3 = ["B.10", "B.11", "B.12", "B.13"]
        const linhasC = ["C.1", "C.2", "C.3"];
        const linhasD = ["D.1", "D.2", "D.3"];
        const linhasE = ["E.1", "E.2", "E.3"];

        let numLinha;
        if(celulaFocada.parentElement.matches(".la")) {
            numLinha = linhasA[celulaFocadaIndex];
        } else if (celulaFocada.parentElement.matches(".lb")) {
            numLinha = linhasB[celulaFocadaIndex];
        } else if (celulaFocada.parentElement.matches(".lb2")) {
            numLinha = linhasBGrade3[celulaFocadaIndex];
        } else if (celulaFocada.parentElement.matches(".lc")) {
            numLinha = linhasC[celulaFocadaIndex];
        } else if (celulaFocada.parentElement.matches(".ld")) {
            numLinha = linhasD[celulaFocadaIndex];
        } else if (celulaFocada.parentElement.matches(".le")) {
            numLinha = linhasE[celulaFocadaIndex];
        }

        numLinhaOutput.textContent = numLinha;
    },

    retornarSexoEIdade(celulaFocada) {
        const divMaeDaCelulaFocada = celulaFocada.parentElement;
        const divAvoDaCelulaFocada = divMaeDaCelulaFocada.parentElement;
        const divsMaeETiasDaCelulaFocada = divAvoDaCelulaFocada.querySelectorAll("div.inputs-container");

        let indiceDaDivMae;
        for (let i = 0; i < divsMaeETiasDaCelulaFocada.length; i++) {
            if(divsMaeETiasDaCelulaFocada[i] === divMaeDaCelulaFocada) {
                indiceDaDivMae = i; 
            }
        }               
        
        const faixasEtarias = ["0-4 anos", "5-9 anos", "10-14 anos", "10-14 anos", "15-19 anos", "15-19 anos", "20/ &plus; anos", "20/ &plus; anos"];


        let faixaEtaria = faixasEtarias[indiceDaDivMae];
        let sexo;
        if(indiceDaDivMae < 2) {sexo = "&minus;";} 
        else if ((indiceDaDivMae % 2) === 0) {sexo = "F";} 
        else {sexo = "M"; }

        const faixaEtariaOutput = document.querySelector("output.ref-de-faixa-etaria");
        const sexoOutput = document.querySelector("output.ref-de-sexo");
        
        
        if (divMaeDaCelulaFocada.matches(".lc") 
        || divMaeDaCelulaFocada.matches(".le")) {
            sexo = faixaEtaria = "&minus;";
        } else if(divMaeDaCelulaFocada.matches(".ld.total-pediatrico")) {
            faixaEtaria = "0-14 anos";
            sexo = "&minus;";
            
        } else if(divMaeDaCelulaFocada.matches(".ld.total-adulto")) {
            faixaEtaria = "15/ + anos";
            sexo = "&minus;";
        }

        faixaEtariaOutput.innerHTML = faixaEtaria;
        sexoOutput.innerHTML = sexo;
    }, 

    resetarReferencia() {
        const referencias = document.querySelectorAll("div.coluna-de-referencia output");
        for (const ref of referencias) {
            ref.textContent = "";
        }
    }
}

window.addEventListener("load", () => {
    // INVOCAÇÃO DAS FUNÇÕES 
    celulasDeTodasGrades.forEach ( cel => {
        if(!cel.matches("[readonly]")) {
            cel.addEventListener("focusin", () => {
                referencia.retornarNumDeLinha(cel);
                referencia.retornarSexoEIdade(cel);
            });

            cel.addEventListener("focusout", () => {
                referencia.resetarReferencia();
            });
        }
    });
});

// MOSTRAR OU OMITIR LINHA DE REFERENCIA
window.addEventListener("scroll", () => {
    const referencia = document.querySelector("div.linha-de-referencia");
    const boundingReference = document.querySelector(".bounding-reference");
    let PosicaoDaFicha = boundingReference.getBoundingClientRect().bottom;

    PosicaoDaFicha < 0 ?
        referencia.classList.add("off") : 
        referencia.classList.remove("off");
});