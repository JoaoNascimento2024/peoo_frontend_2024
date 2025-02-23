const manipularResponse = async (response) => {
    if (!response.ok) {
        if (response.status === 401) {
            // Redireciona para o login se o token for inválido ou expirado
            localStorage.removeItem("token");
            window.location.href = "login.html";
            throw new Error("Sessão expirada. Faça login novamente.");
        }
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }
    return response;
};

const get = async (url) => {
    const response = await fetch(url);
    return await response.json();
};

const post = async (url, data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return manipularResponse(response);
};

const del = async (url) => {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        }
    });
    return manipularResponse(response);
};

const put = async (url, data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });
    return manipularResponse(response);
};

export { get, post, del, put };
