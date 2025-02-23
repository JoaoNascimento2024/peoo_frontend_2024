// Exibir toast de mensagem
const exibirToast = (mensagem, tipo = "success") => {
  const toast = document.createElement("div");
  toast.className = `toast show text-white bg-${tipo} position-fixed top-0 end-0 m-3 p-2`;
  toast.role = "alert";
  toast.innerHTML = `
      <div class="toast-body d-flex justify-content-between align-items-center">
          ${mensagem}
          <button type="button" class="btn-close ms-3" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

export default exibirToast;