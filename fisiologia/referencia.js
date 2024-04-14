"use strict"

const referencia = {
    retornarLinha(input) {
        const linhasAfins = document.querySelectorAll(`.${input.parentElement.dataset.linhas} span`);
        const inputParent__children = input.parentElement.children;

        let inputIndex;
        for (let i = 0; i < inputParent__children.length; i++) {
            if(input === inputParent__children[i]) {
                inputIndex = i;
            }
        }

        const linhaOutput = document.querySelector(".reference-row__output-indicador");
        linhaOutput.value = linhasAfins[inputIndex].textContent;
        
    },

    retornarFaixaEtaria(input) {
        const faixaEtariaOutput = document.querySelector(".reference-row__output-idade");

        let faixaEtaria = input.parentElement.dataset.faixaetaria;
        faixaEtariaOutput.value = faixaEtaria;
    },

    retornarSexo(input) {
        const faixaEtariaOutput = document.querySelector(".reference-row__output-sexo");

        let sexo = input.parentElement.dataset.sexo;
        faixaEtariaOutput.value = sexo;
    },

    retornarVazio() {
        const outputs = document.querySelectorAll(".reference-row__output");
        for (const o of outputs) o.value = "";
    }
}

function events() {
    const gridInputs = document.querySelectorAll("[data-totalgeraleixox], .grid-extra__input");
    gridInputs.forEach( gi => {
        gi.addEventListener("focus", () => {
            referencia.retornarLinha(gi);
            referencia.retornarFaixaEtaria(gi);
            referencia.retornarSexo(gi);
        });
    });

    gridInputs.forEach( gi => gi.addEventListener("focusout", referencia.retornarVazio));
}

window.onload = events;