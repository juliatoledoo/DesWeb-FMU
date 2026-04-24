window.onload = function() {
    const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const renda = parseFloat(localStorage.getItem("totalRenda")) || 0;
    const inss = parseFloat(localStorage.getItem("descontoINSS")) || 0;
    const gastos = parseFloat(localStorage.getItem("totalGastos")) || 0;
    const investimento = parseFloat(localStorage.getItem("totalInvestimento")) || 0;
    const tipoContrato = localStorage.getItem("tipoContrato");
    
    const sobra = renda - gastos - investimento;

    if(document.getElementById("res-renda")) document.getElementById("res-renda").innerText = formatar(renda);
    if(document.getElementById("res-gastos")) document.getElementById("res-gastos").innerText = formatar(gastos);
    if(document.getElementById("res-investimento")) document.getElementById("res-investimento").innerText = formatar(investimento);
    if(document.getElementById("res-saldo")) document.getElementById("res-saldo").innerText = formatar(sobra);

    const campoInss = document.getElementById("res-inss");
    if (campoInss) {
        if (tipoContrato === "estagio") {
            campoInss.innerText = "Não há desconto!";
            campoInss.style.color = "#00ff88"; 
        } else {
            campoInss.innerText = formatar(inss);
            campoInss.style.color = "#ff4d4d";
        }
    }

    const campoSobra = document.getElementById("res-saldo");
    if (campoSobra) {
        campoSobra.style.color = sobra < 0 ? "#ff4d4d" : "#00ff88";
    }
};

function voltarInicio() {
    console.log("Reiniciando simulação...");
    localStorage.clear();
    window.location.replace("index.html"); 
}
