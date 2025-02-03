import {get, post} from "./api.js";
import state from "./state.js";

const carregarProjetos = async () => {
    const projetos = await get("http://localhost:5000/projetos");
    state.projetos = projetos;
    renderizarListaProjetos();
}

const renderizarListaProjetos = () => {
    let tabela = `
    <button type="button" class="btn btn-primary" id="novo-projeto">Novo</button>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Nome</th>
            </tr>
        </thead>        
        <tbody>    
    `;

    let bodyTabela = state.projetos.map(projeto => `
        <tr>
            <th scope="row">
                ${projeto._id}
            </th>
            <td>
                ${projeto._nome}
            </td>
        </tr>
    `).join(" ");

     tabela = tabela + bodyTabela + "</tbody></table>";
     
     document.getElementById("app-content").innerHTML = tabela;

     document.getElementById("novo-projeto").addEventListener("click", (e) => {
        let formulario = `
            <form id="form-projeto">
                <div class="form-group">
                    <label for="projeto">Nome do projeto</label>
                    <input type="text" id="nome-projeto" class="form-control" id="projeto" aria-describedby="emailHelp" placeholder="Digite o nome do projeto">                    
                </div>                
                <button type="submit" class="btn btn-primary" style="margin-top:10px">Salvar</button>
            </form>
        `;
        document.getElementById("app-content").innerHTML = formulario;

        document.getElementById("form-projeto").addEventListener("submit", async (e) => {
            e.preventDefault();
            const projeto = { nome : document.getElementById("nome-projeto").value }   
            await post("http://localhost:5000/projetos", projeto);         
            await carregarProjetos();
            console.log({projeto})
        });
     })
}

export {carregarProjetos};