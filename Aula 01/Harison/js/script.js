
function valida() {
    const inicio = document.getElementById("inicio").value
    const fim = document.getElementById("fim").value
    const atividade = document.getElementById("atividade").value
    if (inicio == '') {
        alert("Preencha a hora de início")
    } else {
        console.log({ inicio })
    }
    if (fim == '') {
        alert("Preencha a hora de término")
    } else {
        console.log({ fim })
    }
    if (atividade == '') {
        alert("Preencha uma descrição para a atividade")
    } else {
        console.log({ atividade })
    }
}

function entradaValida(entrada) {
    return new Promise((resolve, reject) => {
        if (entrada == '') {
            reject()
        } else {
            resolve()
        }
    })
}

function validaAsync() {
    const inicio = document.getElementById("inicio").value
    const fim = document.getElementById("fim").value
    const atividade = document.getElementById("atividade").value

    entradaValida(inicio).then(() => {
        console.log("inicio = " + inicio)
    }).catch(() => {
        console.log("Preencha o inicio")
    })

    entradaValida(fim).then(() => {
        console.log("fim = " + fim)
    }).catch(() => {
        console.log("Preencha o fim")
    })

    entradaValida(atividade).then(() => {
        console.log("atividade = " + atividade)
    }).catch(() => {
        console.log("Preencha a atividade")
    })


}