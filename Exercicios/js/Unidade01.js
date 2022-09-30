// Exercício 01
function maior(a, b, c) {
    let texto = "O maior número é "

    if (a > b && a > c) {
        console.log(texto + a)
    } else if (b > a && b > c) {
        console.log(texto + b)
    } else if (c > a && c > b) {
        console.log(texto + c)
    }

}

maior(2, 7, 34)

// Exercício 02

let vetorEx2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

function valorExiste(a){
    for(let i=0; i<vetorEx2.length; i++){
        if(vetorEx2[i]===a){
           
            return i;
        }
    }
    
    return -1
}

let valor = valorExiste(7)

if(valor >=0)  console.log("O valor existe na posição "+valor)
else console.log("Esse valor não existe no vetor")

// Exercício 03

let vetorEx3 = [43, 52, 9, 4, 5, 3, 7, 14, 16, 41]

let vetorS1 = vetorEx3.map(valor=>{
    return valor*2
})
console.log(vetorS1)

let vetorS2 = vetorEx3.filter((valor, posicao)=>{
    
    return valor%2==0
})

console.log(vetorS2)

let vetorS3 = vetorEx3.reduce((soma, atual)=>{
    return soma+atual
})

console.log(vetorS3)


// Exercício 04

function somaPar(a,b){
    
    return new Promise((resolve, reject)=>{
        let retorno = a + b
        if(retorno%2==0){
            // console.log("O número é par.")
            resolve("O número é par.")
        }else{
            // console.log("O número não é par")
            reject("O número não é par")
        }
    })
}



somaPar(4,6).then((resposta)=>{
    console.log(resposta)
}).catch((resposta)=>{
    console.log(resposta)
})
console.log("apos")