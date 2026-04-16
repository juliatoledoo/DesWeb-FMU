function salvarGastos() {
    const categorias = [
        "Moradia", "Alimento", "Transporte", "Saude", 
        "Assinaturas", "Lazer", "Educacao", "Investimento", "Outros"
    ];
    
    let totalGastos = 0;

    const limparValor = (valorFormatado) => {
        if (!valorFormatado) return 0;
        let limpo = valorFormatado.replace("R$ ", "").replace(/\./g, "").replace(",", ".");
        return parseFloat(limpo) || 0;
    };

    categorias.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            totalGastos += limparValor(elemento.value);
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
