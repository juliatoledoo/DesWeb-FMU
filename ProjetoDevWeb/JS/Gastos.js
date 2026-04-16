function salvarGastos() {
    const campos = ["Moradia", "Alimento", "Transporte", "Saude", "Assinaturas", "Lazer", "Educacao", "Investimento", "Outros"];
    let totalGastos = 0;

    // Função para limpar o "R$ " e converter para número real
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

    // IMPORTANTE: Salvar o TOTAL (número) e não o objeto
    localStorage.setItem("totalGastos", totalGastos.toFixed(2));

    // Redirecionamento correto
    window.location.href = "PlanoAcao.html";
}
