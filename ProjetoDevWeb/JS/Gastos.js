function salvarGastos() {
    // Lista de campos que são considerados GASTOS (tirei o Investimento desta soma)
    const camposGastos = ["Moradia", "Alimento", "Transporte", "Saude", "Assinaturas", "Lazer", "Educacao", "Outros"];
    let totalGastos = 0;
    let valorInvestimento = 0;

    const limpar = (v) => {
        if (!v) return 0;
        let limpo = v.replace("R$ ", "").replace(/\./g, "").replace(",", ".");
        return parseFloat(limpo) || 0;
    };

    // 1. Soma apenas o que é GASTO real
    camposGastos.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            totalGastos += limpar(elemento.value);
        }
    });

    // 2. Pega o valor do Investimento separadamente para o card dele
    const campoInvestimento = document.getElementById("Investimento");
    if (campoInvestimento) {
        valorInvestimento = limpar(campoInvestimento.value);
    }

    // PERSISTÊNCIA: Agora o totalGastos não inclui o investimento
    localStorage.setItem("totalGastos", totalGastos.toFixed(2));
    localStorage.setItem("totalInvestimento", valorInvestimento.toFixed(2));

    window.location.href = "PlanoAcao.html";
}

function formatarMoeda(i) {
    let v = i.value.replace(/\D/g, "");
    v = (v / 100).toFixed(2).replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    i.value = "R$ " + v;
}
