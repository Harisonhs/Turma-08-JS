let contAtivLogado = sessionStorage.getItem("contAtivLogado")
let logado = JSON.parse(contAtivLogado)

if (logado !== true) {
    window.location = "login.html"
}

let btnLogout = document.querySelector("#BtnLogout")
btnLogout.addEventListener("click", () => {
    sessionStorage.setItem("contAtivLogado", false)
    window.location = "login.html"
})

function obtemValor() {
    let inicio = document.querySelector("#inicio").value
    let fim = document.querySelector("#fim").value
    let atividade = document.querySelector("#atividade").value
    console.table({ inicio, fim, atividade })
    if (verificaValidade(inicio) &&
        verificaValidade(fim) &&
        verificaValidade(atividade)) {
        let obj = {
            inicio,
            fim,
            atividade,
            "minutos": calculaTempo(fim, inicio)
        }
        return obj
    }
    else {
        return null
    }
}

const verificaValidade = function (campo) {
    if (campo === '') {
        alert("Informe todos os campos")
        return false
    } else {
        return true
    }
}

let atividades = obtemAtividadesStorage("atividades")
let historico = obtemAtividadesStorage("historico")
inicializaDOM(atividades, "#listaAtividades")
inicializaDOM(historico, "#atividadesConfirmadas")

function inicializaDOM(lista, idTabDOM) {
    if (lista.length > 0) {
        for (let atividade of lista) {
            insereNoDOM(atividade, idTabDOM)
        }
    }
}

function atualizaAtividadesStorage() {
    localStorage.setItem("atividades", JSON.stringify(atividades))
    localStorage.setItem("historico", JSON.stringify(historico))
}

function obtemAtividadesStorage(chave) {
    let aux = localStorage.getItem(chave)
    if (aux) {
        return JSON.parse(aux)
    } else {
        return Array()
    }
}

const evtSubmit = (evento) => {
    evento.preventDefault()
    let obj = obtemValor()
    if (obj) {
        formulario.reset()
        if (insereNaLista(atividades, obj)) {
            insereNoDOM(obj, "#listaAtividades")
        }
    }
}

let formulario = document.querySelector("form")
formulario.addEventListener("submit", evtSubmit)

function calculaTempo(fim, inicio) {
    let vetorFim = fim.split(':')
    let vetorInicio = inicio.split(':')
    let fimMinutos = parseInt(vetorFim[0]) * 60 + parseInt(vetorFim[1])
    let inicioMinutos = parseInt(vetorInicio[0]) * 60 + parseInt(vetorInicio[1])
    let tempo = fimMinutos - inicioMinutos
    return tempo
}

function sãoIguais(obj, obj2) {
    return obj.inicio === obj2.inicio &&
        obj.fim === obj2.fim &&
        obj.atividade === obj2.atividade
}

function removeDaLista(obj, lista) {
    let idx = lista.findIndex(item => sãoIguais(item, obj))
    if (idx > -1) {
        lista.splice(idx, 1)
        atualizaAtividadesStorage()
    }
}

function insereNoDOM(obj, idTabDOM) {
    let tabela = document.querySelector(idTabDOM)
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
    tdAcoes.appendChild(btnExcluir)
    btnExcluir.innerHTML = "X"

    btnExcluir.addEventListener("click", (evento) => {
        let target = evento.target
        let linhaTarget = target.parentNode //td
                                .parentNode //tr
        tabela.removeChild(linhaTarget)
        removeDaLista(obj, atividades)

    })

    if (idTabDOM !== "#atividadesConfirmadas") {
        let btnArquivar = document.createElement("button")
        btnArquivar.innerHTML = "OK"
        tdAcoes.appendChild(btnArquivar)

        btnArquivar.addEventListener("click", (evento) => {
            let target = evento.target
            let linhaTarget = target.parentNode.parentNode
            tabela.removeChild(linhaTarget)
            removeDaLista(obj, atividades)
            insereNaLista(historico, obj)
            insereNoDOM(obj, "#atividadesConfirmadas")

        })
    }

    tdInicio.innerHTML = obj.inicio
    tdFim.innerHTML = obj.fim
    tdMinutos.innerHTML = obj.minutos
    tdAtividades.innerHTML = obj.atividade
}

function insereNaLista(lista, obj) {
    let existe = false
    for (let item of lista) {
        if (sãoIguais(item, obj)) {
            existe = true
            break
        }
    }
    if (!existe) {
        lista.unshift(obj)
        lista.splice(4, 1)
        atualizaAtividadesStorage()
        return true
    } else {
        alert("Atividade já cadastrada previamente")
        return false
    }

}