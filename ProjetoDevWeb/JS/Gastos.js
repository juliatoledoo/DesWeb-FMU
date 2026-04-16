function salvarGastos() {
    const campos = ["Moradia", "Alimento", "Transporte", "Saude", "Assinaturas", "Lazer", "Educacao", "Investimento", "Outros"];
    let totalGastos = 0;

    const limpar = (v) => {
        if (!v) return 0;
        let limpo = v.replace("R$ ", "").replace(/\./g, "").replace(",", ".");
        return parseFloat(limpo) || 0;
    };

    campos.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            totalGastos += limpar(elemento.value);
        }
    });

    localStorage.setItem("totalGastos", totalGastos.toFixed(2));

    window.location.href = "PlanoAcao.html";
}

function formatarMoeda(i) {
    let v = i.value.replace(/\D/g, "");
    v = (v / 100).toFixed(2).replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    i.value = "R$ " + v;
}
