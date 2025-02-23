import { carregarQuantidadeProjetos } from "./dashboard.js";
import { carregarProjetos } from "./projetos.js";
import { carregarCategorias } from "./categorias.js";

import verificarAutenticacao from "./auth.js";
verificarAutenticacao();

const route = routeName => {
    switch(routeName){
        case "home":
            carregarQuantidadeProjetos();  
            break;
        case "projetos":
            carregarProjetos();
            break;
        case "categorias":
            carregarCategorias();
            break;
    }
};

const init = () => {
    document.querySelectorAll('[data-route]').forEach(link => {
      link.addEventListener('click', (e) => {    
        const routeName = e.target.getAttribute('data-route');
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
        route(routeName);
      })  
    })
    route("home");
};

document.getElementById("logout-link").addEventListener("click", () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    window.location.href = "login.html"; // Redireciona para a página de login
});

window.onload = init;