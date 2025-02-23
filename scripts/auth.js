function verificarAutenticacao() {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirecionar para a página de login
    window.location.href = "login.html";
  }
}

export default verificarAutenticacao;
