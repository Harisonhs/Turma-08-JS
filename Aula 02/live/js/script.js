const verificaValidade = function (campo){
    console.log(`campo = ${campo}`)
    if(campo === ''){
        alert("Informe todos os campos")
        return false
    }else{
        return true
    }
}

const fn1 = (item)=>{
    return item > 2
}

let array = [1, 2, 3, 4, 5]
let novoVetor = array.filter(fn1)
console.log(novoVetor)

function obtemValor(){
    let inicio = document.querySelector("#inicio").value
    let fim = document.querySelector("#fim").value
    let atividade = document.querySelector("#atividade").value
    console.table({inicio, fim, atividade})
    verificaValidade(inicio)
    verificaValidade(fim)
    verificaValidade(atividade)
}
