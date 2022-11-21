"use strict";const menu={destacarFundoDeTotais(){for(let e of readonlyCels)readonlyCelsDarker.checked?e.classList.add("bg-gray"):e.classList.remove("bg-gray")},esvaziamento(){let e=document.querySelector("div.caixa-de-confirmacao"),o=document.querySelectorAll("div.inputs-container input");return{mostrarCaixaDeConfirmacao(){let t=0;for(let a of o)""!=a.value&&t++;if(t>0)e.classList.add("on"),desfoqueDoFundo.on();else{let r=document.querySelector("div.caixa-de-alerta.ficha-vazia");r.classList.add("on"),desfoqueDoFundo.on()}},omitirCaixaDeConfirmacao(){e.classList.remove("on"),desfoqueDoFundo.off()},limparDados(){for(let e=0;e<o.length;e++)o[e].value="","undefined"!=typeof Storage&&localStorage.removeItem(`trmhiv-cel${e}`),inputValidation.adicionarOuRemoverFundoVermelho(o[e],"-"),inputValidation.resetFontSize(o[e]);let t=document.querySelectorAll("ul.limpadores-de-dados-adicionais input");t.forEach(e=>{if(e.checked){let o=e.dataset.for,t=document.querySelector(`#${o}`);t.value="","undefined"!=typeof Storage&&localStorage.removeItem(`trmhiv-${o}`),"nota"===o&&t.classList.remove("bold")}}),desfoqueDoFundo.off()}}},imprimirFicha(){""===textArea.value?textArea.parentElement.classList.add("no-print"):textArea.parentElement.classList.remove("no-print"),window.print()},abrirArtigoSobre(){document.querySelector("section#sobre").classList.add("on"),desfoqueDoFundo.on()},abrirArtigoCookies(){document.querySelector("section#cookies").classList.add("on"),desfoqueDoFundo.on(),window.innerWidth<1024&&document.querySelector("body").classList.add("overflow-hidden")},salvarComoPdf(){window.innerWidth<1024?this.imprimirFicha():(document.querySelector("section#conversao-pdf").classList.add("on"),desfoqueDoFundo.on())}},desfoqueDoFundo={on(){divDesfocante.classList.add("on")},off(){divDesfocante.classList.remove("on")}};let readonlyCelsDarker,readonlyCels,textArea,divDesfocante;function init(){readonlyCelsDarker=document.querySelector("#readonlyinputs-darker"),readonlyCels=document.querySelectorAll("input[readonly]"),textArea=document.querySelector("textarea#nota"),divDesfocante=document.querySelector("div.desfoque")}function eventListeners(){readonlyCelsDarker.addEventListener("change",()=>menu.destacarFundoDeTotais());let e=document.querySelectorAll("div.caixa-de-alerta button");for(let o of e)o.addEventListener("click",()=>{o.parentElement.classList.remove("on"),desfoqueDoFundo.off()});readonlyCels.forEach(e=>{e.addEventListener("click",()=>{if(e.matches(".nao-aplicavel")){let o=document.querySelector("div.caixa-de-alerta.indicador-nao-aplicavel"),t=o.querySelector("span.sexo-output");o.classList.add("on"),e.parentElement.matches(".sexo-m")?t.textContent="masculino":t.textContent="feminino"}else document.querySelector("div.caixa-de-alerta.restricao-de-acesso-celular").classList.add("on");desfoqueDoFundo.on()})});let t=document.querySelector("button.esvaziar-ficha");t.addEventListener("click",()=>menu.esvaziamento().mostrarCaixaDeConfirmacao());let a=document.querySelector("button.cancelar");a.addEventListener("click",()=>menu.esvaziamento().omitirCaixaDeConfirmacao());let r=document.querySelector("button.confirmar");r.addEventListener("click",()=>{menu.esvaziamento().limparDados(),menu.esvaziamento().omitirCaixaDeConfirmacao()});let i=document.querySelector("button.imprimir");i.addEventListener("click",()=>menu.imprimirFicha());let n=document.querySelector("button.abrir-artigo-sobre");n.addEventListener("click",()=>menu.abrirArtigoSobre()),"#sobre"===location.hash&&menu.abrirArtigoSobre();let s=document.querySelector("button.abrir-artigo-cookies");s.addEventListener("click",()=>menu.abrirArtigoCookies());let l=document.querySelectorAll("button.fechar-artigo");l.forEach(e=>{e.addEventListener("click",()=>{e.parentElement.classList.remove("on"),desfoqueDoFundo.off(),document.querySelector("body").classList.remove("overflow-hidden")})});let d=document.querySelector("section#cookies"),c=d.querySelector("h1"),u=d.querySelector("button.fechar-artigo");d.addEventListener("scroll",()=>{c.getBoundingClientRect().top<=0?(c.classList.add("sticky"),u.classList.add("with-h1-sticky")):(c.classList.remove("sticky"),u.classList.remove("with-h1-sticky"))}),document.querySelector("button.salvar-como-pdf").addEventListener("click",()=>menu.salvarComoPdf());let m={title:"Totalizador de Resumo Mensal de HIV/SIDA",text:"O Totalizador de Resumo Mensal de HIV/SIDA \xe9 um servi\xe7o online gratuito que auxilia na elabora\xe7\xe3o do resumo mensal de HIV/SIDA totalizando-o automaticamente com base nos dados preenchidos pelo usu\xe1rio (Profissional de Sa\xfade).",url:"https://www.quinamine.github.io/totalizador-de-resumo-mensal-de-hiv-e-sida/index.html"},f=document.querySelector("button.partilhar");f.addEventListener("click",()=>{try{navigator.share(m).then(()=>{console.log("Endere\xe7o do totalizador partilhado com sucesso.")}).catch(e=>{console.log(`N\xe3o foi poss\xedvel partilhar devido ao erro: ${e}.`)})}catch(e){console.log("O seu navegador n\xe3o tem suporte ao m\xe9todo 'navigator.share()'.")}})}window.addEventListener("keyup",e=>{if("enter"===e.key.toLowerCase()){let o=document.querySelectorAll("div.caixa-de-alerta");o.forEach(e=>{e.matches(".on")&&(e.classList.remove("on"),desfoqueDoFundo.off())})}}),window.addEventListener("load",()=>{init(),eventListeners()});