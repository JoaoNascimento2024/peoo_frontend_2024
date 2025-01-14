import {get} from "./api.js";
import state from "./state.js";

const carregarQuantidadeProjetos = async () => {
    const projetos = await get("http://localhost:5000/projetos");
    state.projetos = projetos;
    state.quantidadeProjetos = projetos.length;
    renderizarQuantidadeProjetos();
};

const renderizarQuantidadeProjetos = () => {
    const conteudo = `
        <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">Total de projetos</div>
                <div class="card-body">
                    <h5 class="card-title">${state.quantidadeProjetos}</h5>
                </div>
        </div>
    `;
    document.getElementById("app-content").innerHTML = conteudo;
}

export {carregarQuantidadeProjetos};