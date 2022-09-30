const logado = JSON.parse(sessionStorage.getItem("controleAtividades.logado"))
if (logado) {

    const formulario = document.querySelector("#formulario")
    const btnLogout = document.querySelector("#BtnLogout")
    const atividades = localStorage.getItem("controleAtividades.atividades")
    const arquivados = localStorage.getItem("controleAtividades.arquivados")
    let listaAtividades = Array()
    let listaArquivados = Array()

    if (atividades) {
        listaAtividades = JSON.parse(atividades)
        listaAtividades.forEach((obj) => {
            insereNoDOM(obj, "listaAtividades", listaAtividades)
        })
        atualizaMedias()
    }

    if (arquivados) {
        listaArquivados = JSON.parse(arquivados)
        listaArquivados.forEach((obj) => {
            insereNoDOM(obj, "atividadesConfirmadas", listaArquivados)
        })
        atualizaMedias()
    }

    function atualizaMedias() {
        let mediaAtividades = 0
        let mediaArquivados = 0

        if (listaAtividades.length > 0) {
            listaAtividades.forEach((atividade) => {
                mediaAtividades += atividade.minutos
            })
            mediaAtividades /= listaAtividades.length
        }

        if (listaArquivados.length > 0) {
            listaArquivados.forEach((atividade) => {
                mediaArquivados += atividade.minutos
            })
            mediaArquivados /= listaArquivados.length
        }

        let mediaAtividadesDOM = document.querySelector("#DuracaoMedia")
        let mediaArquivadosDOM = document.querySelector("#DuracaoMediaConfirmados")

        mediaAtividadesDOM.innerHTML = mediaAtividades
        mediaArquivadosDOM.innerHTML = mediaArquivados
    }

    formulario.addEventListener('submit', function (evt) {
        evt.preventDefault()
        const inicio = document.getElementById("inicio").value
        const fim = document.getElementById("fim").value
        const atividade = document.getElementById("atividade").value
        let minutos = calculaTempo(inicio, fim)
        let obj = {
            inicio,
            fim,
            atividade,
            minutos
        }
        if (valida(obj)) {
            if (insereEmLista(obj, listaAtividades)) {
                localStorage.setItem("controleAtividades.atividades", JSON.stringify(listaAtividades))
                insereNoDOM(obj, "listaAtividades", listaAtividades)
                formulario.reset()
                document.getElementById("inicio").focus()
            } else {
                alert('Atividade já existe')
            }
        }
    })

    btnLogout.addEventListener('click', () => {
        sessionStorage.setItem("controleAtividades.logado", JSON.stringify(false))
        window.location = "login.html"
    });

    const calculaMinutos = (hora) => {
        let string_separada = hora.split(':') // '06:00' => ['06']['00']
        return parseInt(string_separada[0]) * 60 + parseInt(string_separada[1])
    }

    const calculaTempo = (inicio, fim) => {
        return calculaMinutos(fim) - calculaMinutos(inicio)
    }

    const saoIguais = (obj1, obj2) => {
        let inicio = obj1.inicio === obj2.inicio
        let fim = obj1.fim === obj2.fim
        let atividade = obj1.atividade === obj2.atividade
        let minutos = obj1.minutos === obj2.minutos
        return inicio && fim && atividade && minutos
    }

    function insereEmLista(obj, lista) {
        let previamenteNaLista = lista.filter((item) => {
            if (saoIguais(item, obj)) {
                return item
            }
        })
        if (previamenteNaLista.length == 0) {
            lista.push(obj)
            atualizaMedias()
            return true
        }
        return false
    }

    function insereNoDOM(obj, ID_tabela, lista) {
        //tabela previamente existente no HTML
        const tabela = document.querySelector("#" + ID_tabela)

        //elementos a serem criados
        let linha = document.createElement('tr')
        let inicio = document.createElement('td')
        let fim = document.createElement('td')
        let minutos = document.createElement('td')
        let atividade = document.createElement('td')
        let acoes = document.createElement('td')
        let botaoExcluir = document.createElement('button')

        //criar laços entre elementos
        acoes.appendChild(botaoExcluir)
        linha.appendChild(inicio)
        linha.appendChild(fim)
        linha.appendChild(minutos)
        linha.appendChild(atividade)
        linha.appendChild(acoes)
        tabela.appendChild(linha)

        //adicionar valores
        botaoExcluir.innerHTML = 'X'
        inicio.innerHTML = obj.inicio
        fim.innerHTML = obj.fim
        minutos.innerHTML = obj.minutos
        atividade.innerHTML = obj.atividade

        botaoExcluir.addEventListener('click', (evento) => {
            removerDaLista(obj, lista)
            removerDoDOM(ID_tabela, evento.target)
            atualizaStorage();
        })

        if (ID_tabela == "listaAtividades") {
            let botaoArquivar = document.createElement('button')
            acoes.appendChild(botaoArquivar)
            botaoArquivar.innerHTML = 'Arquivar'
            botaoArquivar.addEventListener('click', (evento) => {
                removerDaLista(obj, lista)
                removerDoDOM(ID_tabela, evento.target)
                atualizaStorage();
                if (insereEmLista(obj, listaArquivados)) {
                    localStorage.setItem("controleAtividades.arquivados", JSON.stringify(listaArquivados))
                    insereNoDOM(obj, "atividadesConfirmadas", listaArquivados)
                }
            })
        }
    }

    const atualizaStorage = () => {
        localStorage.setItem("controleAtividades.atividades", JSON.stringify(listaAtividades))
        localStorage.setItem("controleAtividades.arquivados", JSON.stringify(listaArquivados))
    };

    const removerDaLista = (obj, lista) => {
        let posicao = lista.indexOf(obj)
        if (posicao >= 0) {
            lista.splice(posicao, 1)
            atualizaMedias()
        } else {
            alert('A lista não possui o objeto')
        }
    }

    const removerDoDOM = (ID_tabela, botao) => {
        const tabela = document.querySelector("#" + ID_tabela)
        let td = botao.parentNode
        let linha = td.parentNode
        tabela.removeChild(linha)
    }

    // Verifica se a entrada é valida
    function entradaValida(entrada, nomeCampo) {
        if (entrada == '') {
            alert("Preencha o campo " + nomeCampo)
            return false
        } else {
            return true
        }
    }

    function valida(obj) {
        let validas = entradaValida(obj.inicio, "inicio")
            && entradaValida(obj.fim, "fim")
            && entradaValida(obj.atividade, "atividade")
        let minutos = calculaTempo(obj.inicio, obj.fim)
        if (minutos < 0) {
            alert('O fim deve ser maior que o início')
        }
        return validas && minutos >= 0
    }
}
else {
    window.location = "login.html"
}