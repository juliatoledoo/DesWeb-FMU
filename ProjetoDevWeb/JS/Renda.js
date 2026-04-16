function formatarMoeda(input) {
    let valor = input.value.replace(/\D/g, ""); // Remove o que não é número
    valor = (valor / 100).toFixed(2) + "";
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    input.value = "R$ " + valor;
}

function salvarRenda() {
    const inputSalario = document.getElementById("salario").value;
    const inputOutras = document.getElementById("outras").value;

    // VALIDAÇÃO: Se os campos estiverem vazios ou apenas com "R$ 0,00"
    if (inputSalario === "" || inputSalario === "R$ 0,00") {
        alert("Por favor, informe o valor do seu salário bruto.");
        return; // O 'return' faz a função parar aqui e não avançar a página
    }

    // Se passou na validação, continua o código normal
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
