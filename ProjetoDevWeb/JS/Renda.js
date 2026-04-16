function calcularINSS(salario) {
    const tipo = localStorage.getItem("tipoContrato");
    
    // Só calcula se for CLT
    if (tipo !== "clt") return 0;

    let inss = 0;

    if (salario <= 1412.00) {
        inss = salario * 0.075;
    } else if (salario <= 2666.68) {
        inss = (1412.00 * 0.075) + ((salario - 1412.00) * 0.09);
    } else if (salario <= 4000.03) {
        inss = (1412.00 * 0.075) + (1254.68 * 0.09) + ((salario - 2666.68) * 0.12);
    } else if (salario <= 7786.02) {
        inss = (1412.00 * 0.075) + (1254.68 * 0.09) + (1333.35 * 0.12) + ((salario - 4000.03) * 0.14);
    } else {
        inss = 908.85; // Teto máximo do INSS
    }

    return inss;
}

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
