const usuárioEsperado = "admin"
const senhaEsperada = "1234"

let formulario = document.querySelector("form")
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault()

    let username = formulario.querySelector("#username").value
    let pass = formulario.querySelector("#pass").value

    if(username === usuárioEsperado && pass === senhaEsperada){
        sessionStorage.setItem("contAtivLogado", true)
        window.location = "index.html"
    }else{
        sessionStorage.setItem("contAtivLogado", false)
        alert("Senha ou usuário inválidos")
    }
})