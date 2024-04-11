"use strict"

const backup = {
    saveGridInputs() {
        const gridInputs = document.querySelectorAll("[data-totalgeraleixox]");

        for (let i = 0; i < gridInputs.length; i++) {
            
            gridInputs[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, gridInputs[i].value);
            });
            gridInputs[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
        
    },
    
    saveExtraInputs() {
        const extraInputs = document.querySelectorAll(".input-adicional");
        extraInputs.forEach( input => {
            input.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${input.id}`, input.value));
            input.value = localStorage.getItem(`${keyPrefix}-${input.id}`);
        });
    }
}

const totalizador = {
    filtrarCelulas(input) {
        input.classList.add(`${input.dataset.subtotaleixox}`);
        input.classList.add(`${input.dataset.totalgeraleixox}`);

        // Subtotal eixo x
        const subtotalEixox = document.querySelectorAll(`.${input.dataset.subtotaleixox}`);
        const subtotalEixoxoutput = document.querySelector(`.${input.dataset.subtotaleixoxoutput}`);
        subtotalEixoxoutput.value = this.somar(subtotalEixox);     
    
        // Total Geral 
        const totalGeralEixox = document.querySelectorAll(`.${input.dataset.totalgeraleixox}`);
        const totalGeralEixoxoutput = document.querySelector(`.${input.dataset.totalgeraleixoxoutput}`);
        totalGeralEixoxoutput.value = this.somar(totalGeralEixox);

        if(input.dataset.subtotaleixoy) {
            input.classList.add(`${input.dataset.subtotaleixoy}`);
            const subtotalEixoy = document.querySelectorAll(`.${input.dataset.subtotaleixoy}`);
            const subtotalEixoyOutput = document.querySelector(`.${input.dataset.subtotaleixoyoutput}`);
            subtotalEixoyOutput.value = this.somar(subtotalEixoy);
        }
    
        if(input.dataset.totalteeneixoy) {
            input.classList.add(`${input.dataset.totalteeneixoy}`);
            const totalTeenEixoy = document.querySelectorAll(`.${input.dataset.totalteeneixoy}`);
            const totalTeenEixoyOutput = document.querySelector(`.${input.dataset.totalteeneixoyoutput}`);
            totalTeenEixoyOutput.value = this.somar(totalTeenEixoy);
        }
    
        if(input.dataset.totalgeraleixoy) {
            input.classList.add(`${input.dataset.totalgeraleixoy}`);
            const totalGeralEixoy = document.querySelectorAll(`.${input.dataset.totalgeraleixoy}`);
            const totalGeralEixoyOutput = document.querySelector(`.${input.dataset.totalgeraleixoyoutput}`);
            totalGeralEixoyOutput.value = this.somar(totalGeralEixoy);
        }
    
        if(input.dataset.totaleixoy) {
            input.classList.add(`${input.dataset.totaleixoy}`);
            const totalEixoy = document.querySelectorAll(`.${input.dataset.totaleixoy}`);
            const totalEixoyOutput = document.querySelector(`.${input.dataset.totaleixoyoutput}`);
            totalEixoyOutput.value = this.somar(totalEixoy);
        }

        if(input.dataset.totalteeneixox) {
            input.classList.add(`${input.dataset.totalteeneixox}`);
            const totalTeenEixox = document.querySelectorAll(`.${input.dataset.totalteeneixox}`);
            const totalTeenEixoxoutput = document.querySelector(`.${input.dataset.totalteeneixoxoutput}`);
            totalTeenEixoxoutput.value = this.somar(totalTeenEixox);
        }
    },
    
    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    }
}


function escutarEventos() {
    const gridInputs = document.querySelectorAll("[data-totalgeraleixox]");
    gridInputs.forEach( gi => {
        gi.addEventListener("input", () => totalizador.filtrarCelulas(gi));
        gi.value !== "" && totalizador.filtrarCelulas(gi);
    });
}

window.addEventListener("load", () => {
    backup.saveGridInputs();
    backup.saveExtraInputs();
    escutarEventos();    
});




