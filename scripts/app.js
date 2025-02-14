
import { carregarQuantidadeProjetos } from "./dashboard.js";
import { carregarProjetos } from "./projetos.js";

const route = routeName => {
    switch(routeName){
        case "home":
            carregarQuantidadeProjetos();  
            break;
        case "projetos":
            carregarProjetos();
            break;
        case "tarefas":
            document.getElementById("app-content").innerHTML = "Tarefas";
            break;
        //default:
            //
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

window.onload = init;