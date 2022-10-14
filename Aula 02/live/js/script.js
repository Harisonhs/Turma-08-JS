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

function calculadora(a, b, fn){
    console.log(fn(a, b))
}

function soma(x, y){
    return x + y
}

function sub(x, y){
    return x - y
}

calculadora(2, 3, soma)
calculadora(2, 3, sub)
calculadora(2, 3, (x, y) => { return x * y; })

let array = [1, 2, 3, 4, 5]
let novoVetor = array.filter(fn1)
console.log(novoVetor)

function obtemValor(){
    let inicio = document.querySelector("#inicio").value
    let fim = document.querySelector("#fim").value
    let atividade = document.querySelector("#atividade").value
    console.table({inicio, fim, atividade})
    if(verificaValidade(inicio) && 
            verificaValidade(fim) &&
            verificaValidade(atividade)){

                return {inicio, fim, atividade}
            }
}

let atividades = Array()

let formulario = document.querySelector("form")
formulario.addEventListener("submit", (evento)=>{
    evento.preventDefault()
    let obj = obtemValor()
    let inicio = formulario.querySelector("#inicio").value
    console.log({inicio})
    formulario.reset()
    atividades.push(obj)
    console.log(atividades)
    console.log(atividades[0].inicio)
})

function percorreLista(lista)
{

}