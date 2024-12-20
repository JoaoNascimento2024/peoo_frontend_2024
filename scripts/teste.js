import api from "./api.js";

const buscarProjetos = async () => {
    const projetos = await api.get("http://localhost:5000/projetos");
    console.log(projetos);
}

document.getElementById("botao").addEventListener("click",buscarProjetos);