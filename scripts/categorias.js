import { get, post, del, put } from "./api.js";
import state from "./state.js";
import exibirToast from "./toast.js";

// Carrega as categorias
const carregarCategorias = async () => {
  state.categorias = await get("http://localhost:5000/categorias");
  renderizarListaCategorias();
};

// Renderiza a lista de categorias
const renderizarListaCategorias = () => {
  const appContent = document.getElementById("app-content");

  let tabela = `
    <button type="button" class="btn btn-primary" id="nova-categoria">Novo</button>
    <table class="table table-hover">
        <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Nome</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>        
        <tbody>
            ${state.categorias
              .map(
                (categoria) => `
                <tr>
                    <th scope="row">${categoria._id}</th>
                    <td>${categoria._nome}</td>
                    <td>
                        <button class="btn btn-primary editar-categoria" data-id="${categoria._id}">Editar</button>
                        <button class="btn btn-danger excluir-categoria" data-id="${categoria._id}">Excluir</button>
                    </td>
                </tr>`
              )
              .join("")}
        </tbody>
    </table>`;

  appContent.innerHTML = tabela;

  document.getElementById("nova-categoria").addEventListener("click", () => exibirFormularioCategoria());
  document.querySelectorAll(".editar-categoria").forEach((btn) => btn.addEventListener("click", editarCategoria));
  document.querySelectorAll(".excluir-categoria").forEach((btn) => btn.addEventListener("click", excluirCategoria));
};

// Exibir formulário de criação/edição
const exibirFormularioCategoria = (categoria = {}) => {
  const appContent = document.getElementById("app-content");

  let formulario = `
    <form id="form-categoria">
        <div class="form-group">
            <label for="categoria">Nome da Categoria</label>
            <input type="text" id="nome-categoria" class="form-control" value="${categoria._nome || ""}" placeholder="Digite o nome da categoria">
        </div>                
        <button type="submit" class="btn btn-primary">Salvar</button>
    </form>`;

  appContent.innerHTML = formulario;

  document.getElementById("form-categoria").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome-categoria").value;
    const dadosCategoria = { nome };

    if (categoria._id) {
      await put(`http://localhost:5000/categorias/${categoria._id}`, dadosCategoria);
      exibirToast("Categoria atualizada com sucesso!");
    } else {
      await post("http://localhost:5000/categorias", dadosCategoria);
      exibirToast("Categoria cadastrada com sucesso!");
    }
    await carregarCategorias();
  });
};

// Editar uma categoria
const editarCategoria = (e) => {
  const id = e.target.dataset.id;
  const categoria = state.categorias.find((c) => c._id == id);
  if (!categoria) {
    console.error("Categoria não encontrada!");
    return;
  }
  exibirFormularioCategoria(categoria);
};

// Excluir uma categoria
const excluirCategoria = async (e) => {
  const id = e.target.dataset.id;
  const response = await del(`http://localhost:5000/categorias/${id}`);
  if (response.status !== 200) {
    exibirToast("Não foi possível excluir a categoria.", "danger");
  } else {
    exibirToast("Categoria excluída com sucesso!");
    await carregarCategorias();
  }
};

export { carregarCategorias };
