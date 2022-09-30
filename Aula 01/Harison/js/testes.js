let start = performance.now()
let fragmento = document.createDocumentFragment()
for(let i=0; i<10000; i++){
    let p = document.createElement("p")
    fragmento.appendChild(p)
}
document.body.appendChild(fragmento)
let end = performance.now()
console.log(`tempo com fragmento:  ${(end - start)} ms`)

let start2 = performance.now()
for(let i=0; i<10000; i++){
    let p = document.createElement("p")
    document.body.appendChild(p)
}
let end2 = performance.now()
console.log(`tempo sem fragmento:  ${(end2 - start2)} ms`)