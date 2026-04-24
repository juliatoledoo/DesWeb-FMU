window.onload = function() {
    const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Recupera os dados
    const renda = parseFloat(localStorage.getItem("totalRenda")) || 0;
    const inss = parseFloat(localStorage.getItem("descontoINSS")) || 0;
    const gastos = parseFloat(localStorage.getItem("totalGastos")) || 0;
    const investimento = parseFloat(localStorage.getItem("totalInvestimento")) || 0;
    const tipoContrato = localStorage.getItem("tipoContrato");
    
    // O cálculo da Sobra (Renda já é líquida, então Renda - Gastos)
    const sobra = renda - gastos;

    // Preenche Renda, Gastos e Investimento
    document.getElementById("res-renda").innerText = formatar(renda);
    document.getElementById("res-gastos").innerText = formatar(gastos);
    document.getElementById("res-investimento").innerText = formatar(investimento);
    document.getElementById("res-saldo").innerText = formatar(sobra);

    // Lógica Condicional do INSS
    const campoInss = document.getElementById("res-inss");
    if (tipoContrato === "estagio") {
        campoInss.innerText = "Não há desconto!";
        campoInss.style.color = "#00ff88"; // Verde (positivo)
    } else {
        campoInss.innerText = formatar(inss);
        campoInss.style.color = "#ff4d4d"; // Vermelho (desconto)
    }

    // Estilização da Sobra
    const campoSobra = document.getElementById("res-saldo");
    const msg = document.getElementById("mensagem-status");

    if (sobra < 0) {
        campoSobra.style.color = "#ff4d4d";
        msg.innerText = "Atenção! Você está gastando mais do que recebe.";
    } else {
        campoSobra.style.color = "#00ff88";
        msg.innerText = "Parabéns! Suas finanças estão equilibradas.";
    }
}

function voltarInicio() {
    localStorage.clear();
    window.location.href = "index.html"; 
}
