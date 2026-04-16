window.onload = function() {
    const renda = parseFloat(localStorage.getItem("totalRenda")) || 0;
    const gastos = parseFloat(localStorage.getItem("totalGastos")) || 0;
    const saldo = renda - gastos;

    const formatar = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    if(document.getElementById("res-renda")) document.getElementById("res-renda").innerText = formatar(renda);
    if(document.getElementById("res-gastos")) document.getElementById("res-gastos").innerText = formatar(gastos);
    if(document.getElementById("res-saldo")) document.getElementById("res-saldo").innerText = formatar(saldo);

    const campoSaldo = document.getElementById("res-saldo");
    const msg = document.getElementById("mensagem-status");

    if (campoSaldo && msg) {
        if (saldo < 0) {
            campoSaldo.style.color = "#ff4d4d"; 
            msg.innerText = "Atenção! Seus gastos estão acima da renda.";
        } else {
            campoSaldo.style.color = "#00ff88"; 
            msg.innerText = "Parabéns! Suas finanças estão em dia.";
        }
    }
}

function voltarInicio() {
    localStorage.clear();
    window.location.href = "index.html"; 
}
