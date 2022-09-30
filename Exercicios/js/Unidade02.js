// Exercicio 01
let btnTabuada = document.getElementById("btnTabuada")

const tabuada = function (){
    let res
    for(let i =0; i<=10; i++){
        res=8*i
        console.log("8 * "+i+" = "+res)
    }
}

btnTabuada.addEventListener("click",tabuada)
// btnTabuada.onclick=tabuada (pior jeito)

// Exercicio 02

let btnTab5= document.querySelector("#btnTabuada5")

const tabuada5 = function (){
    let res
    for(let i =0; i<=10; i++){
        res=5*i
        console.log("5 * "+i+" = "+res)
    }
}

btnTab5.addEventListener("click",()=>{
    btnTabuada.removeEventListener("click",tabuada)
    btnTabuada.addEventListener("click", tabuada5)
})

// exercicio 03

let nome = document.querySelector("#nome")
let email = document.querySelector("#email")
let contato = document.querySelector("#contato")
let mensagem = document.querySelector("#mensagem")

nome.addEventListener("blur",()=>{
   if(nome.value=="") alert("Preencha o nome.")
})

email.addEventListener("blur",()=>{
    if(email.value=="")alert("Preencha o email")
})

contato.addEventListener("change",()=>{
    if(contato.value == "")alert("Selecione o tipo de contato")
})

mensagem.addEventListener("blur",()=>{
    if(mensagem.value=="")alert("Adicione a mensagem")
})

