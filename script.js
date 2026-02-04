async function loadHTML(id, file) {
    try {
      const response = await fetch(file);
      const content = await response.text();
      document.getElementById(id).innerHTML = content;
    } catch (error) {
      console.error("Erro ao carregar:", file, error);
    }
  }

// Carrega os componentes fixos
  loadHTML("header", "includes/header.html");
  loadHTML("footer", "includes/footer.html");

// Espera o clique no botão de simulação
document.addEventListener('click', function(e) {
    // Verifica se o elemento clicado é o botão de simular
    if (e.target && e.target.id === 'simulate-btn'){
        //alert("Simulador iniciado! Redirecionando...");
        
        // Se você tiver uma página de simulação, mude o caminho abaixo:
        window.location.href = "Pages/login.html"; 
    }
});
