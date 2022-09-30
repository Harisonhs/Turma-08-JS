
const formulario = document.querySelector("#form01")
let listaAtividades = Array()

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
