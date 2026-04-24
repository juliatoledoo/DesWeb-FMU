window.onload = function() {
    const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // 1. Recupera os dados do LocalStorage
    // totalRenda aqui representa a soma do Salário Bruto + Outras Rendas
    const rendaTotalBruta = parseFloat(localStorage.getItem("totalRenda")) || 0;
    const inss = parseFloat(localStorage.getItem("descontoINSS")) || 0;
    const gastos = parseFloat(localStorage.getItem("totalGastos")) || 0;
    const investimento = parseFloat(localStorage.getItem("totalInvestimento")) || 0;
    const tipoContrato = localStorage.getItem("tipoContrato");
    
    // 2. CÁLCULO DA SOBRA: Renda Bruta - Desconto INSS - Gastos - Investimento
    const sobra = rendaTotalBruta - inss - gastos - investimento;

    // 3. Preenchimento dos Cards no HTML
    if(document.getElementById("res-renda")) {
        document.getElementById("res-renda").innerText = formatar(rendaTotalBruta);
    }
    
    if(document.getElementById("res-gastos")) {
        document.getElementById("res-gastos").innerText = formatar(gastos);
    }
    
    if(document.getElementById("res-investimento")) {
        document.getElementById("res-investimento").innerText = formatar(investimento);
    }
    
    if(document.getElementById("res-saldo")) {
        document.getElementById("res-saldo").innerText = formatar(sobra);
    }

    // 4. Lógica de Exibição do INSS
    const campoInss = document.getElementById("res-inss");
    if (campoInss) {
        if (tipoContrato === "estagio") {
            campoInss.innerText = "Não há desconto!";
            campoInss.style.color = "#00ff88"; 
        } else {
            // Se for CLT, mostra o valor do desconto calculado no rendas.js
            campoInss.innerText = formatar(inss);
            campoInss.style.color = "#ff4d4d";
        }
    }

    // 5. Estilização Visual da Sobra (Verde para positivo, Vermelho para negativo)
    const campoSobra = document.getElementById("res-saldo");
    if (campoSobra) {
        campoSobra.style.color = sobra < 0 ? "#ff4d4d" : "#00ff88";
    }
};

/**
 * Função para reiniciar a simulação
 * Sobe um nível (../) para encontrar o index.html na raiz do projeto
 */
function voltarInicio() {
    localStorage.clear();
    window.location.href = "../index.html"; 
}
