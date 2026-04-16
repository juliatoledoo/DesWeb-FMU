function salvarGastos() {
    // 1. Lista de IDs das categorias (deve ser igual aos IDs no seu HTML)
    const categorias = [
        "Moradia", "Alimento", "Transporte", "Saude", 
        "Assinaturas", "Lazer", "Educacao", "Investimento", "Outros"
    ];
    
    let totalGastos = 0;

    // 2. Função interna para limpar a máscara "R$ " e converter para número
    const limparValor = (valorFormatado) => {
        if (!valorFormatado) return 0;
        // Remove R$, pontos de milhar e troca a vírgula decimal por ponto
        let limpo = valorFormatado.replace("R$ ", "").replace(/\./g, "").replace(",", ".");
        return parseFloat(limpo) || 0;
    };

    // 3. Percorre cada campo, limpa o valor e soma no total
    categorias.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            totalGastos += limparValor(elemento.value);
        }
    });

    // 4. Salva o resultado final no navegador
    localStorage.setItem("totalGastos", totalGastos.toFixed(2));

    // 5. Redireciona para o PlanoAcao.html (Verifique se as iniciais são MAIÚSCULAS)
    window.location.href = "PlanoAcao.html";
}

// Função auxiliar para formatar a moeda enquanto o usuário digita
function formatarMoeda(i) {
    let v = i.value.replace(/\D/g, "");
    v = (v / 100).toFixed(2).replace(".", ",");
    v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
    i.value = "R$ " + v;
}
