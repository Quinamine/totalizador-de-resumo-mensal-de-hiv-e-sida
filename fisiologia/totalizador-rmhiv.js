"use strict";

const storage  = {
    salvarFicha() {
        for (let i = 0; i < celulasDeTodasGrades.length; i++) {
            // Salvar
            celulasDeTodasGrades[i].addEventListener("input", () => localStorage.setItem(`trmhiv-cel${i}`, `${celulasDeTodasGrades[i].value}`));
            // Restaurar
            celulasDeTodasGrades[i].value = localStorage.getItem(`trmhiv-cel${i}`);
        }
    },

    salvarDadosAdicionais() {
        const dadosAdicionais = document.querySelectorAll("div.container input[type=text], input[type=date], textarea#nota, input#nid, input#ano");

        dadosAdicionais.forEach ( dado => {
            dado.addEventListener("input", () => localStorage.setItem(`trmhiv-${dado.id}`, `${dado.value}`));
            dado.value = localStorage.getItem(`trmhiv-${dado.id}`);

            function denegrirTexto(txt) {
                txt.value !== "" ? 
                txt.classList.add("bold") : 
                txt.classList.remove("bold");
            }

            if(dado.matches("#nota")) {
                dado.addEventListener("input", () => denegrirTexto(dado));
                denegrirTexto(dado); // NO LOAD DO WINDOWS 
            } 
        });
    },

    salvarDestaqueDeTotais() {
        readonlyCelsDarker.addEventListener("change", () => {
            readonlyCelsDarker.checked ?
            localStorage.setItem("trmhiv-destaque", "on") : 
            localStorage.removeItem("trmhiv-destaque");
        });

        // NO LOAD DO WINDOWS
        if(localStorage.getItem("trmhiv-destaque")) {
            readonlyCelsDarker.setAttribute("checked", "");
            menu.destacarFundoDeTotais();
        }; 
    }
}

