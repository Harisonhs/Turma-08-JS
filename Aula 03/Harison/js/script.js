const formulario = document.querySelector("#formulario")
const listaAtividades = Array()

formulario.addEventListener('submit', function (evt) {
    evt.preventDefault()
    const inicio = document.getElementById("inicio").value
    const fim = document.getElementById("fim").value
    const atividade = document.getElementById("atividade").value
    let obj = {
        inicio,
        fim,
        atividade
    }
    if (valida(obj)) {
        obj.duracao = tempoDaAtividade(obj)
        if (insereEmLista(obj)) {
            insereNoDOM(obj)
        }
        formulario.reset()
        document.getElementById("inicio").focus()
    }
})

function insereEmLista(obj) {
    let previamenteCadastrado = listaAtividades.filter((item) => {
        if(iguais(item, obj)){
            return item
        }
    })
    if (previamenteCadastrado.length == 0) {
        listaAtividades.push(obj)
        return true
    } else {
        alert('Atividade já cadastrada')
        return false
    }
}

function insereNoDOM(obj) {
    const tabela = document.querySelector("#listaAtividades")
    let linha = document.createElement('tr')
    let tdInicio = document.createElement('td')
    let tdFim = document.createElement('td')
    let tdMinutos = document.createElement('td')
    let tdAtividade = document.createElement('td')
    let tdAcoes = document.createElement('td')
    let btnExcluir = document.createElement('button')


    tdInicio.innerHTML = obj.inicio
    tdFim.innerHTML = obj.fim
    tdMinutos.innerHTML = obj.duracao
    tdAtividade.innerHTML = obj.atividade
    btnExcluir.innerHTML = "x"
    btnExcluir.addEventListener('click', (btn) => {
        clickExcluir(obj, btn.target)
    })

    tdAcoes.appendChild(btnExcluir)

    linha.appendChild(tdInicio)
    linha.appendChild(tdFim)
    linha.appendChild(tdMinutos)
    linha.appendChild(tdAtividade)
    linha.appendChild(tdAcoes)

    tabela.appendChild(linha)
}

// Verifica se a entrada é valida
function entradaValida(entrada, nomeCampo) {
    if (entrada == '') {
        alert("Preencha o campo " + nomeCampo)
        return false
    } else {
        return true
    }
}

function valida(obj) {
    return entradaValida(obj.inicio, "inicio")
        && entradaValida(obj.fim, "fim")
        && entradaValida(obj.atividade, "atividade")
}

const calculaMinutos = (hora) => {
    let aux = hora.split(':')
    let hr = parseInt(aux[0])
    let min = parseInt(aux[1])
    return (hr * 60) + min
}

const tempoDaAtividade = (obj) => {
    let inicioEmMinutos = calculaMinutos(obj.inicio)
    let fimEmMinutos = calculaMinutos(obj.fim)
    return fimEmMinutos - inicioEmMinutos
}


const iguais = (obj1, obj2) => {
    return obj1.inicio === obj2.inicio &&
        obj1.fim === obj2.fim &&
        obj1.duracao === obj2.duracao &&
        obj1.atividade === obj2.atividade
}

const clickExcluir = (obj, botao) => {
    removeDaLista(listaAtividades, obj)
    const tabelaAtividades = document.querySelector("#listaAtividades")
    removeDaTabelaDOM(botao, tabelaAtividades)
}

const removeDaLista = (lista, obj) => {
    let index = lista.indexOf(obj)
    if (index >= 0) {
        lista.splice(index, 1)
    }
}

const removeDaTabelaDOM = (botao, tabela) => {
    let tdAcao = botao.parentNode
    let trSelecionada = tdAcao.parentNode
    tabela.removeChild(trSelecionada)
}