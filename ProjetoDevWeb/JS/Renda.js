function calcularINSS(salario) {
    const tipo = localStorage.getItem("tipoContrato");
    
    // Se não for CLT ou se for estágio, o desconto é ZERO
    if (tipo !== "clt") return 0;

    let inss = 0;

    // Tabela progressiva do INSS 2026
    if (salario <= 1412.00) {
        inss = salario * 0.075;
    } else if (salario <= 2666.68) {
        inss = (1412.00 * 0.075) + ((salario - 1412.00) * 0.09);
    } else if (salario <= 4000.03) {
        inss = (1412.00 * 0.075) + (1254.68 * 0.09) + ((salario - 2666.68) * 0.12);
    } else if (salario <= 7786.02) {
        inss = (1412.00 * 0.075) + (1254.68 * 0.09) + (1333.35 * 0.12) + ((salario - 4000.03) * 0.14);
    } else {
        inss = 908.85; 
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

    if (inputSalario === "" || inputSalario === "R$ 0,00" || inputSalario === "R$ ") {
        alert("Por favor, informe o valor do seu salário bruto.");
        return;
    }

    // Função interna para limpar a formatação de moeda e converter para número
    const limpar = (v) => {
        if (!v) return 0;
        let limpo = v.replace("R$ ", "").replace(/\./g, "").replace(",", ".");
        return parseFloat(limpo) || 0;
    };

    const salarioBruto = limpar(inputSalario);
    const outrasRendas = limpar(inputOutras);
    
    // Cálculo do Desconto (apenas sobre o salário bruto)
    const valorDescontoINSS = calcularINSS(salarioBruto);
    
    // Renda Líquida = (Bruto - Desconto) + Outras Rendas
    const rendaLiquidaFinal = (salarioBruto - valorDescontoINSS) + outrasRendas;

    // PERSISTÊNCIA: Guardamos os valores de forma isolada para o Dashboard
    localStorage.setItem("salarioBruto", salarioBruto.toFixed(2));
    localStorage.setItem("descontoINSS", valorDescontoINSS.toFixed(2));
    localStorage.setItem("totalRenda", rendaLiquidaFinal.toFixed(2));
    localStorage.setItem("outrasRendas", outrasRendas.toFixed(2));

    console.log("Dados salvos com sucesso!");
    window.location.href = "Gastos.html";
}
