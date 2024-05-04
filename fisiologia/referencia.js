"use strict"

const referencia = {
    retornarIndicador(inputTarget) {
        const classColIndicadores = inputTarget.parentElement.dataset.indicadores;
        const indicadores = document.querySelectorAll(`.${classColIndicadores} span`);
      
        const inputTargetAndSiblings = inputTarget.parentElement.children;

        let inputTargetIndex;
        for (let i = 0; i < inputTargetAndSiblings.length; i++) {
            if(inputTarget === inputTargetAndSiblings[i]) {
                inputTargetIndex = i;
            }
        }

        const indicadorOutput = document.querySelector(".reference-row__output--indicador");
        indicadorOutput.value = indicadores[inputTargetIndex].textContent;
        
    },

    retornarFaixaEtariaEsexo(inputTarget) {
        const faixaEtariaOutput = document.querySelector(".reference-row__output--idade");
        const sexoOutput = document.querySelector(".reference-row__output--sexo");

        let faixaEtaria = inputTarget.parentElement.dataset.faixaetaria;
        let sexo = inputTarget.parentElement.dataset.sexo;

        faixaEtariaOutput.value = faixaEtaria;
        sexoOutput.value = sexo;
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
            referencia.retornarIndicador(gi);
            referencia.retornarFaixaEtariaEsexo(gi);
        });
    });

    gridInputs.forEach( gi => gi.addEventListener("focusout", referencia.retornarVazio));
}

window.onload = events;