import {get} from "./api.js";
import state from "./state.js";

const carregarQuantidadeProjetos = async () => {
    state.projetos = await get("http://localhost:5000/projetos");
    state.categorias = await get("http://localhost:5000/categorias");
    renderizarQuantidadeProjetos();
};

const renderizarQuantidadeProjetos = () => {
    const conteudo = `
        <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">Total de projetos</div>
                <div class="card-body">
                    <h5 class="card-title">${state.projetos.length}</h5>
                </div>
        </div>

        <div class="card text-white bg-info mb-3" style="max-width: 18rem;">
            <div class="card-header">Total de categorias</div>
                <div class="card-body">
                    <h5 class="card-title">${state.categorias.length}</h5>
                </div>
        </div>
    `;
    document.getElementById("app-content").innerHTML = conteudo;
}

export {carregarQuantidadeProjetos};