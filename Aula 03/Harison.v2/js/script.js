const formulario = document.querySelector("#formulario")
const exemplo = document.querySelector("#exemplo")

const listaAtividades = Array()

formulario.addEventListener('submit', function (evt) {
    evt.preventDefault()
    const inicio = document.getElementById("inicio").value
    const fim = document.getElementById("fim").value
    const atividade = document.getElementById("atividade").value
    let minutos = calculaTempo(inicio, fim)
    let obj = {
        inicio,
        fim,
        atividade,
        minutos
    }
    if (valida(obj)) {
        if (insereEmLista(obj, listaAtividades)) {
            insereNoDOM(obj)
            formulario.reset()
            document.querySelector("#inicio").focus()
        } else {
            alert('Atividade já cadastrada')
        }
    }
})

const calculaMinutos = (vetorHoras) => {
    return (parseInt(vetorHoras[0]) * 60) + parseInt(vetorHoras[1])
}

const calculaTempo = (inicio, fim) => {
    let t1 = inicio.split(':')
    let t2 = fim.split(':')
    let diff = calculaMinutos(t2) - calculaMinutos(t1)
    return diff
}

const iguais = (obj1, obj2) => {
    let atividade = obj1.atividade === obj2.atividade
    let inicio = obj1.inicio === obj2.inicio
    let fim = obj1.fim === obj2.fim
    return atividade && inicio && fim
}

function insereEmLista(obj, lista) {
    let idx = lista.filter((item) => {
        if (iguais(item, obj)) {
            return item
        }
    })
    if (idx.length == 0) {
        lista.push(obj)
        return true
    }
    return false
}

function excluirDaLista(obj, lista) {
    let idx = lista.indexOf(obj)
    if (idx < 0) {
        console.log('O objeto não foi encontrado na lista. ', obj)
    } else {
        lista.splice(idx, 1)
    }
}

function excluirDoDOM(botao, ID_tabela) {
    const tabela = document.querySelector("#" + ID_tabela)
    let td = botao.parentNode
    let linha = td.parentNode
    tabela.removeChild(linha)
}

function insereNoDOM(obj) {
    const tabela = document.querySelector('#listaAtividades')

    let linha = document.createElement('tr')
    let inicio = document.createElement('td')
    let fim = document.createElement('td')
    let minutos = document.createElement('td')
    let atividade = document.createElement('td')
    let acoes = document.createElement('td')

    let btnExcluir = document.createElement('button')
    btnExcluir.innerHTML = 'X'
    btnExcluir.addEventListener('click', (evt) => {
        excluirDaLista(obj, listaAtividades)
        excluirDoDOM(evt.target, "listaAtividades")
    })

    acoes.appendChild(btnExcluir)
    linha.appendChild(inicio)
    linha.appendChild(fim)
    linha.appendChild(minutos)
    linha.appendChild(atividade)
    linha.appendChild(acoes)

    inicio.innerHTML = obj.inicio
    fim.innerHTML = obj.fim
    minutos.innerHTML = obj.minutos
    atividade.innerHTML = obj.atividade

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
    let retorno = entradaValida(obj.inicio, "inicio")
        && entradaValida(obj.fim, "fim")
        && entradaValida(obj.atividade, "atividade")
    return retorno
}