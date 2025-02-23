import { get, post, del, put } from "./api.js";
import state from "./state.js";
import exibirToast from "./toast.js";

// Carrega os projetos e categorias
const carregarProjetos = async () => {
  state.projetos = await get("http://localhost:5000/projetos");
  state.categorias = await get("http://localhost:5000/categorias");
  renderizarListaProjetos();
};

// Renderiza a lista de projetos
const renderizarListaProjetos = () => {
  const appContent = document.getElementById("app-content");

  let tabela = `
    <button type="button" class="btn btn-primary" id="novo-projeto">Novo</button>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Nome</th>
                <th scope="col">Categoria</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>        
        <tbody>
            ${state.projetos
              .map(
                (projeto) => `
                <tr>
                    <th scope="row">${projeto._id}</th>
                    <td>${projeto._nome}</td>
                    <td>${projeto._categoria._nome}</td>
                    <td>
                        <button class="btn btn-primary editar-projeto" data-id="${projeto._id}">Editar</button>
                        <button class="btn btn-danger excluir-projeto" data-id="${projeto._id}">Excluir</button>
                    </td>
                </tr>`
              )
              .join("")}
        </tbody>
    </table>`;

  appContent.innerHTML = tabela;

  document.getElementById("novo-projeto").addEventListener("click", () => exibirFormulario());
  document.querySelectorAll(".editar-projeto").forEach((btn) => btn.addEventListener("click", editarProjeto));
  document.querySelectorAll(".excluir-projeto").forEach((btn) => btn.addEventListener("click", excluirProjeto));
};

// Exibir formulário de criação/edição
const exibirFormulario = (projeto = {}) => {
  const appContent = document.getElementById("app-content");

  let formulario = `
    <form id="form-projeto">
        <div class="form-group">
            <label for="projeto">Nome do projeto</label>
            <input type="text" id="nome-projeto" class="form-control" value="${projeto._nome || ""}" placeholder="Digite o nome do projeto">

            <label for="categoria-projeto">Categoria do projeto</label>
            <select class="form-control" id="categoria-projeto">
                <option value="">Selecione a categoria</option>
                ${state.categorias
                  .map(
                    (categoria) =>
                      `<option value="${categoria._id}" ${categoria._id === projeto._categoria?._id ? "selected" : ""}>${categoria._nome}</option>`
                  )
                  .join("")}
            </select>
        </div>                
        <button type="submit" class="btn btn-primary">Salvar</button>
    </form>`;

  appContent.innerHTML = formulario;

  document.getElementById("form-projeto").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome-projeto").value;
    const categoria = document.getElementById("categoria-projeto").value;
    const dadosProjeto = { nome, categoria };

    if (projeto._id) {
      await put(`http://localhost:5000/projetos/${projeto._id}`, dadosProjeto);
      exibirToast("Projeto atualizado com sucesso!");
    } else {
      await post("http://localhost:5000/projetos", dadosProjeto);
      exibirToast("Projeto cadastrado com sucesso!");
    }
    await carregarProjetos();
  });
};

// Editar um projeto
const editarProjeto = (e) => {
  const id = e.target.dataset.id;
  const projeto = state.projetos.find((p) => p._id == id);
  if (!projeto) {
    console.error("Projeto não encontrado!");
    return;
  }
  exibirFormulario(projeto);
};

// Excluir um projeto
const excluirProjeto = async (e) => {
  const id = e.target.dataset.id;
  const response = await del(`http://localhost:5000/projetos/${id}`);
  if (response.status !== 200) {
    exibirToast("Não foi possível excluir o projeto.", "danger");
  } else {
    exibirToast("Projeto excluído com sucesso!");
    await carregarProjetos();
  }
};

export { carregarProjetos };