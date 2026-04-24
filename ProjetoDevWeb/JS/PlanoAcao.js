window.onload = function() {
    const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Recupera os dados salvos
    const renda = parseFloat(localStorage.getItem("totalRenda")) || 0;
    const inss = parseFloat(localStorage.getItem("descontoINSS")) || 0;
    const gastos = parseFloat(localStorage.getItem("totalGastos")) || 0;
    const investimento = parseFloat(localStorage.getItem("totalInvestimento")) || 0;
    const tipoContrato = localStorage.getItem("tipoContrato");
    
    // A MÁGICA: A sobra agora subtrai os gastos E o investimento
    const sobra = renda - gastos - investimento;

    // Preenche os cards na tela
    document.getElementById("res-renda").innerText = formatar(renda);
    document.getElementById("res-gastos").innerText = formatar(gastos);
    document.getElementById("res-investimento").innerText = formatar(investimento);
    document.getElementById("res-saldo").innerText = formatar(sobra);

    // Lógica do INSS (Trata CLT vs Estágio)
    const campoInss = document.getElementById("res-inss");
    if (tipoContrato === "estagio") {
        campoInss.innerText = "Não há desconto!";
        campoInss.style.color = "#00ff88"; 
    } else {
        campoInss.innerText = formatar(inss);
        campoInss.style.color = "#ff4d4d";
    }

    // Estilização da Sobra
    const campoSobra = document.getElementById("res-saldo");
    campoSobra.style.color = sobra < 0 ? "#ff4d4d" : "#00ff88";
};
