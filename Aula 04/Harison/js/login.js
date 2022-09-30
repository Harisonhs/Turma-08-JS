document.addEventListener("DOMContentLoaded", () => { 
    const usuario = "admin"
    const senha = "698dc19d489c4e4db73e28a713eab07b" //123456
    const formulario = document.querySelector("#formLogin")
        
    formulario.addEventListener('submit', function(evento){
        evento.preventDefault()
    
        const inputUsuario = formulario.querySelector("#inputUsuario").value
        const inputSenha = formulario.querySelector("#inputSenha").value
    
        if(validaLogin(inputUsuario, inputSenha)){
            sessionStorage.setItem("controleAtividades.logado", JSON.stringify(true))
            window.location = "index.html"
        }else{
            sessionStorage.setItem("controleAtividades.logado", JSON.stringify(false))
            alert('Login ou senha inválidos')
        }
    })
    
    const calcHash = (input) => {
        if(input == '123456'){
            // obtido em http://www.md5.cz/
            return "698dc19d489c4e4db73e28a713eab07b"
        }else{
            return input
        }
    }
    
    const validaLogin = (inputUsuario, inputSenha) => {
        return inputUsuario == 'admin' && calcHash(inputSenha) == senha
    }
})

