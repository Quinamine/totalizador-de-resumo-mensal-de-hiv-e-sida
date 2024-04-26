"use strict"

const backup = {
    saveGridInputs() {
        const gridInputs = document.querySelectorAll("[data-totalgeraleixox], .grid-extra__input");

        for (let i = 0; i < gridInputs.length; i++) {
            
            gridInputs[i].addEventListener("input", () => {
                localStorage.setItem(`${keyPrefix}-input${i}`, gridInputs[i].value);
            });
            gridInputs[i].value = localStorage.getItem(`${keyPrefix}-input${i}`);
        }
        
    },
    
    saveExtraInputs() {
        const extraInputs = document.querySelectorAll(".input-nao-celular");
        extraInputs.forEach( extraInput => {
            extraInput.addEventListener("input", () => localStorage.setItem(`${keyPrefix}-${extraInput.id}`, extraInput.value));
            extraInput.value = localStorage.getItem(`${keyPrefix}-${extraInput.id}`);
        });
    }
}

const totalizador = {
    filtrarCelulas(inputTarget) {
        inputTarget.classList.add(`${inputTarget.dataset.subtotaleixox}`);
        inputTarget.classList.add(`${inputTarget.dataset.totalgeraleixox}`);

        // Subtotal eixo x
        const subtotalEixox = document.querySelectorAll(`.${inputTarget.dataset.subtotaleixox}`);
        const subtotalEixoxOutput = document.querySelector(`.${inputTarget.dataset.subtotaleixoxoutput}`);
        subtotalEixoxOutput.value = this.somar(subtotalEixox);     
    
        // Total Geral 
        const totalGeralEixox = document.querySelectorAll(`.${inputTarget.dataset.totalgeraleixox}`);
        const totalGeralEixoxOutput = document.querySelector(`.${inputTarget.dataset.totalgeraleixoxoutput}`);
        totalGeralEixoxOutput.value = this.somar(totalGeralEixox);

        if(inputTarget.dataset.subtotaleixoy) {
            inputTarget.classList.add(`${inputTarget.dataset.subtotaleixoy}`);
            const subtotalEixoy = document.querySelectorAll(`.${inputTarget.dataset.subtotaleixoy}`);
            const subtotalEixoyOutput = document.querySelector(`.${inputTarget.dataset.subtotaleixoyoutput}`);
            subtotalEixoyOutput.value = this.somar(subtotalEixoy);
        }
    
        if(inputTarget.dataset.totalteenseixoy) {
            inputTarget.classList.add(`${inputTarget.dataset.totalteenseixoy}`);
            const totalTeensEixoy = document.querySelectorAll(`.${inputTarget.dataset.totalteenseixoy}`);
            const totalTeensEixoyOutput = document.querySelector(`.${inputTarget.dataset.totalteenseixoyoutput}`);
            totalTeensEixoyOutput.value = this.somar(totalTeensEixoy);
        }
    
        if(inputTarget.dataset.totalgeraleixoy) {
            inputTarget.classList.add(`${inputTarget.dataset.totalgeraleixoy}`);
            const totalGeralEixoy = document.querySelectorAll(`.${inputTarget.dataset.totalgeraleixoy}`);
            const totalGeralEixoyOutput = document.querySelector(`.${inputTarget.dataset.totalgeraleixoyoutput}`);
            totalGeralEixoyOutput.value = this.somar(totalGeralEixoy);
        }
    
        if(inputTarget.dataset.totaleixoy) {
            inputTarget.classList.add(`${inputTarget.dataset.totaleixoy}`);
            const totalEixoy = document.querySelectorAll(`.${inputTarget.dataset.totaleixoy}`);
            const totalEixoyOutput = document.querySelector(`.${inputTarget.dataset.totaleixoyoutput}`);
            totalEixoyOutput.value = this.somar(totalEixoy);
        }

        if(inputTarget.dataset.totalteenseixox) {
            inputTarget.classList.add(`${inputTarget.dataset.totalteenseixox}`);
            const totalTeensEixox = document.querySelectorAll(`.${inputTarget.dataset.totalteenseixox}`);
            const totalTeensEixoxoutput = document.querySelector(`.${inputTarget.dataset.totalteenseixoxoutput}`);
            totalTeensEixoxoutput.value = this.somar(totalTeensEixox);
        }

        if(inputTarget.dataset.b11) {
            inputTarget.classList.add(`${inputTarget.dataset.b11}`);
            const b11 = document.querySelectorAll(`.${inputTarget.dataset.b11}`);
            const b11Output = document.querySelector(`.${inputTarget.dataset.b11output}`);
            b11Output.value = this.somar(b11);
        }

        if(inputTarget.dataset.b11subtotal) {
            inputTarget.classList.add(`${inputTarget.dataset.b11subtotal}`);
            const b11Subtotal = document.querySelectorAll(`.${inputTarget.dataset.b11subtotal}`);
            const b11SubtotalOutput = document.querySelector(`.${inputTarget.dataset.b11subtotaloutput}`);
            b11SubtotalOutput.value = this.somar(b11Subtotal);
        }

        if(inputTarget.dataset.b11totalgeral) {
            inputTarget.classList.add(`${inputTarget.dataset.b11totalgeral}`);
            const b11TotalGeral = document.querySelectorAll(`.${inputTarget.dataset.b11totalgeral}`);
            const b11TotalGeralOutput = document.querySelector(`.${inputTarget.dataset.b11totalgeraloutput}`);
            b11TotalGeralOutput.value = this.somar(b11TotalGeral);
        }

        if(inputTarget.dataset.b11totalteens) {
            inputTarget.classList.add(`${inputTarget.dataset.b11totalteens}`);
            const b11TotalTeens = document.querySelectorAll(`.${inputTarget.dataset.b11totalteens}`);
            const b11TotalTeensOutput = document.querySelector(`.${inputTarget.dataset.b11totalteensoutput}`);
            b11TotalTeensOutput.value = this.somar(b11TotalTeens);
        }


        if(inputTarget.dataset.b13) {
            let b12maisB4menosB9 = inputTarget.dataset.b13;
            const b13Output = document.querySelector(`.${inputTarget.dataset.b13output}`);
            b13Output.value = this.calcularLinhaB13(b12maisB4menosB9);

            // Calcular Subtotal B13
            b12maisB4menosB9 = inputTarget.dataset.b13subtotal;
            const b13SubtotalOutput = document.querySelector(`.${inputTarget.dataset.b13subtotaloutput}`);
            b13SubtotalOutput.value = this.calcularLinhaB13(b12maisB4menosB9);

            // Calcular Total Geral B13
            b12maisB4menosB9 = inputTarget.dataset.b13totalgeral;
            let b13TotalgeralOutput = document.querySelector(`.${inputTarget.dataset.b13totalgeraloutput}`);
            b13TotalgeralOutput.value = this.calcularLinhaB13(b12maisB4menosB9);
        }

        if(inputTarget.dataset.b13totalteens) {
            // Calcular Total Teen B13
            let b12maisB4menosB9 = inputTarget.dataset.b13totalteens;
            let b13TotalTeensOutput = document.querySelector(`.${inputTarget.dataset.b13totalteensoutput}`);
            b13TotalTeensOutput.value = this.calcularLinhaB13(b12maisB4menosB9);
        }
    },
    
    somar(celulasPorTotalizar) {
        let soma = 0;
        for(const c of celulasPorTotalizar) {
            soma += Number(c.value);
        }
        return soma;
    },

    calcularLinhaB13(b12maisB4menosB9) {
        let b4menosB9 = b12maisB4menosB9.split("+")[1];
        let b4Class = b4menosB9.split("-menos-")[0];
        let b9Class = b4menosB9.split("-menos-")[1];
        let b12Class = b12maisB4menosB9.split("+")[0];

        let b4 = document.querySelector(`.${b4Class}`);
        let b9 = document.querySelector(`.${b9Class}`);
        let b12 = document.querySelector(`.${b12Class}`);

        let b13 = Number(b4.value) + Number(b12.value) - Number(b9.value);
        return b13;
       
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




