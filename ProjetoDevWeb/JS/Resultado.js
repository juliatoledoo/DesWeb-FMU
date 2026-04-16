window.onload = function() {
    // 1. Recupera os dados do localStorage (convertendo de string para número)
    const renda = parseFloat(localStorage.getItem("totalRenda")) || 0;
    const gastos = parseFloat(localStorage.getItem("totalGastos")) || 0;
    const saldo = renda - gastos;

    // 2. Função para formatar números para o padrão brasileiro R$
    const formatar = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    // 3. Insere os valores na tela
    document.getElementById("res-renda").innerText = formatar(renda);
    document.getElementById("res-gastos").innerText = formatar(gastos);
    document.getElementById("res-saldo").innerText = formatar(saldo);

    // 4. Lógica visual para o Saldo (Verde se positivo, Vermelho se negativo)
    const campoSaldo = document.getElementById("res-saldo");
    const mensagem = document.getElementById("mensagem-status");

    if (saldo < 0) {
        campoSaldo.style.color = "#ff4d4d"; // Vermelho
        mensagem.innerText = "Cuidado! Seus gastos superaram sua renda.";
        mensagem.style.color = "#ff4d4d";
    } else {
        campoSaldo.style.color = "#00ff88"; // Verde Neon
        mensagem.innerText = "Parabéns! Você conseguiu poupar este mês.";
        mensagem.style.color = "#00ff88";
    }
};

function voltarInicio() {
    // Limpa os dados para uma nova simulação e volta para a primeira página
    localStorage.clear();
    window.location.href = "index.html"; // Ajuste para o nome da sua página inicial
}
