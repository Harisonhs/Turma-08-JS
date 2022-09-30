
const formulario = document.querySelector("#form01")
let listaAtividades = Array()

//explicação de callback
function calcula(a, b, fn){
    let calculado = fn(a, b)
    return calculado
}

function soma(num1, num2){
    return num1 + num2
}

function subtrai(num1, num2){
    return num1 - num2
}

function multiplica(a, b){
    return a * b
}

let teste1 = calcula(1, 2, soma)
console.log(`teste1 = ${teste1}`)

let teste2 = calcula(5, 1, subtrai)
console.log(`teste2 = ${teste2}`)

let teste3 = calcula(6, 2, multiplica)
console.log(`teste3 = ${teste3}`)



formulario.addEventListener('submit', function(evt){
    evt.preventDefault()
    if(valida(formulario)) {
        adicionaEmLista(listaAtividades, formulario)
        console.log({listaAtividades})
        exibeNaTela(listaAtividades[0])
    }
        
})

function valida(meuForm){
    const inicio = meuForm.querySelector("#inicio").value
    const fim = meuForm.querySelector("#fim").value
    const atividade = meuForm.querySelector("#atividade").value
    if(inicio == ''){
        alert('Preencha o início')
        return false
    }
    if(fim == ''){
        alert('Preencha o fim')
        return false
    }
    if(atividade == ''){
        alert('Preencha a atividade')
        return false
    }
    return true
}

const adicionaEmLista = (lista, meuForm) => {
    const inicio = meuForm.querySelector("#inicio").value
    const fim = meuForm.querySelector("#fim").value
    const atividade = meuForm.querySelector("#atividade").value
    let obj = {
        "inicio": inicio,
        "fim": fim,
        "atividade": atividade
    }
    lista.push(obj)
}

const exibeNaTela = (obj) => {
    let span = document.createElement('span')
    span.innerText = "Início: " + obj.inicio + ". Fim: " + obj.fim + 
                    ". Atividade: " + obj.atividade

    document.body.appendChild(span)
}
