function formatarMoeda(input) {
    let valor = input.value.replace(/\D/g, ""); // Remove o que não é número
    valor = (valor / 100).toFixed(2) + "";
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    input.value = "R$ " + valor;
}

function salvarRenda() {
    const limpar = (v) => parseFloat(v.replace("R$ ", "").replace(/\./g, "").replace(",", ".")) || 0;

    const salarioBruto = limpar(document.getElementById("salario").value);
    const outras = limpar(document.getElementById("outras").value);
    
    const descontoINSS = calcularINSS(salarioBruto);
    const salarioLiquido = salarioBruto - descontoINSS;
    const totalRenda = salarioLiquido + outras;

    localStorage.setItem("salario", salarioLiquido);
    localStorage.setItem("outras", outras);
    localStorage.setItem("totalRenda", totalRenda);

    window.location.href = "Gastos.html";
}
