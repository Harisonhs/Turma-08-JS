let contAtivLogado = sessionStorage.getItem("contAtivLogado")
let logado = JSON.parse(contAtivLogado)

if(logado !== true){
    window.location = "login.html"
}

let btnLogout = document.querySelector("#BtnLogout")
btnLogout.addEventListener("click", ()=>{
    sessionStorage.setItem("contAtivLogado", false)
    window.location = "login.html"
})

function obtemValor(){
    let inicio = document.querySelector("#inicio").value
    let fim = document.querySelector("#fim").value
    let atividade = document.querySelector("#atividade").value
    console.table({inicio, fim, atividade})
    if(verificaValidade(inicio) && 
            verificaValidade(fim) &&
            verificaValidade(atividade)){                
                let obj = {
                    inicio, 
                    fim, 
                    atividade,
                    "minutos": calculaTempo(fim, inicio)
                }
                return obj
            }
}

const verificaValidade = function (campo){
    if(campo === ''){
        alert("Informe todos os campos")
        return false
    }else{
        return true
    }
}

let atividades = obtemAtividadesStorage()
inicializaDOM()

function inicializaDOM(){
    if(atividades.length > 0){
        for(let atividade of atividades){
            insereNoDOM(atividade)
        }
    }
}

function atualizaAtividadesStorage(){
    localStorage.setItem("atividades", JSON.stringify(atividades))
}

function obtemAtividadesStorage(){
    let aux = localStorage.getItem("atividades")
    if(aux){
        return JSON.parse(aux)
    }else{
        return Array()
    }
}

let formulario = document.querySelector("form")
formulario.addEventListener("submit", (evento)=>{
    evento.preventDefault()
    let obj = obtemValor()
    formulario.reset()
    if(insereNaLista(atividades, obj)){
        insereNoDOM(obj)
    }
})

function calculaTempo(fim, inicio){
    let vetorFim = fim.split(':')
    let vetorInicio = inicio.split(':')
    let fimMinutos = parseInt(vetorFim[0]) * 60 + parseInt(vetorFim[1])
    let inicioMinutos = parseInt(vetorInicio[0]) * 60 + parseInt(vetorInicio[1])
    let tempo = fimMinutos - inicioMinutos
    return tempo
}

function sãoIguais(obj, obj2){
    return obj.inicio === obj2.inicio &&
            obj.fim === obj2.fim &&
            obj.atividade === obj2.atividade
}

function removeDaLista(obj){
    let idx = atividades.findIndex(item => sãoIguais(item, obj))
    if(idx > -1){
        atividades.splice(idx, 1)
        atualizaAtividadesStorage()
    }
}

function insereNoDOM(obj){
    let tabela = document.querySelector("#listaAtividades")
    let linha = document.createElement("tr")
    let tdInicio = document.createElement("td")
    let tdFim = document.createElement("td")
    let tdMinutos = document.createElement("td")
    let tdAtividades = document.createElement("td")
    let tdAcoes = document.createElement("td")
    tabela.appendChild(linha)
    linha.appendChild(tdInicio)
    linha.appendChild(tdFim)
    linha.appendChild(tdMinutos)
    linha.appendChild(tdAtividades)
    linha.appendChild(tdAcoes)

    let btnExcluir = document.createElement("button")
    let btnArquivar = document.createElement("button")
    tdAcoes.appendChild(btnExcluir)
    tdAcoes.appendChild(btnArquivar)

    btnExcluir.innerHTML = "X"
    btnArquivar.innerHTML = "OK"

    btnExcluir.addEventListener("click", (evento)=>{
        let target = evento.target
        let linhaTarget = target.parentNode.parentNode
        tabela.removeChild(linhaTarget)
        removeDaLista(obj)
        
    })

    btnArquivar.addEventListener("click", (evento) => {
        let target = evento.target
        let linhaTarget = target.parentNode.parentNode
        tabela.removeChild(linhaTarget)
    })

    tdInicio.innerHTML = obj.inicio
    tdFim.innerHTML = obj.fim
    tdMinutos.innerHTML = obj.minutos
    tdAtividades.innerHTML = obj.atividade
}

function insereNaLista(lista, obj)
{
    let existe = false
    for(let item of lista){
        if(sãoIguais(item, obj)){
            existe = true
            break
        }
    }
    if(!existe){
        lista.push(obj)
        atualizaAtividadesStorage()
        return true
    }else{
        alert("Atividade já cadastrada previamente")
        return false
    }

}