const totalizacao = {
    filtrarCelulas(cel) {
        if(cel.dataset.total0a14eixox) {    
            cel.classList.add(`${cel.dataset.total0a14eixox}`);
            const total0a14EixoX = document.querySelectorAll(`.${cel.dataset.total0a14eixox}`);
            const total0a14EixoXOutput = document.querySelector(`.${cel.dataset.total0a14eixoxoutput}`);
            this.totalizarCelulas(total0a14EixoX, total0a14EixoXOutput);
        }

        if(cel.dataset.total15oumaiseixox) {    
            cel.classList.add(`${cel.dataset.total15oumaiseixox}`);
            const total15ouMaisEixoX = document.querySelectorAll(`.${cel.dataset.total15oumaiseixox}`);
            const total15ouMaisEixoXOutput = document.querySelector(`.${cel.dataset.total15oumaiseixoxoutput}`);
            this.totalizarCelulas(total15ouMaisEixoX, total15ouMaisEixoXOutput);
        }

        if(cel.dataset.totalgeraleixox) {    
            cel.classList.add(`${cel.dataset.totalgeraleixox}`);
            const totalGeralEixoX = document.querySelectorAll(`.${cel.dataset.totalgeraleixox}`);
            const totalGeralEixoXOutput = document.querySelector(`.${cel.dataset.totalgeraleixoxoutput}`);
            this.totalizarCelulas(totalGeralEixoX, totalGeralEixoXOutput);
        }

        if(cel.dataset.total10a19eixox) {    
            cel.classList.add(`${cel.dataset.total10a19eixox}`);
            const total10a19EixoX = document.querySelectorAll(`.${cel.dataset.total10a19eixox}`);
            const total10a19EixoXOutput = document.querySelector(`.${cel.dataset.total10a19eixoxoutput}`);
            this.totalizarCelulas(total10a19EixoX, total10a19EixoXOutput);
        }

        if(cel.dataset.totaleixoy) {    
            cel.classList.add(`${cel.dataset.totaleixoy}`);
            const totalEixoy = document.querySelectorAll(`.${cel.dataset.totaleixoy}`);
            const totalEixoyOutput = document.querySelector(`.${cel.dataset.totaleixoyoutput}`);
            this.totalizarCelulas(totalEixoy, totalEixoyOutput);
        }

        if(cel.dataset.total0a14eixoy) {
            cel.classList.add(`${cel.dataset.total0a14eixoy}`);
            const total0a14EixoY = document.querySelectorAll(`.${cel.dataset.total0a14eixoy}`);
            const total0a14EixoYOutput = document.querySelector(`.${cel.dataset.total0a14eixoyoutput}`);
            this.totalizarCelulas(total0a14EixoY, total0a14EixoYOutput);
        }

        if(cel.dataset.totalgeraleixoy) {
            cel.classList.add(`${cel.dataset.totalgeraleixoy}`);
            const totalGeralEixoY = document.querySelectorAll(`.${cel.dataset.totalgeraleixoy}`);
            const totalGeralEixoYOutput = document.querySelector(`.${cel.dataset.totalgeraleixoyoutput}`);
            this.totalizarCelulas(totalGeralEixoY, totalGeralEixoYOutput);
        }

        if(cel.dataset.total15oumaiseixoy) {
            cel.classList.add(`${cel.dataset.total15oumaiseixoy}`);
            const total15ouMaisEixoY = document.querySelectorAll(`.${cel.dataset.total15oumaiseixoy}`);
            const total15ouMaisEixoYOutput = document.querySelector(`.${cel.dataset.total15oumaiseixoyoutput}`);
            this.totalizarCelulas(total15ouMaisEixoY, total15ouMaisEixoYOutput);
        }

        if(cel.dataset.total10a19eixoy) {
            cel.classList.add(`${cel.dataset.total10a19eixoy}`);
            const total10a19EixoY = document.querySelectorAll(`.${cel.dataset.total10a19eixoy}`);
            const total10a19EixoYOutput = document.querySelector(`.${cel.dataset.total10a19eixoyoutput}`);
            this.totalizarCelulas(total10a19EixoY , total10a19EixoYOutput);
        }

        if(cel.dataset.totalb11) {
            cel.classList.add(`${cel.dataset.totalb11}`);
            const totalB11 = document.querySelectorAll(`.${cel.dataset.totalb11}`);
            const totalB11Output = document.querySelector(`.${cel.dataset.totalb11output}`);
            this.totalizarCelulas(totalB11 , totalB11Output);
        }

        if(cel.dataset.totalb11c0a14) {
            cel.classList.add(`${cel.dataset.totalb11c0a14}`);
            const totalB11C0a14 = document.querySelectorAll(`.${cel.dataset.totalb11c0a14}`);
            const totalB11C0a14Output = document.querySelector(`.${cel.dataset.totalb11c0a14output}`);
            this.totalizarCelulas(totalB11C0a14, totalB11C0a14Output);
        }

        if(cel.dataset.totalb11c15oumais) {
            cel.classList.add(`${cel.dataset.totalb11c15oumais}`);
            const totalB11C15ouMais = document.querySelectorAll(`.${cel.dataset.totalb11c15oumais}`);
            const totalB11C15ouMaisOutput = document.querySelector(`.${cel.dataset.totalb11c15oumaisoutput}`);
            this.totalizarCelulas(totalB11C15ouMais, totalB11C15ouMaisOutput);
        }

        if(cel.dataset.totalgeralb11) {
            cel.classList.add(`${cel.dataset.totalgeralb11}`);
            const totalGeralB11 = document.querySelectorAll(`.${cel.dataset.totalgeralb11}`);
            const totalGeralB11Output = document.querySelector(`.${cel.dataset.totalgeralb11output}`);
            this.totalizarCelulas(totalGeralB11, totalGeralB11Output);
        }

        if(cel.dataset.totalb11c10a19) {
            cel.classList.add(`${cel.dataset.totalb11c10a19}`);
            const totalB11C10a19 = document.querySelectorAll(`.${cel.dataset.totalb11c10a19}`);
            const totalB11C10a19Output = document.querySelector(`.${cel.dataset.totalb11c10a19output}`);
            this.totalizarCelulas(totalB11C10a19, totalB11C10a19Output);
        }

        // CÁLCULO DA LINHA B13   
        if(cel.dataset.b13) {
            this.calcularLinhaB13(cel);
        }  

        if(cel.parentElement.dataset.b13) {
            this.calcularLinhaB13(cel.parentElement)
        }   

        // Calcular B13 das readonlyCels
        const readonlyCels = document.querySelectorAll("div.inputs-container input[readonly]"); 
        for (const c of readonlyCels) {
            if(c.parentElement.dataset.b13) {
                this.calcularLinhaB13(c.parentElement);
            }
        }
    },

    totalizarCelulas(celulasPorTotalizar, celulaDeSaida) {
        let total = 0;
        for (const cel of celulasPorTotalizar) {
            total+=Number(cel.value);
        }
        celulaDeSaida.value = total;
    },

    calcularLinhaB13(eventTarget) {
        let arrayDeClasses = eventTarget.dataset.b13.split("-m-");
            // Elementos como [b4-c1, b12-c1, b9-c1]

            let celB4 = document.querySelector(`.${arrayDeClasses[0]}`),
            celB12 = document.querySelector(`.${arrayDeClasses[1]}`),
            celB9 = document.querySelector(`.${arrayDeClasses[2]}`),
            outputCel = document.querySelector(`.${eventTarget.dataset.b13output}`);

            if(celB4.value !== "" || celB12.value !=="" || celB9.value !== "" ) {
                outputCel.value = Number(celB4.value) + Number(celB12.value) - celB9.value;
            }
    }
}

function escutarEventos() {
    // TOTALIZACAO
    celulasDeTodasGrades.forEach( cel => {
        cel.addEventListener("input", () => totalizacao.filtrarCelulas(cel)); // T
        cel.value != "" && totalizacao.filtrarCelulas(cel); // No Load do Windows
    });
}

let celulasDeTodasGrades;
window.addEventListener("load", () => {
    celulasDeTodasGrades = document.querySelectorAll("div.inputs-container input");
    storage.salvarFicha();
    storage.salvarDadosAdicionais();
    storage.salvarDestaqueDeTotais();
    escutarEventos();
});