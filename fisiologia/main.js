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

        if(input.dataset.b11) {
            input.classList.add(`${input.dataset.b11}`);
            const b11 = document.querySelectorAll(`.${input.dataset.b11}`);
            const b11output = document.querySelector(`.${input.dataset.b11output}`);
            b11output.value = this.somar(b11);
        }

        if(input.dataset.b11subtotal) {
            input.classList.add(`${input.dataset.b11subtotal}`);
            const b11Subtotal = document.querySelectorAll(`.${input.dataset.b11subtotal}`);
            const b11SubtotalOutput = document.querySelector(`.${input.dataset.b11subtotaloutput}`);
            b11SubtotalOutput.value = this.somar(b11Subtotal);
        }

        if(input.dataset.b11totalgeral) {
            input.classList.add(`${input.dataset.b11totalgeral}`);
            const b11TotalGeral = document.querySelectorAll(`.${input.dataset.b11totalgeral}`);
            const b11TotalGeralOutput = document.querySelector(`.${input.dataset.b11totalgeraloutput}`);
            b11TotalGeralOutput.value = this.somar(b11TotalGeral);
        }

        if(input.dataset.b11totalteen) {
            input.classList.add(`${input.dataset.b11totalteen}`);
            const b11TotalTeen = document.querySelectorAll(`.${input.dataset.b11totalteen}`);
            const b11TotalTeenOutput = document.querySelector(`.${input.dataset.b11totalteenoutput}`);
            b11TotalTeenOutput.value = this.somar(b11TotalTeen);
        }


        if(input.dataset.b13) {
            let b12maisB4menosB9 = input.dataset.b13;
            const b13Output = document.querySelector(`.${input.dataset.b13output}`);
            b13Output.value = this.calcularLinhaB13(b12maisB4menosB9);

            // Calcular Subtotal B13
            b12maisB4menosB9 = input.dataset.b13subtotal;
            const b13SubtotalOutput = document.querySelector(`.${input.dataset.b13subtotaloutput}`);
            b13SubtotalOutput.value = this.calcularLinhaB13(b12maisB4menosB9);

            // Calcular Total Geral B13
            b12maisB4menosB9 = input.dataset.b13totalgeral;
            let b13TotalgeralOutput = document.querySelector(`.${input.dataset.b13totalgeraloutput}`);
            b13TotalgeralOutput.value = this.calcularLinhaB13(b12maisB4menosB9);
        }

        if(input.dataset.b13totalteen) {
            // Calcular Total Teen B13
            let b12maisB4menosB9 = input.dataset.b13totalteen;
            let b13TotalTeenOutput = document.querySelector(`.${input.dataset.b13totalteenoutput}`);
            b13TotalTeenOutput.value = this.calcularLinhaB13(b12maisB4menosB9);
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




