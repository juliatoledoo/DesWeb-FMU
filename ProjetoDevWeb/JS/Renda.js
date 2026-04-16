function formatarMoeda(input) {
    let valor = input.value.replace(/\D/g, ""); 
    valor = (valor / 100).toFixed(2) + "";
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    input.value = "R$ " + valor;
}

function salvarRenda() {
    const inputSalario = document.getElementById("salario").value;
    const inputOutras = document.getElementById("outras").value;

    if (inputSalario.trim() === "" || inputSalario === "R$ " || inputSalario === "R$ 0,00") {
        alert("Por favor, informe o valor do seu salário bruto.");
        return; 
    }

    const limpar = (v) => parseFloat(v.replace("R$ ", "").replace(/\./g, "").replace(",", ".")) || 0;

    const salarioBruto = limpar(inputSalario);
    const outras = limpar(inputOutras);
    
    const descontoINSS = calcularINSS(salarioBruto);
    const salarioLiquido = salarioBruto - descontoINSS;
    const totalRenda = salarioLiquido + outras;

    localStorage.setItem("salario", salarioLiquido);
    localStorage.setItem("outras", outras);
    localStorage.setItem("totalRenda", totalRenda);

    window.location.href = "Gastos.html";
}
