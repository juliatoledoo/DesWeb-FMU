function calcularINSS(salario) {
    const tipo = localStorage.getItem("tipoContrato");
    
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

    const limpar = (v) => {
        if (!v) return 0;
        let limpo = v.replace("R$ ", "").replace(/\./g, "").replace(",", ".");
        return parseFloat(limpo) || 0;
    };

    const salarioBruto = limpar(inputSalario);
    const outrasRendas = limpar(inputOutras);
    
    const valorDescontoINSS = calcularINSS(salarioBruto);
    
    const rendaBrutaTotal = salarioBruto + outrasRendas;

    localStorage.setItem("totalRenda", rendaBrutaTotal.toFixed(2));
    localStorage.setItem("descontoINSS", valorDescontoINSS.toFixed(2));
    
    let tipoContratoTexto = localStorage.getItem("tipoContrato") || "Contrato";

    tipoContratoTexto = tipoContratoTexto.toUpperCase(); 

    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) + 'hs';

    const valorRecebidoFormatado = rendaBrutaTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    const valorGastosInicial = "Calculando..."; 
    const valorSobraInicial = valorRecebidoFormatado;

    let listaSimulacoes = JSON.parse(localStorage.getItem('listaSimulacoes')) || [];

    const novaSimulacao = {
        id: Date.now(), 
        data: dataFormatada,
        hora: horaFormatada,
        contrato: tipoContratoTexto,
        recebido: valorRecebidoFormatado,
        gastos: valorGastosInicial,
        sobra: valorSobraInicial
    };

    listaSimulacoes.push(novaSimulacao);

    localStorage.setItem('listaSimulacoes', JSON.stringify(listaSimulacoes));

    window.location.href = "Gastos.html";
}
