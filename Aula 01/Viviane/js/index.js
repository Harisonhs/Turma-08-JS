// const x = document.querySelector("#p2").innerHTML
// console.log(x)

// const y = "2"
// // console.log(y==2)
// // console.log(y===2)

// function teste(a, b) {
//     let c = a + b
//     console.log({
//         c
//     })
//     return c
// }

// let f = teste(3, 5)
// console.log({
//     f
// })

// function teste2(função, a, b) {
//     let v = função(a, b)
//     console.log({
//         v
//     })
// }

// teste2(teste, 4, 6)

// const formulario = document.querySelector("form")
// formulario.addEventListener("submit", function (evento) {
//     evento.preventDefault()
//     let nome = document.querySelector("#nome").value
//     if (validação(nome))
//         console.log(nome)

// })

// function validação(nome) {
//     if (nome === "") {
//         alert("Nome não informado!")
//         return false
//     } else {
//         return true
//     }
// }

// let btn2 = document.getElementById("btn2")
// btn2.addEventListener("click", function () {
//     console.log(teste(3, 4))
// })

// const mult = function (a, b) {
//     return a * b
// }

// teste2(mult, 2, 3)

// const div = (a, b) => {
//     return a / b
// }
// teste2(div, 4, 2)

// const sub = (a, b) => a - b
// teste2(sub, 4, 7)

// let vetor1 = Array(10)
// let vetor2 = [3, 5, 8, 12, 67, 43]

// vetor1.push("um")
// vetor1.unshift("quatro")
// console.table(vetor1)
// console.table(vetor2)

// for (let i = 0; i < vetor1.length; i++) {
//     vetor1[i] = i * i
// }

// console.table(vetor1)

// for (let n of vetor2) {
//     console.log(n)
// }

// function sair() {}

// let opcao = 0

// switch (opcao) {
//     case 0:
//         alert(0)
//         break
//     case 1:
//         alert(1)
//         break
//     case 2:
//         alert(2)
//         break
//     default:
//         alert("nenhuma")

// }

// map(), reduce() e filter()

const vetor3 = [10, 11, 12, 13, 14];

let resReduce = vetor3.reduce((resultado, x) => {

    console.log(`${resultado} + ${x} = ${resultado+x}`);
    return resultado + x;
});

console.log("Resultado da soma é:", resReduce);

let resMap = vetor3.map((num) => {
    return num * 2;
});

console.log(resMap);

let resFilter = vetor3.filter((num) => {

    if (num % 2 === 0) return true;

});

console.log(resFilter);

let res = vetor3.reduce((resposta, atual) => {
    return resposta * atual;
})

console.log(res);

function soma(a, b) {

    return new Promise((resolve, reject) => {
        let res = a + b;
        if (res <= 50) {
            resolve(res);
        } else {
            reject("maior que 50");
        }
    });
}

let s;
soma(30, 27).then((resposta) => {
    s = resposta;
}).catch((erro) => {
    console.error(erro);
    s = -1;
})
console.log(s);


function par(a) {

    return new Promise((resolve, reject) => {
        //setTimeout(()=>{console.log("timeout")},4000)
        if(a%2===0){
            resolve(a);
        }else{
            reject(a);
        }
    });
}

par(62).then((verdadeiro)=>{
    console.log(`${verdadeiro} é par`)
}).catch((falso)=>{
    console.log(`${falso} é impar`)
});