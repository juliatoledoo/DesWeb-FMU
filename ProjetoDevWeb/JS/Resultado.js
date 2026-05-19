window.onload = function() {
    const renda = parseFloat(localStorage.getItem("totalRenda")) || 0;
    const gastos = parseFloat(localStorage.getItem("totalGastos")) || 0;
    const saldo = renda - gastos;

    const formatar = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    document.getElementById("res-renda").innerText = formatar(renda);
    document.getElementById("res-gastos").innerText = formatar(gastos);
    document.getElementById("res-saldo").innerText = formatar(saldo);

    const campoSaldo = document.getElementById("res-saldo");
    const mensagem = document.getElementById("mensagem-status");

    if (saldo < 0) {
        campoSaldo.style.color = "#ff4d4d"; 
        mensagem.innerText = "Cuidado! Seus gastos superaram sua renda.";
        mensagem.style.color = "#ff4d4d";
    } else {
        campoSaldo.style.color = "#00ff88"; 
        mensagem.innerText = "Parabéns! Você conseguiu poupar este mês.";
        mensagem.style.color = "#00ff88";
    }

    const rendaTexto = document.getElementById("res-renda").innerText;
    const gastosTexto = document.getElementById("res-gastos").innerText;
    const saldoTexto = document.getElementById("res-saldo").innerText;

    let tipoContratoTexto = localStorage.getItem("tipoContrato") || "Contrato";
    tipoContratoTexto = tipoContratoTexto.toUpperCase();

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit"
    });
    const horaFormatada = agora.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    }) + "hs";

    let listaSimulacoes = JSON.parse(localStorage.getItem("listaSimulacoes")) || [];

    const novaSimulacao = {
        id: Date.now(),
        data: dataFormatada,
        hora: horaFormatada,
        contrato: tipoContratoTexto,
        recebido: rendaTexto,
        gastos: gastosTexto,
        sobra: saldoTexto
    };

    listaSimulacoes.push(novaSimulacao);
    localStorage.setItem("listaSimulacoes", JSON.stringify(listaSimulacoes));
};

function voltarInicio() {
    localStorage.removeItem("totalRenda");
    localStorage.removeItem("totalGastos");
    localStorage.removeItem("descontoINSS");
    window.location.href = "../Dashboard.html";
}
